import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";
import { ChevronDownIcon, PencilSquareIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import NavLink from "@/Components/NavLink";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function Sidebar({
    className,
    onSetShowingSidebar,
    user,
    configLoader,
}) {
    const [open, setOpen] = useState(0);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [editingChatId, setEditingChatId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [deleteChatId, setDeleteChatId] = useState(null);

    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    const isItemActive = (r, params) => {
        if (!params) return route().current(r);
        try {
            const url = new URL(route(r, params), window.location.origin);
            return currentPath === url.pathname;
        } catch {
            return route().current(r);
        }
    };

    useEffect(() => {
        const init = async () => {
            if (typeof configLoader === "function") {
                const res = await configLoader(user, 1);
                if (res && res.items) {
                    setItems(res.items);
                    setPage(res.page || 1);
                    setLastPage(res.lastPage || 1);
                } else {
                    setItems(res); // legacy flat array array
                }
            }
        };
        init();
        // eslint-disable-next-line
    }, [user]);

    const loadMore = async () => {
        if (isLoading || page >= lastPage || typeof configLoader !== "function") return;
        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const res = await configLoader(user, nextPage);
            if (res && res.items) {
                setItems(prev => {
                    const existingIds = new Set(prev.map(i => i.params?.id).filter(Boolean));
                    const newItems = res.items.filter(i => !existingIds.has(i.params?.id));
                    return [...prev, ...newItems];
                });
                setPage(res.page || nextPage);
                setLastPage(res.lastPage || 1);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            loadMore();
        }
    };
    
    const handleEditSubmit = async (e, chatId) => {
        if (e && e.type === "keydown" && e.key !== "Enter") return;
        if (!editTitle.trim()) { setEditingChatId(null); return; }
        try {
            await axios.put(`/api/v1/chats/${chatId}`, { title: editTitle });
            setEditingChatId(null);
            
            setItems(prevItems => prevItems.map(item => {
                if (item.params?.id === chatId) return { ...item, label: editTitle };
                if (item.children) {
                    return {
                        ...item,
                        children: item.children.map(child => child.params?.id === chatId ? { ...child, label: editTitle } : child)
                    };
                }
                return item;
            }));
        } catch (err) {
            console.error("Failed to update chat title", err);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteChatId) return;
        try {
            await axios.delete(`/api/v1/chats/${deleteChatId}`);
            const deletedId = deleteChatId;
            setDeleteChatId(null);
            
            setItems(prevItems => prevItems.filter(item => item.params?.id !== deletedId).map(item => {
                if(item.children) {
                    return { ...item, children: item.children.filter(child => child.params?.id !== deletedId) };
                }
                return item;
            }));
            
            const url = new URL(typeof window !== "undefined" ? window.location.href : "http://localhost");
            if (url.pathname.includes(`/chats/${deletedId}`)) {
                router.visit(route("chats.index"));
            }
        } catch (err) {
            console.error("Failed to delete chat", err);
        }
    };

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card
            className={`vira-sidebar ${className} fixed left-0 z-[100] h-[100vh] transition-transform duration-300 lg:w-[20rem] max-w-[80vw] w-[80vw] lg:max-w-[20rem] p-4 shadow-xl rounded-none flex flex-col overflow-hidden`}
        >
            <div className="shrink-0 mb-4">
                {/* Sidebar header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-md">
                            <img
                                src="/vira_logo.png"
                                alt="VIRA logo"
                                width={18}
                                height={18}
                                style={{ filter: "brightness(0) invert(1)" }}
                            />
                        </div>
                        <span className="font-bold text-base tracking-tight text-gray-900 dark:text-white">VIRA</span>
                    </div>

                    <button
                        onClick={() => onSetShowingSidebar((prev) => !prev)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-200 focus:outline-none"
                        aria-label="Close sidebar"
                    >
                        <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <List className="min-w-0 p-0 pt-2 gap-1">
                    <NavLink href={route("chats.index")}>
                        <ListItem className="p-0 hover:bg-transparent focus:bg-transparent active:bg-transparent">
                            <button className="sidebar-new-chat-btn w-full">
                                <PencilSquareIcon className="h-4 w-4" />
                                <span>New Chat</span>
                            </button>
                        </ListItem>
                    </NavLink>
                </List>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto sidebar-scrollbar pr-1 -mr-1" onScroll={handleScroll}>
                <List className="min-w-0 p-0 gap-1 pb-10">

                {/* Divider */}
                {items.length > 0 && (
                    <li className="pt-3 pb-1 px-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                            Recent Chats
                        </span>
                    </li>
                )}

                {items.map((section, idx) =>
                    section.children ? (
                        <Accordion
                            key={idx}
                            open={open === idx + 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`mx-auto h-3.5 w-3.5 transition-transform text-gray-400 ${
                                        open === idx + 1 ? "rotate-180" : ""
                                    }`}
                                />
                            }
                        >
                            <ListItem className="p-0 hover:bg-transparent focus:bg-transparent" selected={open === idx + 1}>
                                <AccordionHeader
                                    onClick={() => handleOpen(idx + 1)}
                                    className="border-b-0 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all"
                                >
                                    {section.icon && (
                                        <ListItemPrefix>
                                            <section.icon className="h-4 w-4 text-purple-500" />
                                        </ListItemPrefix>
                                    )}
                                    <Typography className="mr-auto text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {section.label}
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-0.5">
                                <List className="p-0 gap-0.5">
                                    {section.children.map((item, j) => (
                                        <NavLink
                                            key={j}
                                            href={route(item.route)}
                                            method={item.method}
                                            active={isItemActive(item.route, item.params)}
                                        >
                                            <ListItem
                                                className={`text-sm rounded-lg py-2 px-3 ${
                                                    isItemActive(item.route, item.params)
                                                        ? "sidebar-item-active"
                                                        : "hover:bg-purple-50 dark:hover:bg-purple-950/20 text-gray-700 dark:text-gray-300"
                                                }`}
                                            >
                                                {item.icon && (
                                                    <ListItemPrefix>
                                                        <item.icon className="h-4 w-4" />
                                                    </ListItemPrefix>
                                                )}
                                                {item.label}
                                            </ListItem>
                                        </NavLink>
                                    ))}
                                </List>
                            </AccordionBody>
                        </Accordion>
                    ) : (
                        <div key={idx} className="relative group w-full flex items-center">
                            <NavLink
                                href={route(section.route, section.params)}
                                active={isItemActive(section.route, section.params)}
                                className="w-full flex-1 min-w-0"
                            >
                                <ListItem
                                    className={`text-sm rounded-lg py-2 px-3 flex items-center ${
                                        isItemActive(section.route, section.params)
                                            ? "sidebar-item-active"
                                            : "hover:bg-purple-50 dark:hover:bg-purple-950/20 text-gray-700 dark:text-gray-300"
                                    }`}
                                >
                                    {section.icon && (
                                        <ListItemPrefix>
                                            <section.icon className="h-4 w-4" />
                                        </ListItemPrefix>
                                    )}
                                    {editingChatId === section.params.id ? (
                                        <div className="flex-1 flex items-center gap-2 min-w-0" onClick={e => e.preventDefault()}>
                                            <input 
                                                type="text"
                                                autoFocus
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                onKeyDown={(e) => handleEditSubmit(e, section.params.id)}
                                                className="flex-1 border border-gray-300 dark:border-gray-700/60 rounded-md bg-transparent text-sm text-gray-900 dark:text-white px-2 py-1 outline-none font-medium w-full min-w-0 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm"
                                            />
                                            <IconButton 
                                                variant="text" 
                                                size="sm" 
                                                color="green" 
                                                className="w-7 h-7 rounded-md shrink-0 bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 text-green-600 dark:text-green-400"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEditSubmit(null, section.params.id);
                                                }}
                                            >
                                                <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
                                            </IconButton>
                                        </div>
                                    ) : (
                                        <span className="truncate flex-1 min-w-0 pr-6 pl-1">{section.label}</span>
                                    )}
                                </ListItem>
                            </NavLink>
                            
                            {section.route === 'chats.show' && editingChatId !== section.params.id && (
                                <div className="absolute right-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                                    <Menu placement="bottom-end">
                                        <MenuHandler>
                                            <IconButton variant="text" size="sm" className="w-6 h-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                                                <EllipsisHorizontalIcon className="h-4 w-4 text-gray-500" />
                                            </IconButton>
                                        </MenuHandler>
                                        <MenuList className="min-w-[140px] p-1.5 border border-white/20 bg-white/90 dark:bg-[#1a1a2e]/90 backdrop-blur-xl shadow-xl shadow-purple-500/10 rounded-xl z-[9999]">
                                            <MenuItem 
                                                className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setEditingChatId(section.params.id);
                                                    setEditTitle(section.label);
                                                }}
                                            >
                                                <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">Edit Name</span>
                                            </MenuItem>
                                            <MenuItem 
                                                className="flex items-center gap-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 py-2 px-3 rounded-lg transition-colors mt-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setDeleteChatId(section.params.id);
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                <span className="font-semibold">Delete</span>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                            )}
                        </div>
                    )
                )}
                </List>
            </div>

            <Dialog 
                open={!!deleteChatId} 
                handler={() => setDeleteChatId(null)} 
                size="xs"
                className="bg-white/95 dark:bg-[#0f0f19]/95 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl rounded-2xl"
            >
                <DialogHeader className="border-b border-gray-100 dark:border-gray-800/50 pb-4 pt-6 px-6 relative">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10">
                            <TrashIcon className="h-6 w-6 text-red-500" />
                        </div>
                        <Typography variant="h5" color="blue-gray" className="font-bold dark:text-white">
                            Delete Chat?
                        </Typography>
                    </div>
                </DialogHeader>
                <DialogBody className="px-6 py-6 text-gray-600 dark:text-gray-400 font-medium">
                    This will permanently delete this conversation and all its messages. This action cannot be reversed.
                </DialogBody>
                <DialogFooter className="border-t border-gray-100 dark:border-gray-800/50 px-6 py-4 gap-3">
                    <Button 
                        variant="text" 
                        className="rounded-xl px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                        onClick={() => setDeleteChatId(null)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="gradient" 
                        color="red" 
                        className="rounded-xl px-5 py-2.5 shadow-none hover:shadow-lg hover:shadow-red-500/20 transition-all font-bold" 
                        onClick={handleConfirmDelete}
                    >
                        Delete Permanently
                    </Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
}
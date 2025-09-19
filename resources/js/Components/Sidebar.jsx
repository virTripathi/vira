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
} from "@material-tailwind/react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import NavLink from "@/Components/NavLink";

export default function Sidebar({
    className,
    onSetShowingSidebar,
    user,
    configLoader,
}) {
    const [open, setOpen] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadConfig() {
            const result =
                typeof configLoader === "function"
                    ? await configLoader(user)
                    : [];
            setItems(result);
        }
        loadConfig();
    }, [user, configLoader]);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card
            className={`${className} bg-white dark:bg-black text-gray-950 dark:text-white fixed z-10 h-[100vh] transition-all lg:w-[20rem] max-w-[80vw] lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-950/5 rounded-none`}
        >
            <div className="flex justify-between items-center">
                <div className="mb-2 p-1">
                    <img
                        src="/vira_logo.png"
                        alt="logo"
                        width={30}
                        height={30}
                    />
                </div>
                <button
                    onClick={() => onSetShowingSidebar((prev) => !prev)}
                    className="inline-flex items-center justify-center p-0.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <List className="min-w-0">
                <NavLink href={route("chats.index")}>
                    <ListItem className="bg-black text-white">
                        <PencilSquareIcon height={18} width={18}/>
                        <span className="ms-2">New Chat</span>
                    </ListItem>
                </NavLink>
                {items.map((section, idx) =>
                    section.children ? (
                        <Accordion
                            key={idx}
                            open={open === idx + 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${
                                        open === idx + 1 ? "rotate-180" : ""
                                    }`}
                                />
                            }
                        >
                            <ListItem
                                className="p-0"
                                selected={open === idx + 1}
                            >
                                <AccordionHeader
                                    onClick={() => handleOpen(idx + 1)}
                                    className="border-b-0 p-3"
                                >
                                    {section.icon && (
                                        <ListItemPrefix>
                                            <section.icon className="h-5 w-5" />
                                        </ListItemPrefix>
                                    )}
                                    <Typography className="mr-auto font-normal text-black dark:text-white">
                                        {section.label}
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    {section.children.map((item, j) => (
                                        <NavLink
                                            key={j}
                                            href={route(item.route)}
                                            method={item.method}
                                            active={route().current(item.route)}
                                        >
                                            <ListItem
                                                className={
                                                    route().current(item.route)
                                                        ? "bg-black text-white"
                                                        : ""
                                                }
                                            >
                                                {item.icon && (
                                                    <ListItemPrefix>
                                                        <item.icon className="h-5 w-5" />
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
                        <NavLink
                            key={idx}
                            href={route(section.route, section.params)}
                            active={route().current(section.route)}
                        >
                            <ListItem
                                className={
                                    route().current(section.route)
                                        ? "bg-black text-white"
                                        : ""
                                }
                            >
                                {section.icon && (
                                    <ListItemPrefix>
                                        <section.icon className="h-5 w-5" />
                                    </ListItemPrefix>
                                )}
                                {section.label}
                            </ListItem>
                        </NavLink>
                    )
                )}
            </List>
        </Card>
    );
}
import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import NavLink from "@/Components/NavLink";

export default function Sidebar({
    className,
    header,
    showingSidebar,
    onSetShowingSidebar,
}) {
  const routeMapping = {
    "tasks.index": 1,
    "profile.edit": 2,
};
const initialOpen = routeMapping[Object.keys(routeMapping).find((routes) => route().current(routes))] || 0;
  const [open, setOpen] = React.useState(initialOpen);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card
            className={
                `${className}` +
                " fixed z-10 h-[100vh] transition-all lg:w-[20rem] max-w-[80vw] lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none"
            }
        >
            {header && (
                <div className="flex justify-between items-center">
                    <div className="mb-2 p-1">
                        <Typography variant="h5" color="blue-gray">
                            Mini Jarvis
                        </Typography>
                    </div>
                    <button
                        onClick={() =>
                            onSetShowingSidebar(
                                (previousState) => !previousState
                            )
                        }
                        className="inline-flex items-center justify-center p-0.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
            )}

            <List className="min-w-0">
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                Task Management
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <NavLink
                                href={route("tasks.index")}
                                active={route().current("tasks.index")}
                            >
                                <ListItem
                                    className={
                                        route().current("tasks.index")
                                            ? "bg-black text-white"
                                            : ""
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Task
                                </ListItem>
                            </NavLink>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 2 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                Settings
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <NavLink
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                <ListItem
                                    className={
                                        route().current("profile.edit")
                                            ? "bg-black text-white"
                                            : ""
                                    }
                                >
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Profile
                                </ListItem>
                            </NavLink>
                            <NavLink
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                <ListItem
                                    className={
                                        route().current("logout")
                                            ? "bg-black text-white"
                                            : ""
                                    }
                                >
                                    <ListItemPrefix>
                                        <PowerIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Log Out
                                </ListItem>
                            </NavLink>
                        </List>
                    </AccordionBody>
                </Accordion>
            </List>
        </Card>
    );
}

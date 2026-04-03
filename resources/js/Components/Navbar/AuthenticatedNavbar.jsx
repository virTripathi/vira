import Dropdown from "@/Components/Dropdown";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";
import NotificationDropdown from "../NotificationDropdown";
import { usePage } from "@inertiajs/react";

export default function Navbar({
    user,
    links = [],
    showingSidebar,
    setShowingSidebar,
}) {
    const { notifications } = usePage().props;
    return (
        <nav className="vira-navbar">
            <div className="px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowingSidebar((prev) => !prev)}
                            className={
                                (showingSidebar ? "flex" : "hidden") +
                                " items-center justify-center p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 focus:outline-none transition-all duration-200"
                            }
                            aria-label="Toggle sidebar"
                        >
                            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Logo />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <NotificationDropdown notifications={notifications} />

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-200 focus:outline-none"
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <svg className="h-3.5 w-3.5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {links.map((link, idx) => (
                                    <Dropdown.Link
                                        key={idx}
                                        href={link.href}
                                        method={link.method}
                                        as={link.as}
                                    >
                                        {link.label}
                                    </Dropdown.Link>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

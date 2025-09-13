import Dropdown from "@/Components/Dropdown";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";

export default function Navbar({
    user,
    links = [],
    showingSidebar,
    setShowingSidebar,
}) {
    return (
        <nav className="border-b border-gray-100">
            <div className="p-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowingSidebar((prev) => !prev)}
                            className={
                                (showingSidebar ? "inline-flex" : "hidden") +
                                " items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-950 focus:outline-none focus:hover:bg-gray-950 focus:text-gray-500 transition duration-150 ease-in-out"
                            }
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <div>
                            <Logo />
                        </div>
                    </div>

                    <div className="sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <UserCircleIcon className="h-6 w-6" />
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
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
            </div>
        </nav>
    );
}

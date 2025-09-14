import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";

export default function NotificationDropdown({ notifications }) {
    const [open, setOpen] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read_at).length;

    const markAllAsRead = () => {
        router.post(route("notifications.readAll"));
    };

    return (
        <div className="relative ">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
            </button>
 
            {open && (
                <div className="absolute right-[-4rem] md:right-0 mt-2 w-80 bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden z-50">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                        <span className="font-medium">
                            Notifications
                        </span>
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Mark all as read
                        </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications
                                .sort(
                                    (a, b) =>
                                        new Date(b.created_at) -
                                        new Date(a.created_at)
                                )
                                .slice(0, 5)
                                .map((n) => (
                                    <div
                                        key={n.id}
                                        className={`px-4 py-2 text-sm ${
                                            !n.read_at
                                                ? "bg-currentColor"
                                                : "bg-currentColor"
                                        } hover:bg-gray-50`}
                                    >
                                        {n.data.title}
                                        <div className="text-xs text-gray-400">
                                            {new Date(
                                                n.created_at
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                                No notifications
                            </div>
                        )}
                    </div>

                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-center">
                        <Link
                            href={route("notifications.index")}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
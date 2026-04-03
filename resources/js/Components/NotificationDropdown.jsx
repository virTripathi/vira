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
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-200 focus:outline-none"
                aria-label="Notifications"
            >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="notif-badge" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 md:right-0 mt-2 w-80 bg-white dark:bg-gray-950 notif-panel z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-semibold text-sm text-gray-800 dark:text-white">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                    {unreadCount}
                                </span>
                            )}
                        </span>
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 font-medium transition-colors"
                        >
                            Mark all as read
                        </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .slice(0, 5)
                                .map((n) => (
                                    <div
                                        key={n.id}
                                        className={`notif-item px-4 py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${!n.read_at ? "unread" : ""}`}
                                    >
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {n.data.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {new Date(n.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="px-4 py-6 text-sm text-gray-400 text-center">
                                <BellIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                No notifications yet
                            </div>
                        )}
                    </div>

                    <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 text-center">
                        <Link
                            href={route("notifications.index")}
                            className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                        >
                            View all notifications →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
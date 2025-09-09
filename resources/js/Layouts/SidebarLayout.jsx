import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";

export default function SidebarLayout({
    sidebarHeader,
    sidebarContent,
    navbar,
    children,
    floatingAction,
    showingSidebar,
    setShowingSidebar,
}) {
    const { auth } = usePage().props;

    async function loadGeneralUserSidebar(user) {
        const res = await fetch("/api/v1/chats");
        const chats = await res.json();
        return chats.map((chat) => ({
            label: chat.title,
             route: 'chats.show',
            params: { id: chat.id },
        }));
    }

    function loadRoleSidebar(user) {
        // Extract role titles
        const roles = user.roles?.map((r) => r.title.toLowerCase()) || [];

        if (roles.includes("admin")) return sidebarConfig.admin;
        if (roles.includes("resource")) return sidebarConfig.resource;
        if (roles.includes("superadmin")) return sidebarConfig.superAdmin;

        return [];
    }

    return (
        <div className="min-h-screen flex max-w-[100vw]">
            <Sidebar
                header={sidebarHeader}
                content={sidebarContent}
                showingSidebar={showingSidebar}
                onSetShowingSidebar={setShowingSidebar}
                className={(showingSidebar ? "-left-[80vw]" : "left-0") + ""}
                user={auth.user}
                configLoader={(user) => {
                    const roles =
                        user.roles?.map((r) => r.title.toLowerCase()) || [];
                    if (roles.includes("general user")) {
                        return loadGeneralUserSidebar(user);
                    }
                    return loadRoleSidebar(user);
                }}
            />

            <div
                className={`transition-all w-full ${
                    showingSidebar
                        ? ""
                        : "relative lg:left-[20rem] lg:w-[calc(100%-20rem)] lg:max-w-[calc(100%-20rem)]"
                }`}
            >
                {navbar}
                <main className="w-full flex flex-col justify-center items-center">
                    {children}
                </main>
            </div>

            {floatingAction}
        </div>
    );
}

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

    const loadGeneralUserSidebar = async (user, page = 1) => {
        const res = await fetch(`/api/v1/chats?page=${page}`);
        const json = await res.json();
        const chats = Array.isArray(json) ? json : json.data || [];
        const lastPage = Array.isArray(json) ? 1 : json.last_page || 1;
        const currentPage = Array.isArray(json) ? 1 : json.current_page || 1;

        const mapped = chats.map((chat) => ({
            label: chat.title,
            route: 'chats.show',
            params: { id: chat.id },
        }));
        
        return { items: mapped, lastPage, page: currentPage };
    };

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
                className={showingSidebar ? "-translate-x-full" : "translate-x-0"}
                user={auth.user}
                configLoader={async (user, page = 1) => {
                    const roles = user.roles?.map((r) => r.title.toLowerCase()) || [];
                    if (roles.includes("general user")) {
                        return await loadGeneralUserSidebar(user, page);
                    }
                    return { items: loadRoleSidebar(user), lastPage: 1, page: 1 };
                }}
            />

            <div
                className={`transition-all duration-300 w-full ${
                    showingSidebar
                        ? ""
                        : "lg:pl-[20rem]"
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

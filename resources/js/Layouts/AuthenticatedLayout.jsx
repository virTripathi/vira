import { useState } from "react";
import SidebarLayout from "./SidebarLayout";
import Navbar from "../Components/Navbar/AuthenticatedNavbar";
import VoiceSquare from "../Components/Icons/VoiceSquare";
import VoiceControl from "../Components/Chatbot/VoiceControl";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({
    auth,
    children,
    showFloatingAction = true,
}) {
    const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

    const toggleVoiceControl = () => {
        setVoiceControlEnabled((prev) => !prev);
    };

    const [showingSidebar, setShowingSidebar] = useState(
        window.matchMedia("(min-width: 1024px)").matches ? false : true
    );

    const floatingAction = showFloatingAction && (
        <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-30">
            {voiceControlEnabled && (
                <VoiceControl onClick={toggleVoiceControl} />
            )}
            <div className="fab-button" onClick={toggleVoiceControl} role="button" aria-label="Toggle voice assistant">
                <VoiceSquare className="h-6 w-6" />
            </div>
        </div>
    );

    return (
        <NotificationProvider user={auth.user}>
            <SidebarLayout
                sidebarHeader="VIRA"
                showingSidebar={showingSidebar}
                setShowingSidebar={setShowingSidebar}
                floatingAction={floatingAction}
                navbar={
                    <Navbar
                        user={auth.user}
                        links={[
                            { label: "Profile", href: route("profile.edit") },
                            {
                                label: "Log Out",
                                href: route("logout"),
                                method: "post",
                                as: "button",
                            },
                        ]}
                        showingSidebar={showingSidebar}
                        setShowingSidebar={setShowingSidebar}
                    />
                }
            >
                {children}
            </SidebarLayout>
        </NotificationProvider>
    );
}

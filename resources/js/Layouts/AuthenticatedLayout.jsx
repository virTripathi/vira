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
        <div className="fixed bottom-0 right-0 p-4">
            {voiceControlEnabled && (
                <VoiceControl onClick={toggleVoiceControl} />
            )}
            <VoiceSquare
                onClick={toggleVoiceControl}
                className="float-right h-12 w-12 hover:cursor-pointer"
            />
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

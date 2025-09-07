import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useTheme } from "../contexts/themeContext";
import UserChatPage from "../Components/Chatbot/UserChatPage";

export default function Dashboard(props) {
    const { theme, toggleTheme } = useTheme();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
            showFloatingAction={false}
        >
            <Head title="Dashboard" />

            <UserChatPage
            className={'w-4/5'}
                defaultQuestions={[
                    { id: 1, question: "What can you do?" },
                    { id: 2, question: "Show me latest reports" },
                ]}
            />
        </AuthenticatedLayout>
    );
}

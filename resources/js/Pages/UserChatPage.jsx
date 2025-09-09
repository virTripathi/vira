import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UserChatArea from "../Components/Chatbot/UserChatArea";

export default function UserChatPage({ auth, errors, chat, questions }) {

    const initialChats = questions?.length
        ? questions.flatMap((q) => {
            const msgs = [{ user: "user", message: q.question }];
            if (q.answer) {
                msgs.push({ user: "system", message: q.answer });
            }
            return msgs;
        })
        : null;

    const defaultQuestions = !initialChats
        ? [
            { id: 1, question: "What can you do?" },
            { id: 2, question: "Show me latest reports" },
        ]
        : [];

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {chat ? chat.title : "Dashboard"}
                </h2>
            }
            showFloatingAction={false}
        >
            <Head title={chat ? chat.title : "Dashboard"} />

            <UserChatArea
                userId={auth?.user?.id}
                initialChats={initialChats}
                defaultQuestions={defaultQuestions}
                className="w-4/5"
            />
        </AuthenticatedLayout>
    );
}
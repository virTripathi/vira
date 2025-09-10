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
        : [];

    const defaultQuestions = !initialChats.length
        ? [
              { id: 1, question: "What can you do?" },
              { id: 2, question: "Show me latest reports" },
          ]
        : [];

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            showFloatingAction={false}
        >

            <UserChatArea
                chatId={chat?.id}
                userId={auth?.user?.id}
                initialChats={initialChats}
                defaultQuestions={defaultQuestions}
                className="w-4/5"
            />
        </AuthenticatedLayout>
    );
}

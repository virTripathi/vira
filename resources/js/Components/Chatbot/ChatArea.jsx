import React from "react";
import useChatListener from "@/hooks/useChatListener";

function ChatArea({className, chats, defaultQuestions, addQuestion, isAnswerPending, userId, onNewAnswer }) {
    useChatListener(userId, (data) => {
        onNewAnswer?.(data); 
    });

    return (
        <div
            id="chat-area"
            className={className}
        >
            {chats.map((chat, index) =>
                chat.user === "system" ? (
                    <div key={index} className="system ms-2 me-2 mt-4 rounded-[18px] px-4 py-1.5 data-[multiline]:py-3">
                        {chat.message}
                    </div>
                ) : (
                    <div key={index} className="w-fit user ms-2 me-2 mt-4 dark:bg-gray-900 bg-gray-100 dark:text-white text-black rounded-[18px] px-4 py-1.5 data-[multiline]:py-3">
                        {chat.message}
                    </div>
                )
            )}

            {isAnswerPending ? (
                <div className="system ms-2 me-2 mt-4">
                    <div className="flex gap-1 w-fit">
                        <div className="rounded-full !p-0 !w-[8px] !h-[8px] animate-pulse bg-gray-800"></div>
                        <div className="rounded-full !p-0 !w-[8px] !h-[8px] animate-pulse bg-gray-800 delay-500"></div>
                        <div className="rounded-full !p-0 !w-[8px] !h-[8px] animate-pulse bg-gray-800 delay-1000"></div>
                    </div>
                </div>
            ) : null}

            <section className="ms-2 me-2 mt-2 next-possible-questions flex max-w-96 flex-wrap gap-1">
                {defaultQuestions.map((question, index) => (
                    <p
                        key={index}
                        onClick={() => addQuestion(question.id)}
                        className="ms-1 mt-1 w-auto text-xs hover:cursor-pointer"
                    >
                        {question.question}
                    </p>
                ))}
            </section>
        </div>
    );
}

export default ChatArea;
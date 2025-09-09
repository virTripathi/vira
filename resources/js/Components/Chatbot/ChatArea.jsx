import React from "react";

export default function ChatArea({ className, chats, questions, addQuestion, isAnswerPending }) {
    return (
        <div id="chat-area" className={className}>
            {chats.map((chat, index) =>
                chat.user === "system" ? (
                    <div
                        key={index}
                        className="system ms-2 me-2 mt-4 rounded-[18px] px-4 py-1.5 text-gray-900 dark:text-white"
                    >
                        {chat.message}
                    </div>
                ) : (
                    <div
                        key={index}
                        className="w-fit user ms-2 me-2 mt-4 dark:bg-gray-900 bg-gray-100 dark:text-white text-black rounded-[18px] px-4 py-1.5"
                    >
                        {chat.message}
                    </div>
                )
            )}

            {isAnswerPending && (
                <div className="system ms-2 me-2 mt-4">
                    <div className="flex gap-1 w-fit">
                        <div className="rounded-full w-[8px] h-[8px] animate-pulse bg-gray-800"></div>
                        <div className="rounded-full w-[8px] h-[8px] animate-pulse bg-gray-800 delay-500"></div>
                        <div className="rounded-full w-[8px] h-[8px] animate-pulse bg-gray-800 delay-1000"></div>
                    </div>
                </div>
            )}

            {questions.length > 0 && (
                <section className="ms-2 me-2 mt-2 next-possible-questions flex max-w-96 flex-wrap gap-1">
                    {questions.map((q) => (
                        <p
                            key={q.id}
                            onClick={() => addQuestion(q.id)}
                            className="ms-1 mt-1 w-auto text-xs hover:cursor-pointer"
                        >
                            {q.question}
                        </p>
                    ))}
                </section>
            )}
        </div>
    );
}
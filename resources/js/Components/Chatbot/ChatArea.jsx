import React, { useEffect, useRef } from "react";

export default function ChatArea({ className, chats, questions, addQuestion, isAnswerPending, isQuotaExpired }) {
    const bottomRef = useRef(null);

    // Auto-scroll to newest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, isAnswerPending]);

    return (
        <div id="chat-area" className={className} style={{ display: "flex", flexDirection: "column" }}>
            {chats.map((chat, index) =>
                chat.user === "system" ? (
                    <div
                        key={chat.id || `sys_${index}`}
                        className="system ms-3 me-3 mt-3"
                    >
                        {chat.message}
                    </div>
                ) : (
                    <div
                        key={chat.id || `usr_${index}`}
                        className="user ms-3 me-3 mt-3"
                    >
                        {chat.message}
                    </div>
                )
            )}

            {isAnswerPending && (
                <div className="system ms-3 me-3 mt-3">
                    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "2px 0" }}>
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                    </div>
                </div>
            )}

            {questions.length > 0 && (
                <section className={`ms-3 me-3 mt-3 flex flex-wrap gap-2 ${isQuotaExpired ? "opacity-70 pointer-events-none" : ""}`}>
                    {questions.map((q) => (
                        <p
                            key={q.id}
                            onClick={() => addQuestion(q.id)}
                            className="question-chip"
                        >
                            {q.question}
                        </p>
                    ))}
                </section>
            )}

            <div ref={bottomRef} />
        </div>
    );
}
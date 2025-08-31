import { useEffect } from "react";
import echo from "../Services/echo";

export default function useChatListener(userId, onAnswer) {
    useEffect(() => {
        if (!userId) return;

        const channel = echo.private(`user.${userId}`)
            .listen("AnswerGeneratedEvent", (data) => {
                console.log("AnswerGeneratedEvent received:", data);
                onAnswer?.(data);
            });

        return () => {
            echo.leave(`user.${userId}`);
        };
    }, [userId, onAnswer]);
}

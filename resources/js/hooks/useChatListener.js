import { useEffect, useRef } from "react";
import echo from "../Services/echo";

export default function useChatListener(userId, onAnswer) {
    const onAnswerRef = useRef(onAnswer);

    // Keep the latest callback reference without recreating the listener
    useEffect(() => {
        onAnswerRef.current = onAnswer;
    }, [onAnswer]);

    useEffect(() => {
        console.log("Setting up chat listener for userId:", userId);

        if (!userId) return;

        const channelName = `user.${userId}`;

        const channel = echo.private(channelName);
        
        channel.listen(".AnswerGeneratedEvent", (data) => {
            console.log(data);
            onAnswerRef.current?.(data);
        });

        // Add connection listeners for debugging
        channel.subscription
            .bind("subscription_succeeded", () => {
                console.log(
                    "✅ Successfully subscribed to channel:",
                    channelName
                );
            })
            .bind("subscription_error", (error) => {
                console.error("❌ Subscription error:", error);
            });

        return () => {
            console.log("Cleaning up channel:", channelName);
            channel.stopListening(".AnswerGeneratedEvent");
            echo.leave(channelName);
        };
    }, [userId]);
}

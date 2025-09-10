import { useEffect } from "react";
import echo from "../Services/echo";

export default function useChatListener(userId, onAnswer) {
    useEffect(() => {
        console.log("Setting up chat listener for userId:", userId);

        if (!userId) return;

        const channelName = `user.${userId}`;

        const channel = echo
            .private(channelName)
            .listen(".AnswerGeneratedEvent", (data) => {
                console.log(data);
                onAnswer?.(data);
            })
            .listen("*", (event, data) => {
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
            echo.leave(channelName);
        };
    }, [userId, onAnswer]);
}

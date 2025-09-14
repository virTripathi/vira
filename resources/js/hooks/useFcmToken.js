import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "../firebase";
import axios from "axios";

export function useFcmToken(user) {
    const [fcmToken, setFcmToken] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!user) return;

        Notification.requestPermission().then(async (permission) => {
            if (permission !== "granted") return;

            try {
                const token = await getToken(messaging, {
                    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                });

                if (token && token !== fcmToken) {
                    setFcmToken(token);
                    try {
                        await axios.post("/api/v1/save-fcm-token", {
                            fcm_token: token,
                        });
                    } catch (err) {
                        console.error("Failed to save FCM token:", err);
                    }
                }
            } catch (err) {
                console.error("FCM Token error:", err);
            }
        });

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);
            setMessages((prev) => [...prev, payload]);
        });

        return unsubscribe;
    }, [user]);

    return { fcmToken, messages };
}

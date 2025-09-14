import { createContext, useContext } from "react";
import { useFcmToken } from "../hooks/useFcmToken";

const NotificationContext = createContext();

export function NotificationProvider({ user, children }) {
    const { fcmToken, messages } = useFcmToken(user);

    return (
        <NotificationContext.Provider value={{ fcmToken, messages }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}
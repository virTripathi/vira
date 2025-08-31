import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);
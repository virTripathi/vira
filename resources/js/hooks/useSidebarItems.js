import { useEffect, useState } from "react";
import { sidebarConfig } from "../config/sidebarConfig";

export function useSidebarItems(user) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "general-user") {
      fetch("/api/chats")
        .then((res) => res.json())
        .then((chats) => {
          setItems(
            chats.map((chat) => ({
              label: chat.title,
              route: `chats.show/${chat.id}`,
            }))
          );
        });
    } else {
      if (user.role === "admin") setItems(sidebarConfig.admin);
      if (user.role === "resource") setItems(sidebarConfig.resource);
      if (user.role === "superadmin") setItems(sidebarConfig.superAdmin);
    }
  }, [user]);

  return items;
}
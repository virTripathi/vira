import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export const sidebarConfig = {
  admin: [
    {
      label: "Task Management",
      icon: PresentationChartBarIcon,
      children: [{ label: "Tasks", route: "tasks.index" }],
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
      children: [
        { label: "Profile", route: "profile.edit" },
        { label: "Logout", route: "logout", method: "post" },
      ],
    },
  ],
  resource: [
    {
      label: "Resources",
      icon: Cog6ToothIcon,
      children: [{ label: "Resource Mgmt", route: "resources.index" }],
    },
  ],
  superAdmin: [
    {
      label: "Admin Panel",
      icon: PresentationChartBarIcon,
      children: [{ label: "Users", route: "users.index" }],
    },
  ],
};
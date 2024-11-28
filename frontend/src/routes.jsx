import React from "react";
import { Icon } from "@chakra-ui/react";
import { MdHome, MdPerson, MdBarChart, MdLock, MdGroup } from "react-icons/md";

// Admin Imports
import MainDashboard from "@/views/admin/default";
import DataTables from "@/views/admin/dataTables";
import Profile from "@/views/admin/profile";
import UserManager from "@/views/admin/userManager"; // Thêm UserManager vào đây

// Auth Imports
import SignInCentered from "@/views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    path: "/data-tables",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: "User Manager", // Tên mới cho quản lý người dùng
    layout: "/admin",
    path: "/user-manager",
    icon: <Icon as={MdGroup} width="20px" height="20px" color="inherit" />, // Biểu tượng nhóm người
    component: <UserManager />, // Component cho User Manager
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
];

export default routes;

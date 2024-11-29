import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdPerson,
  MdBarChart,
  MdLock,
  MdGroup,
  MdMusicNote,
  MdComment,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "@/views/admin/default";
import DataTables from "@/views/admin/dataTables";
import Profile from "@/views/admin/profile";
import UserManager from "@/views/admin/userManager"; // Đã có UserManager
import SongManager from "@/views/admin/songManager"; // Thêm SongManager vào đây

// Auth Imports
import SignInCentered from "@/views/auth/signIn";
import CommentManager from "./views/admin/commentsManager";

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
    name: "User Manager", // Tên mới cho quản lý người dùng
    layout: "/admin",
    path: "/user-manager",
    icon: <Icon as={MdGroup} width="20px" height="20px" color="inherit" />, // Biểu tượng nhóm người
    component: <UserManager />, // Component cho User Manager
  },
  {
    name: "Song Manager", // Tên mới cho quản lý bài hát
    layout: "/admin",
    path: "/song-manager",
    icon: <Icon as={MdMusicNote} width="20px" height="20px" color="inherit" />, // Biểu tượng nhạc
    component: <SongManager />, // Component cho Song Manager
  },
  {
    name: "Comments Manager", // Tên mới cho quản lý bài hát
    layout: "/admin",
    path: "/comment-manager",
    icon: <Icon as={MdComment} width="20px" height="20px" color="inherit" />, // Biểu tượng nhạc
    component: <CommentManager />, // Component cho Song Manager
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

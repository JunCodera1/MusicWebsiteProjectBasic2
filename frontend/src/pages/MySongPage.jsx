import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import Navbar from "../components/Navbar";
import SingleSongCard from "../components/SingleSongCard";

const soundboxPlaylistData = [
  {
    title: "Peaceful Piano",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];

const focusCardData = [
  {
    title: "Peaceful Piano",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];

const HomePage = () => {
  return (
    <div
      className="transform"
      sx={{
        transform: "scale(1.0)", // Giữ nguyên kích thước gốc
        transformOrigin: "0 0",
        overflow: "hidden",
      }}
    >
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
      <Box display="flex" minHeight="100vh" position={"relative"}>
        {/* Sidebar */}
        <Sidebar />
        <div className="content p-8 overflow-auto">
          <div className="text-2xl pb-4 font-semibold">My Songs</div>
          <SingleSongCard />
        </div>
      </Box>
    </div>
  );
};

export default HomePage;

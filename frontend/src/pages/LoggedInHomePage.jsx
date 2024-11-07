import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";
import Navbar from "../components/Navbar";

const spotifyPlaylistData = [
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

const menuItemsRight = [{ label: "Premium", uri: "/" }];

const HomePage = () => {
  return (
    <Box display="flex" minHeight="100vh" position={relative}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
        <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

        {/* Playlist Views */}
        <Box p={4} className="content">
          <PlaylistView titleText="HSR" cardsData={focusCardData} />
          <PlaylistView
            titleText="Apple Music"
            cardsData={spotifyPlaylistData}
          />
          <PlaylistView titleText="JP 80's" cardsData={focusCardData} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

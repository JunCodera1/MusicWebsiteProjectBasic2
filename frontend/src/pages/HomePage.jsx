import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Text } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";

const spotifyPlaylistData = [
  {
    title: "Peaceful Piano",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];
const focusCardData = [
  {
    title: "Peaceful Piano",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];

const HomePage = () => {
  // const [navSize] = useState("large"); // Get navSize from context or prop if needed
  return (
    <Box
      style={{
        display: "flex",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <div
        className="content p-0 pt-0 overflow-auto flex-1"
        style={{ overflowY: "auto", height: "100vh", position: "relative" }}
      >
        <PlaylistView titleText={"Chit Chit"} cardsData={focusCardData} />
        <PlaylistView
          titleText={"Chit Manh Hon"}
          cardsData={spotifyPlaylistData}
        />
        <PlaylistView titleText={"Chit Tan Bao"} cardsData={focusCardData} />
      </div>
    </Box>
  );
};

export default HomePage;

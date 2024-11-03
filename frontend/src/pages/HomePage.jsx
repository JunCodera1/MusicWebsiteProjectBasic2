import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Text } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";

const PlaylistView = () => {
  return (
    <div className="text-white" style={{ marginLeft: "20px", marginTop: "20px" }}>
      <Box padding="20px" fontFamily="semibold">
        <Text fontSize="2xl" fontWeight="semibold">
          Playlist
        </Text>
      </Box>
      <div className="w-full flex overflow-x-auto" style={{ marginLeft: "20px" }}>
        <div className="flex flex-nowrap space-x-4">
          <Card title={"Peaceful Piano"} description={"lorem ipsum dolor sit amet consectetur"} />
          <Card title={"Huy"} description={"lorem ipsum dolor sit amet consectetur"} />
          <Card title={"Tien"} description={"lorem ipsum dolor sit amet consectetur"} />
          <Card title={"Thuan"} description={"lorem ipsum dolor sit amet consectetur"} />
          <Card title={"Hoa"} description={"lorem ipsum dolor sit amet consectetur"} />

        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description }) => {
  return (
    <div className="bg-black bg-opacity-30 flex-1 p-4 rounded-lg ">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md"
          src={image}
          alt="label"
        />
      </div>
      <div className="text-white text-sm font-semibold">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <PlaylistView />
      </div>
    </div>
  );
};

export default HomePage;
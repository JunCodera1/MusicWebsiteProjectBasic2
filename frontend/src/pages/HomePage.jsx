import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";

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
const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div
      className="text-white mt-8"
      style={{ marginLeft: "20px", marginTop: "20px" }}
    >
      <Box
        padding="20px"
        fontFamily="semibold"
        className="mb-5"
        color={useColorModeValue("#000", "gray.800")}
      >
        <Text fontSize="2xl" fontWeight="semibold">
          {titleText}
        </Text>
      </Box>
      <div
        className="w-full flex overflow-x-auto "
        style={{ marginLeft: "20px" }}
      >
        <div className="flex  space-x-4 justify-between ">
          {
            //cardsData.map will be used to render the cards by mapping over the data use
            cardsData.map((item) => (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            ))
          }
          {/* <Card title={"Peaceful Piano"} description={"lorem ipsum dolor sit amet consectetur"} imgUrl={image} />
          <Card title={"Huy"} description={"lorem ipsum dolor sit amet consectetur"} imgUrl={image} />
          <Card title={"Tien"} description={"lorem ipsum dolor sit amet consectetur"} imgUrl={image} />
          <Card title={"Thuan"} description={"lorem ipsum dolor sit amet consectetur"} imgUrl={image} />
          <Card title={"Hoa"} description={"lorem ipsum dolor sit amet consectetur"} imgUrl={image} /> */}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 flex-1/5 p-4 rounded-lg ">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md h-50" src={image} alt="label" />
      </div>
      <div className="text-white  font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

const HomePage = () => {
  // const [navSize] = useState("large"); // Get navSize from context or prop if needed
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      <Sidebar />
      <div
        className="content p-0 pt-0 overflow-auto flex-1 "
        style={{ overflowY: "auto", height: "100vh", position: "relative", color: "white" }}
      >
        <PlaylistView titleText={"Chit Chit"} cardsData={focusCardData} />
        <PlaylistView
          titleText={"Chit Manh Hon"}
          cardsData={spotifyPlaylistData}
        />
        <PlaylistView titleText={"Chit Tan Bao"} cardsData={focusCardData} />
      </div>
    </Box >
  );
};

export default HomePage;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";
import { Howl, Howler } from "howler";
import Navbar from "../components/Navbar";
import { FaShuffle } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import LoggedInContainer from "@/containers/LoggedInContainer";

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

const LoggedInHomePage = () => {
  return (
    <LoggedInContainer>
      <PlaylistView titleText="HSR" cardsData={focusCardData} />
      <PlaylistView titleText="Apple Music" cardsData={spotifyPlaylistData} />
      <PlaylistView titleText="JP 80's" cardsData={focusCardData} />
    </LoggedInContainer>
  );
};

export default LoggedInHomePage;

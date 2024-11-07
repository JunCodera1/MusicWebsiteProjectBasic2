import React, { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { searchTracks } from "../spotify";
import Navbar from "../components/Navbar";
function FeedPage() {
  const songs = [
    {
      image: "https://link-to-album-cover.jpg",
      title: "Song Title",
      artist: "Artist Name",
    },
  ];

  const menuItemsLeft = [
    {
      label: "Home",
      uri: "/",
    },
    {
      label: "Feed",
      uri: "/feed",
    },
    {
      label: "Trending",
      uri: "/trending",
    },
    {
      label: "Upload",
      uri: "/upload",
    },
  ];

  const menuItemsRight = [
    {
      label: "Login",
      uri: "/",
    },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Navbar
        menuItemsRight={menuItemsRight}
        menuItemsLeft={menuItemsLeft}
      ></Navbar>
      Feed
    </div>
  );
}

export default FeedPage;

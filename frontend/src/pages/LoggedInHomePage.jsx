import React, { useState } from "react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";

import LoggedInContainer from "@/containers/LoggedInContainer";
import UserView from "@/components/UserView";

const LoggedInHomePage = () => {
  return (
    <LoggedInContainer>
      <PlaylistView titleText="More of what you like" />
      <PlaylistView titleText="Recently Played" />
      <UserView titleText="Artists you should know" />
    </LoggedInContainer>
  );
};

export default LoggedInHomePage;

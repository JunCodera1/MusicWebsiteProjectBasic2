import React, { useState } from "react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";

import LoggedInContainer from "@/containers/LoggedInContainer";

const LoggedInHomePage = () => {
  return (
    <LoggedInContainer>
      <PlaylistView titleText="HSR" />
      <PlaylistView titleText="Apple Music" />
      <PlaylistView titleText="JP 80's" />
    </LoggedInContainer>
  );
};

export default LoggedInHomePage;

import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import PlaylistView from "../components/PlaylistView/PlaylistView";
import UserView from "../components/UserView";
import HomeSlider from "../components/HomeSlider";

const LoggedInHomePage = () => {
  return (
    <LoggedInContainer>
      <HomeSlider />
      <PlaylistView titleText="More of what you like" />
      <PlaylistView titleText="Recently Played" />
      <UserView titleText="Artists you should know" />
      <br />
      <br />
      <br />
    </LoggedInContainer>
  );
};

export default LoggedInHomePage;

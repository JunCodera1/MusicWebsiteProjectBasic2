import React from "react";
import Navbar from "../components/Navbar";

const Favourites = () => {
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
    <div>
      <Navbar
        menuItemsLeft={menuItemsLeft}
        menuItemsRight={menuItemsRight}
      ></Navbar>
      Favourites
    </div>
  );
};

export default Favourites;

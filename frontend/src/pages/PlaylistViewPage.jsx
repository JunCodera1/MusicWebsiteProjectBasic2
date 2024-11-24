import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SinglePlaylistCard from "../components/SinglePlaylistCard"; // Import the new component
import { Button } from "@chakra-ui/react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";

const PlaylistViewPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(`/playlist/get/me`);
        setPlaylistDetails(response.data); // Assumes the response data is an array of playlists
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getData();
  }, [playlistId]);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <CreatePlaylistModal
        isOpen={showCreateModal}
        closeModal={closeCreateModal}
      />
      <div className="flex justify-between items-center pt-8">
        <div className="text-white text-xl font-semibold">My Playlists</div>
        <Button colorScheme="blue" onClick={openCreateModal}>
          Create Playlist
        </Button>
      </div>
      {playlistDetails.length > 0 ? (
        <div className="pt-10 space-y-3">
          {playlistDetails.map((playlist) => (
            <SinglePlaylistCard
              key={playlist._id} // Assuming each playlist has a unique ID
              playlist={playlist} // Passing the playlist data
            />
          ))}
        </div>
      ) : (
        <div className="text-white">Loading Playlists...</div>
      )}
    </LoggedInContainer>
  );
};

export default PlaylistViewPage;

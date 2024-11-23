import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/SingleSongCard";
import { Button } from "@chakra-ui/react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal"; // Import modal tạo playlist

const PlaylistViewPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false); // Trạng thái để hiển thị modal
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `/playlist/get/playlist/${playlistId}`
        );
        setPlaylistDetails(response.data);
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
      />{" "}
      {/* Hiển thị modal nếu cần */}
      <div className="flex justify-between items-center pt-8">
        <div className="text-white text-xl font-semibold">
          {playlistDetails.name}
        </div>
        <Button
          colorScheme="blue"
          onClick={openCreateModal} // Mở modal khi nhấn nút
        >
          Create Playlist
        </Button>
      </div>
      {playlistDetails._id ? (
        <div className="pt-10 space-y-3">
          {playlistDetails.songs.map((song) => {
            return (
              <SingleSongCard
                info={song}
                key={song._id} // Using the song's unique id as the key
                onPlay={() => {}}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-white">Loading Playlist...</div>
      )}
    </LoggedInContainer>
  );
};

export default PlaylistViewPage;

import React, { useState } from "react";
import SingleSongCard from "./SingleSongCard"; // Assuming you have this component for songs
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"; // Optional, for a dropdown icon
import EditPlaylistModal from "../modals/EditPlaylistModal"; // Import the EditPlaylistModal

const SinglePlaylistCard = ({ playlist }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="playlist-card bg-gray-800 p-4 rounded-lg">
      <div className="playlist-header flex justify-between items-center">
        <div className="playlist-name text-white text-xl font-semibold">
          {playlist.name}
        </div>

        {/* "More" dropdown to edit playlist */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="blue"
          >
            More
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openEditModal}>Edit Playlist</MenuItem>
            {/* Other options like delete can go here */}
          </MenuList>
        </Menu>
      </div>

      {/* Description of the playlist */}
      <div className="playlist-desc text-gray-400">
        {playlist.desc || "No description available"}
      </div>

      <div className="songs-list pt-5">
        {loading ? (
          <Spinner size="xl" color="blue.500" />
        ) : error ? (
          <div className="text-white">{error}</div>
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <SingleSongCard
              key={song._id} // Sử dụng id hoặc giá trị duy nhất từ đối tượng `song`
              info={song}
              onPlay={() => {}}
            />
          ))
        ) : (
          <div className="text-white">No songs in this playlist</div>
        )}
      </div>

      {/* Modal for editing the playlist */}
      <EditPlaylistModal
        isOpen={showEditModal}
        closeModal={closeEditModal}
        playlist={playlist} // Pass the playlist data to the modal for editing
      />
    </div>
  );
};

export default SinglePlaylistCard;

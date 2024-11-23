import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { makeAuthenticatedPUTRequest } from "../utils/serverHelper";

const EditPlaylistModal = ({ closeModal, isOpen, playlist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  // Populate the fields with existing playlist data when modal is opened
  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.name || "");
      setPlaylistThumbnail(playlist.thumbnail || "");
      setPlaylistDescription(playlist.desc || "");
    }
  }, [playlist, isOpen]);

  // Function to update the playlist
  const updatePlaylist = async () => {
    const data = {
      name: playlistName,
      thumbnail: playlistThumbnail,
      description: playlistDescription,
      songs: playlist.songs || [],
    };

    try {
      const response = await makeAuthenticatedPUTRequest(
        `/playlist/update/${playlist._id}`,
        data
      );
      if (response._id) {
        closeModal(); // Close modal after successful update
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="appBlack" color="white" p={8}>
        <ModalHeader>Edit Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text mb={2}>Name</Text>
            <Input
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              bg="gray.700"
              color="white"
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Thumbnail</Text>
            <Input
              value={playlistThumbnail}
              onChange={(e) => setPlaylistThumbnail(e.target.value)}
              placeholder="Playlist Thumbnail URL"
              bg="gray.700"
              color="white"
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Description</Text>
            <Input
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              placeholder="Playlist Description"
              bg="gray.700"
              color="white"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={updatePlaylist}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPlaylistModal;

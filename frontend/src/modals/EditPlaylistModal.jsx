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
  Spinner,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { makeAuthenticatedPUTRequest } from "../utils/serverHelper";

const EditPlaylistModal = ({ closeModal, isOpen, playlist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Populate the fields with existing playlist data when modal is opened
  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.name || "");
      setPlaylistThumbnail(playlist.thumbnail || "");
      setPlaylistDescription(playlist.desc || "");
      setErrorMessage(""); // Clear any previous error messages
    }
  }, [playlist, isOpen]);

  // Function to update the playlist
  const updatePlaylist = async () => {
    setLoading(true);
    const data = {
      name: playlistName,
      thumbnail: playlistThumbnail,
      desc: playlistDescription, // Ensure this matches your API
      songs: playlist.songs || [],
    };

    try {
      const response = await makeAuthenticatedPUTRequest(
        `/playlist/put/edit/${playlist._id}`,
        data
      );
      if (response._id) {
        closeModal(); // Close modal after successful update
        setPlaylistName("");
        setPlaylistThumbnail("");
        setPlaylistDescription(""); // Clear form fields after success
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
      setErrorMessage("An error occurred while updating the playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="appBlack" color="white" p={8}>
        <ModalHeader>Edit Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorMessage && (
            <Box mb={4} color="red.500">
              <Text>{errorMessage}</Text>
            </Box>
          )}
          <Box mb={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist Name"
                bg="gray.700"
                color="white"
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl>
              <FormLabel>Thumbnail</FormLabel>
              <Input
                value={playlistThumbnail}
                onChange={(e) => setPlaylistThumbnail(e.target.value)}
                placeholder="Playlist Thumbnail URL"
                bg="gray.700"
                color="white"
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                placeholder="Playlist Description"
                bg="gray.700"
                color="white"
              />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          {loading ? (
            <Button colorScheme="blue" isLoading>
              Saving...
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={updatePlaylist}>
              Save Changes
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPlaylistModal;

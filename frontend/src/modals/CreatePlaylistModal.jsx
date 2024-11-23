import { useState } from "react";
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
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeModal, isOpen }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    if (response._id) {
      closeModal(); // Close modal after creating playlist
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="appBlack" color="white" p={8}>
        <ModalHeader>Create Playlist</ModalHeader>
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={createPlaylist}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePlaylistModal;

import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Image,
  useDisclosure,
  VStack,
  Flex,
} from "@chakra-ui/react";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <Modal isOpen={true} onClose={closeModal} size="lg">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="lg">
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="semibold">
          Select a Playlist
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {myPlaylists.length > 0 ? (
              myPlaylists.map((item) => (
                <PlaylistListComponent
                  key={item._id}
                  info={item}
                  addSongToPlaylist={addSongToPlaylist}
                />
              ))
            ) : (
              <Text color="gray.400" textAlign="center">
                You don't have any playlists yet.
              </Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
  return (
    <Flex
      bg="gray.700"
      p={4}
      borderRadius="md"
      alignItems="center"
      _hover={{ bg: "gray.600", cursor: "pointer" }}
      transition="background-color 0.2s"
      onClick={() => addSongToPlaylist(info._id)}
    >
      <Image
        src={info.thumbnail}
        boxSize="48px"
        borderRadius="md"
        alt="playlist-thumbnail"
        mr={4}
      />
      <Text fontSize="lg" fontWeight="medium">
        {info.name}
      </Text>
    </Flex>
  );
};

export default AddToPlaylistModal;

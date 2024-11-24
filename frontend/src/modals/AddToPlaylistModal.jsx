import { useState, useEffect } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelper";
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
  useToast,
} from "@chakra-ui/react";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist, songId }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistLoading, setPlaylistLoading] = useState({});
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
      console.log(myPlaylists);
    };
    getData();
  }, []);

  const handleAddSong = async (playlistId, songId) => {
    // Add songId as a parameter
    setPlaylistLoading((prev) => ({ ...prev, [playlistId]: true }));
    try {
      const response = await makeAuthenticatedPOSTRequest(
        `/playlist/add/song/${playlistId}/${songId}`
      );

      if (!response.error) {
        toast({
          title: "Song added!",
          description: "The song has been successfully added to your playlist.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        closeModal(); // Close the modal on success
      } else {
        throw new Error(response.message || "Failed to add song to playlist");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "There was an error adding the song to your playlist.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setPlaylistLoading((prev) => ({ ...prev, [playlistId]: false }));
    }
  };

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
                  handleAddSong={handleAddSong}
                  loading={playlistLoading[item._id]} // Pass individual playlist loading state
                  songId={songId}
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

const PlaylistListComponent = ({ info, handleAddSong, loading, songId }) => {
  return (
    <Flex
      bg="gray.700"
      p={4}
      borderRadius="md"
      alignItems="center"
      _hover={{ bg: "gray.600", cursor: "pointer" }}
      transition="background-color 0.2s"
      onClick={() => handleAddSong(info._id, songId)}
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
      {loading && (
        <Text color="blue.400" ml={4}>
          Adding...
        </Text>
      )}{" "}
      {/* Show loading indicator for each playlist */}
    </Flex>
  );
};

export default AddToPlaylistModal;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Stack, Spinner } from "@chakra-ui/react";
import LoggedInContainer from "@/containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "@/utils/serverHelper";
import SingleSongCard from "@/components/SingleSongCard";

const PlaylistDetails = () => {
  const { playlistId } = useParams(); // Lấy ID playlist từ URL
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const getPlaylistDetails = async () => {
      const url = `/playlist/get/playlist/${playlistId}`; // Construct the correct URL

      try {
        // Gửi yêu cầu tới API để lấy playlist theo playlistId
        const response = await makeAuthenticatedGETRequest(url);
        console.log("Full response:", response); // Log toàn bộ response
        setPlaylist(response); // Lưu dữ liệu playlist vào state
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    getPlaylistDetails(); // Gọi hàm khi component render
  }, [playlistId]); // Chạy lại khi playlistId thay đổi

  if (!playlist) {
    return (
      <LoggedInContainer curActiveScreen={"library"}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Spinner size="xl" color="white" />
        </Box>
      </LoggedInContainer>
    );
  }

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <Box pt={8}>
        <Text fontSize="2xl" fontWeight="semibold" color="white">
          {playlist.name}
        </Text>
        <Text color="gray.400" mt={2}>
          {playlist.desc || "No description available"}
        </Text>
        <Stack spacing={4} pt={10}>
          {playlist.songs.length > 0 ? (
            playlist.songs.map((song) => (
              <SingleSongCard key={song._id} info={song} onPlay={() => {}} />
            ))
          ) : (
            <Text color="white">No songs in this playlist</Text>
          )}
        </Stack>
      </Box>
    </LoggedInContainer>
  );
};

export default PlaylistDetails;

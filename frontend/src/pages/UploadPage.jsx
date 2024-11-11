import React, { useState } from "react";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import {
  Box,
  Heading,
  Text,
  Progress,
  VStack,
  Icon,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { Navigate, useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [artist, setArtist] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [musicName, setMusicName] = useState("");
  const [genre, setGenre] = useState("");
  const [playlistURL, setPlaylistURL] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = {
      artist,
      thumbnail,
      name: musicName,
      genre,
      track: playlistURL,
    };
    const response = await makeUnauthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create a song");
      return;
    }
    alert("Success!");
    navigate("/home");
  };

  // Cloudinary upload

  const [progress, setProgress] = useState(0);
  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
  ];

  const menuItemsRight = [{ label: "Login", uri: "/login" }];

  const handleFileUpload = (event) => {
    setProgress(100); // Static for demonstration; replace with actual upload logic if needed
  };

  const handleFileUploadSuccess = (url, filename) => {
    setPlaylistURLs((prevURLs) => [...prevURLs, url]); // Thêm URL mới vào mảng
    setUploadedFileNames((prevNames) => [...prevNames, filename]); // Thêm tên tệp mới vào mảng
  };

  return (
    <div>
      <Navbar
        menuItemsLeft={menuItemsLeft}
        menuItemsRight={menuItemsRight}
      ></Navbar>
      <Layout>
        <Box maxW="1400px" mx="auto" py={1}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="flex-start"
            justify="space-between"
            gap={8}
            boxSizing="border-box"
            mx="auto"
            px={{ base: 4, md: 6 }}
          >
            {/* Form nhập thông tin nhạc, bên trái */}
            <Box
              flex="1"
              minW={{ base: "100%", md: "50%" }}
              mb={{ base: 8, md: 0 }}
            >
              <Heading size="md" mb={4}>
                Song profile
              </Heading>
              <VStack spacing={4} align="stretch">
                <FormControl id="artist">
                  <FormLabel>Artist</FormLabel>
                  <TextInput
                    type="text"
                    placeholder="Enter artist name"
                    value={artist}
                    setValue={setArtist}
                  />
                </FormControl>

                <FormControl id="thumbnail">
                  <FormLabel>Thumbnail</FormLabel>
                  <TextInput
                    placeholder={"Enter thumbnail"}
                    value={thumbnail}
                    setValue={setThumbnail}
                  />
                </FormControl>

                <FormControl id="musicName">
                  <FormLabel>Music name</FormLabel>
                  <TextInput
                    placeholder="Enter music name"
                    value={musicName}
                    setValue={setMusicName}
                  />
                </FormControl>

                <FormControl id="playlistURL">
                  <FormLabel>Playlist URL</FormLabel>
                  <TextInput
                    placeholder="Enter playlist URL"
                    value={playlistURL}
                    setValue={setPlaylistURL}
                  />
                </FormControl>

                <FormControl id="genre">
                  <FormLabel>Genre</FormLabel>
                  <TextInput
                    placeholder={"Enter your genre"}
                    value={genre}
                    setValue={setGenre}
                  />
                </FormControl>
                <Box display="flex" justifyContent="center" mt={"0"}>
                  <div
                    className="bg-teal-500 w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                    onClick={submitSong}
                  >
                    Submit Song
                  </div>
                </Box>
              </VStack>
            </Box>

            {/* Phần chứa tiêu đề và upload, bên phải */}
            <Box
              flex="1"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              p={6}
              minH={{ base: "auto", md: "50vh" }}
              w={{ base: "100%", md: "50%" }}
            >
              <Heading size="lg" mb={2}>
                Upload your audio files.
              </Heading>
              <Text mb={4}>
                For optimal quality, use WAV, FLAC, AIFF, or ALAC formats. The
                maximum file size is 4 GB uncompressed.
              </Text>

              {/* Phần upload */}
              <Box
                border="1px dashed"
                borderColor="gray.300"
                py={10}
                borderRadius="md"
                bg="white"
                textAlign="center"
                onDragOver={(e) => e.preventDefault()}
              >
                <Icon
                  as={FaCloudUploadAlt}
                  boxSize={12}
                  color="teal.500"
                  mb={4}
                />
                <Heading size="md" mb={2}></Heading>
                <div>
                  <CloudinaryUpload
                    setUrl={setPlaylistURL}
                    setName={setUploadedSongFileName}
                  />
                  <div>
                    {uploadedSongFileName ? (
                      <div className="bg-green-500 rounded-full p-3 w-1/3">
                        {uploadedSongFileName.substring(0, 35)}...
                        <br />
                      </div>
                    ) : (
                      <div>
                        <br />
                        "No file uploaded yet"
                      </div>
                    )}
                  </div>
                </div>

                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  accept=".wav,.flac,.aiff,.alac"
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </div>
  );
};

export default UploadPage;

import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Heading,
  Text,
  Button,
  Progress,
  VStack,
  Icon,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const UploadPage = () => {
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

  return (
    <div>
      <Navbar
        menuItemsLeft={menuItemsLeft}
        menuItemsRight={menuItemsRight}
      ></Navbar>
      <Layout>
        <Box maxW="1400px" mx="auto" py={10}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="flex-start"
            justify="space-between"
            gap={8}
            boxSizing="border-box"
            marginRight={{ base: 0, md: "5vw" }}
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
                Thông Tin Bài Hát
              </Heading>
              <VStack spacing={4} align="stretch">
                <FormControl id="author">
                  <FormLabel>Tác Giả</FormLabel>
                  <Input type="text" placeholder="Nhập tên tác giả" />
                </FormControl>

                <FormControl id="uploadDate">
                  <FormLabel>Ngày Upload</FormLabel>
                  <Input type="date" />
                </FormControl>

                <FormControl id="musicName">
                  <FormLabel>Tên Nhạc</FormLabel>
                  <Input type="text" placeholder="Nhập tên nhạc" />
                </FormControl>

                <FormControl id="genre">
                  <FormLabel>Chủ Đề</FormLabel>
                  <Select placeholder="Chọn chủ đề">
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="hiphop">Hip Hop</option>
                  </Select>
                </FormControl>
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
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                0 % of your uploads used
              </Text>
              <Progress colorScheme="teal" size="sm" value={progress} mb={4} />

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
                onDrop={handleFileUpload}
                onDragOver={(e) => e.preventDefault()}
              >
                <Icon
                  as={FaCloudUploadAlt}
                  boxSize={12}
                  color="teal.500"
                  mb={4}
                />
                <Heading size="md" mb={2}>
                  Kéo và Thả Tệp Lên hoặc Click để Tải Lên
                </Heading>
                <Button
                  colorScheme="teal"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Chọn Tệp
                </Button>
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

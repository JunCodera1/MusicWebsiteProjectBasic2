// pages/UploadPage.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Box, Heading, Text, Button, Progress, VStack, Icon } from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadPage = () => {
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    // Upload logic and progress update (e.g., API upload)
    // Currently simulating progress increment
    setProgress(50); // set the progress percentage here
  };

  return (
    <Layout>
      <Box textAlign="center" maxW="600px" mx="auto" py={10}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>0 % of your uploads used</Text>
        <Progress colorScheme="teal" size="sm" value={progress} mb={4} />

        <Heading size="lg" mb={2}>Upload your audio files.</Heading>
        <Text mb={4}>
          For optimal quality, use WAV, FLAC, AIFF, or ALAC formats. The maximum file size is 4 GB uncompressed.
        </Text>

        <VStack spacing={4} border="1px dashed" borderColor="gray.300" py={10} borderRadius="md" bg="gray.50">
          <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.400" />
          <Text>Drag and drop an audio file to start.</Text>
          <Button colorScheme="teal" onClick={() => document.getElementById('fileInput').click()}>Choose files</Button>
          <input id="fileInput" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </VStack>
      </Box>
    </Layout>
  );
};

export default UploadPage;

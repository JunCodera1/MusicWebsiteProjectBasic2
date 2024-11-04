// pages/UploadPage.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Box, Heading } from '@chakra-ui/react';

const UploadPage = () => {
  return (
    <Layout>
      <Box>
        <Heading size="lg" mb={4}>
          Upload New Content
        </Heading>

      </Box>
    </Layout>
  );
};

export default UploadPage;
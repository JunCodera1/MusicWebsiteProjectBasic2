import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Library = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>Library</Heading>
            <Text>Your saved songs and albums</Text>
        </Box>
    );
};

export default Library;
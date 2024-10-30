import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, List, ListItem } from '@chakra-ui/react';

const Home = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/songs')
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the songs!', error);
            });
    }, []);

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>Home</Heading>
            <Text>Welcome to Spotify Clone</Text>
            <List spacing={3} mt={4}>
                {songs.map(song => (
                    <ListItem key={song.id}>
                        {song.title} by {song.artist}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Home;
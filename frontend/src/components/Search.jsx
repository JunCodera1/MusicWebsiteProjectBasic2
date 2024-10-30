import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, Input, List, ListItem } from '@chakra-ui/react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        axios.get(`https://api.soundcloud.com/tracks?client_id=YOUR_SOUNDCLOUD_CLIENT_ID&q=${query}`)
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the search results!', error);
            });
    };

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>Search</Heading>
            <Input
                placeholder="Search for songs, artists, albums..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <List spacing={3} mt={4}>
                {results.map(result => (
                    <ListItem key={result.id}>
                        {result.title} by {result.user.username}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Search;
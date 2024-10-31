import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return; // Don't search if query is empty
    setLoading(true);
    setError(""); // Clear previous error

    try {
      const response = await axios.get(
        `https://api.soundcloud.com/tracks?client_id=${process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}&q=${query}`
      );
      setResults(response.data);
    } catch (err) {
      setError("There was an error fetching the search results!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Debounce the search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // Adjust the delay as necessary

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Search
      </Heading>
      <Input
        placeholder="Search for songs, artists, albums..."
        value={query}
        width={500}
        color={useColorModeValue("teal.700", "blue.200")}
        _placeholder={{ color: "inherit" }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      {loading && <Spinner mt={4} />}
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
      <List spacing={3} mt={4}>
        {results.length > 0 ? (
          results.map((result) => (
            <ListItem key={result.id}>
              {result.title} by {result.user.username}
            </ListItem>
          ))
        ) : (
          <Text mt={4}>No results found</Text>
        )}
      </List>
    </Box>
  );
};

export default Search;

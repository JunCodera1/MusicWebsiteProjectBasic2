import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaPlay, FaSearch } from "react-icons/fa";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Box,
  Flex,
  Grid,
  Image,
  Text,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import LoggedInContainer from "@/containers/LoggedInContainer";

const fakeTracks = [
  {
    id: 1,
    name: "Sunset Serenade",
    artist: "Mellow Melodies",
    thumbnail: "https://source.unsplash.com/random/800x600?music,sunset",
    price: 1.99,
    genre: "Chill",
  },
  {
    id: 2,
    name: "Urban Rhythm",
    artist: "City Soundscape",
    thumbnail: "https://source.unsplash.com/random/800x600?music,city",
    price: 2.49,
    genre: "Electronic",
  },
  {
    id: 3,
    name: "Forest Whispers",
    artist: "Nature's Symphony",
    thumbnail: "https://source.unsplash.com/random/800x600?music,forest",
    price: 1.79,
    genre: "Ambient",
  },
  {
    id: 4,
    name: "Neon Nights",
    artist: "Synth Wave",
    thumbnail: "https://source.unsplash.com/random/800x600?music,neon",
    price: 2.99,
    genre: "Synthwave",
  },
  {
    id: 5,
    name: "Jazz Cafe",
    artist: "Smooth Quartet",
    thumbnail: "https://source.unsplash.com/random/800x600?music,jazz",
    price: 2.29,
    genre: "Jazz",
  },
  {
    id: 6,
    name: "Acoustic Dreams",
    artist: "Strings & Wood",
    thumbnail: "https://source.unsplash.com/random/800x600?music,acoustic",
    price: 1.89,
    genre: "Acoustic",
  },
];

const StorePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchStoreData();
  }, []);

  useEffect(() => {
    const results = tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTracks(results);
  }, [searchTerm, tracks]);

  const fetchStoreData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTracks(fakeTracks);
    } catch (error) {
      setError("Failed to load store data. Please try again later.");
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (track) => {
    setCart([...cart, track]);
    toast({
      title: "Added to cart",
      description: `${track.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const removeFromCart = (trackId) => {
    setCart(cart.filter((item) => item.id !== trackId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <LoggedInContainer>
      <Box className="store-page p-6">
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontSize="2xl" fontWeight="semibold">
            Store
          </Text>
          <Button
            leftIcon={<FaShoppingCart />}
            colorScheme="blue"
            onClick={onOpen}
          >
            Cart ({cart.length})
          </Button>
        </Flex>

        <InputGroup mb={6}>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search tracks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {loading ? (
          <Flex justify="center" align="center" height="50vh">
            <Button
              isLoading
              loadingText="Loading tracks..."
              colorScheme="blue"
              variant="outline"
            >
              Loading
            </Button>
          </Flex>
        ) : error ? (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {filteredTracks.map((track) => (
              <Box
                key={track.id}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={track.thumbnail} alt={track.name} />
                <Box p={4}>
                  <Text fontWeight="semibold" fontSize="lg" mb={2}>
                    {track.name}
                  </Text>
                  <Text color="gray.500" mb={2}>
                    {track.artist}
                  </Text>
                  <Badge colorScheme="purple" mb={2}>
                    {track.genre}
                  </Badge>
                  <Text fontWeight="bold" mb={4}>
                    ${track.price.toFixed(2)}
                  </Text>
                  <Flex justify="space-between">
                    <Button size="sm" leftIcon={<FaPlay />} colorScheme="green">
                      Play
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FaHeart />}
                      colorScheme="red"
                      variant="outline"
                    >
                      Like
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FaShoppingCart />}
                      colorScheme="blue"
                      onClick={() => addToCart(track)}
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        )}

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody>
              {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
              ) : (
                cart.map((item) => (
                  <Flex
                    key={item.id}
                    justify="space-between"
                    align="center"
                    mb={4}
                  >
                    <Box>
                      <Text fontWeight="semibold">{item.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {item.artist}
                      </Text>
                    </Box>
                    <Flex align="center">
                      <Text fontWeight="bold" mr={4}>
                        ${item.price.toFixed(2)}
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Flex>
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth={1}>
              <Flex width="100%" justify="space-between" align="center">
                <Text fontWeight="semibold">Total: ${getTotalPrice()}</Text>
                <Button colorScheme="green" isDisabled={cart.length === 0}>
                  Checkout
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </LoggedInContainer>
  );
};

export default StorePage;

import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { makeAuthenticatedGETRequest } from "@/utils/serverHelper";
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
const mockUsers = [
  {
    username: "Minh Tiến",
    avatar: "https://i.pravatar.cc/150?u=minhtien",
    bio: "Music enthusiast. Always vibing 🎵",
    followersCount: 120,
    playlistsCount: 15,
  },
  {
    username: "Phương",
    avatar: "https://i.pravatar.cc/150?u=phuong",
    bio: "Lofi beats and chill vibes.",
    followersCount: 200,
    playlistsCount: 8,
  },
];

const UserView = ({ titleText }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/user/get/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-8 py-6">
      <Box
        p="5"
        fontFamily="semibold"
        color={useColorModeValue("black", "gray.200")}
        mb="5"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          {titleText}
        </Text>
      </Box>
      {/* Thêm overflowX="auto" để scroll ngang */}
      <Box overflowX="auto" whiteSpace="nowrap" ml="5">
        <div className="flex gap-6">
          {/* Sử dụng flexbox để xếp các thẻ theo hàng ngang */}
          {Array.isArray(users) &&
            users.map((user, index) => (
              <div key={user.id} className="flex-shrink-0">
                <UserCard
                  username={user.username}
                  avatar={user.thumbnail}
                  bio={user.bio}
                  followersCount={user.followers}
                  playlistsCount={user.playlists}
                />
              </div>
            ))}
        </div>
      </Box>
    </div>
  );
};

export default UserView;

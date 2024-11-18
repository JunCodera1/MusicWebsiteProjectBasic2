import { Box, Button, Heading, Icon, Text, useToast } from "@chakra-ui/react";
import { openUploadWidget } from "../utils/CloudinaryService";
import { FaCloudUploadAlt } from "react-icons/fa";

const CloudinaryUploadAvatar = ({ setAvatarUrl }) => {
  const toast = useToast();

  const uploadImageWidget = () => {
    openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local"], // Only allow local uploads
        cropping: true, // Enable image cropping
        multiple: false, // Allow only one file at a time
        folder: "avatars", // Save in the 'avatars' folder
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setAvatarUrl(imageUrl); // Pass the avatar URL to the parent component
          toast({
            title: "Upload Successful!",
            description: "Your avatar has been uploaded successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (error) {
          console.error("Upload Error:", error);
          toast({
            title: "Upload Failed",
            description: "Failed to upload avatar. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    ).open();
  };

  return (
    <Box
      border="1px dashed"
      borderColor="gray.300"
      p={6}
      borderRadius="md"
      textAlign="center"
      bg="white"
      width={"15vw"}
    >
      <Icon as={FaCloudUploadAlt} boxSize={10} color="teal.500" mb={4} />
      <Heading size="md" mb={4}>
        Upload Your Avatar
      </Heading>
      <Text mb={4} color="gray.600">
        Click the button below to upload your profile picture.
      </Text>
      <Button colorScheme="teal" onClick={uploadImageWidget}>
        Upload Avatar
      </Button>
    </Box>
  );
};

export default CloudinaryUploadAvatar;

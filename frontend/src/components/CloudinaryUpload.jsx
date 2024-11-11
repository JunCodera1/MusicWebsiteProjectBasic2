import { Button } from "@chakra-ui/react";
import { openUploadWidget } from "../utils/CloudinaryService";

const CloudinaryUpload = ({ setUrl, setName }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          console.log(result.info);
          setUrl(result.info.secure_url); // Set URL from result
          setName(result.info.original_filename); // Set file name
          setProgress(100);
        } else {
          console.log(error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <Button colorScheme="teal" onClick={uploadImageWidget}>
      Upload
    </Button>
  );
};

export default CloudinaryUpload;
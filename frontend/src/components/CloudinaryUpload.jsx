import { openUploadWidget } from "../utils/CloudinaryService";

const CloudinaryUpload = () => {
    const uploadImageWidget = () => {

        let myUploadWidget = openUploadWidget(
            {

                cloudName: " sfsffsdsfsf",
                uploadPreset: "fsfsdsfsfds",
                sources: ["local"],
            },

            function (error, result) {
                if (!error && result.event === "success") {
                    console.log(result.info);

                }
                else {
                    alert("Upload failed");
                    console.log(error);
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button className="greenButton" onclick={uploadImageWidget} >
            Upload Image
        </button >
    );
};
export default CloudinaryUpload;
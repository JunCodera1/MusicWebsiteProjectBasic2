import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/SingleSongCard";

const PlaylistViewPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `/playlist/get/playlist/${playlistId}`
        );
        setPlaylistDetails(response.data); // Assuming the response data is under 'data'
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getData();
  }, [playlistId]);

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      {playlistDetails._id ? (
        <div>
          <div className="text-white text-xl pt-8 font-semibold">
            {playlistDetails.name}
          </div>
          <div className="pt-10 space-y-3">
            {playlistDetails.songs.map((song) => {
              return (
                <SingleSongCard
                  info={song}
                  key={song._id} // Using the song's unique id as the key
                  onPlay={() => {}}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-white">Loading Playlist...</div>
      )}
    </LoggedInContainer>
  );
};

export default PlaylistViewPage;

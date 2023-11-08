import React, { useEffect, useState } from "react";

import { spotifyApi } from "../constants/Spotify";
import TrackStat from "./TrackStat";

import { Stack, Typography } from "@mui/material";

const TrackInfoPanel = ({ track }) => {
    const [trackFeatures, setTrackFeatures] = useState({});
    useEffect(() => {
        spotifyApi
            .getAudioFeaturesForTrack(track.id)
            .then((data) => {
                console.log(data);
                setTrackFeatures(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [track]);
    return (
        <div style={{ height: "25%" }}>
            <Typography variant="subtitle1" gutterBottom textAlign={"center"}>
                Track Info
            </Typography>
            {Object.keys(track).length !== 0 ? (
                <Stack direction="row" gap={5} padding={3}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            whiteSpace: "nowrap",
                            width: "20rem",
                            overflow: "hidden",
                        }}
                    >
                        <img alt="album art" src={track.album.images[2].url} />
                        <Typography>
                            {track.artists.map((artist, index) => {
                                return `${artist.name}${
                                    index < track.artists.length - 1 ? ", " : ""
                                }`;
                            })}{" "}
                            - {track.name}
                        </Typography>
                    </div>
                    <TrackStat
                        value={trackFeatures.energy * 100}
                        label="energy"
                    />
                    <TrackStat
                        value={trackFeatures.danceability * 100}
                        label="danceability"
                    />
                    <TrackStat
                        value={trackFeatures.acousticness * 100}
                        label="acousticness"
                    />
                    <TrackStat
                        value={trackFeatures.speechiness * 100}
                        label="speechiness"
                    />
                </Stack>
            ) : (
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    textAlign={"center"}
                >
                    Click on a track to see its information!
                </Typography>
            )}
        </div>
    );
};

export default TrackInfoPanel;

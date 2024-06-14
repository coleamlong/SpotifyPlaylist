import React, { useEffect, useState } from "react";

import { spotifyApi } from "../constants/Spotify";

import { Box, Skeleton, Typography } from "@mui/material";
import TrackStatGroup from "./TrackStatGroup";
import TrackNameAndArt from "./TrackNameAndArt";

const TrackInfo = ({ track }) => {
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
        <Box textAlign="center" paddingY={1}>
            <Typography variant="subtitle1">Track Info</Typography>
            {Object.keys(track).length !== 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    height="125px"
                >
                    <TrackNameAndArt track={track} />
                    <TrackStatGroup trackFeatures={trackFeatures} />
                </Box>
            ) : (
                <Box height="125px">
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        textAlign={"center"}
                    >
                        Click on a track to see its information!
                    </Typography>
                    <Skeleton
                        animation={false}
                        variant="rectangular"
                        height="100px"
                    />
                </Box>
            )}
        </Box>
    );
};

export default TrackInfo;

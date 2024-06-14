import React from "react";
import { Box, Typography } from "@mui/material";

const TrackNameAndArt = ({ track }) => {
    return (
        <Box display="flex" alignItems="center" gap={1} padding={1}>
            <img alt="album art" src={track.album.images[2].url} height={50} />
            <Typography>
                {track.artists.map((artist, index) => {
                    return `${artist.name}${
                        index < track.artists.length - 1 ? ", " : ""
                    }`;
                })}{" "}
                - {track.name}
            </Typography>
        </Box>
    );
};

export default TrackNameAndArt;

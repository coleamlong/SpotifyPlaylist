import React from "react";
import TrackStat from "./TrackStat";
import { Box } from "@mui/material";

const TrackStatGroup = ({ trackFeatures }) => {
    return (
        <Box display="flex" gap={4} padding={1}>
            <TrackStat value={trackFeatures.energy * 100} label="energy" />
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
        </Box>
    );
};

export default TrackStatGroup;

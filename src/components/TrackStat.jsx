import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const TrackStat = ({ value, label }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <CircularProgress
                variant="determinate"
                value={value}
                color="success"
            />
            <Typography variant="caption">{label}</Typography>
        </div>
    );
};

export default TrackStat;

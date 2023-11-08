import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Skeleton,
} from "@mui/material";
import TrackInfoPanel from "./TrackInfoPanel";

import { makeStyles } from "@mui/styles"; // Import makeStyles from @mui/styles

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        maxWidth: 100, // Adjust the maximum width to your preference
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
});

const Tracklist = ({
    title,
    tracks,
    trackInfoPanel,
    buttonType,
    handleAdd,
    handleRemove,
    height,
}) => {
    const classes = useStyles();

    const [selectedTrack, setSelectedTrack] = useState({});

    const handleClick = (track) => {
        console.log("Clicking track: " + track.name);
        handleAdd(track);
        handleRemove(track);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
                {title}
            </Typography>
            {trackInfoPanel && <TrackInfoPanel track={selectedTrack} />}
            <TableContainer
                component={Paper}
                sx={{
                    height: height,
                    maxHeight: height,
                    overflowY: "auto",
                }}
            >
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={classes.cell}>Title</TableCell>
                            <TableCell sx={classes.cell}>Album</TableCell>
                            <TableCell sx={classes.cell}>Artists</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <TableRow
                                    key={track.id}
                                    selected={selectedTrack === track}
                                    onClick={() => {
                                        if (trackInfoPanel) {
                                            setSelectedTrack(track);
                                        }
                                    }}
                                >
                                    <TableCell padding="none">
                                        <img
                                            src={track.album.images[2].url}
                                            alt="album art"
                                            style={{ width: "3rem" }}
                                        />
                                    </TableCell>
                                    <TableCell sx={classes.cell}>
                                        {track.name}
                                    </TableCell>
                                    <TableCell sx={classes.cell}>
                                        {track.album.name}
                                    </TableCell>
                                    <TableCell sx={classes.cell}>
                                        {track.artists.map((artist, index) => {
                                            return `${artist.name}${
                                                index < track.artists.length - 1
                                                    ? ", "
                                                    : ""
                                            }`;
                                        })}
                                    </TableCell>
                                    <TableCell padding="none">
                                        <Button
                                            onClick={() => handleClick(track)}
                                        >
                                            {buttonType}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={height}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Tracklist;

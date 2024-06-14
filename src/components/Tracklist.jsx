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
import TrackInfo from "./TrackInfo";

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
    tableContainer: {
        maxHeight: 425, // Set the maximum height for the table container
    },
});

const Tracklist = ({
    title,
    tracks,
    buttonType,
    handleButtonClick,
    showTrackInfo,
}) => {
    const classes = useStyles();

    const [selectedTrack, setSelectedTrack] = useState({});

    const handleClick = (track) => {
        console.log("Clicking track: " + track.name);
        handleButtonClick(track);
    };

    return (
        <div>
            <Typography variant="h6" textAlign={"center"}>
                {title}
            </Typography>
            {showTrackInfo && <TrackInfo track={selectedTrack} />}
            <TableContainer
                component={Paper}
                className={classes.tableContainer} // Apply the custom class here
                sx={{
                    overflowY: "auto",
                }}
            >
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell className={classes.cell}>
                                Title
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Album
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Artists
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <TableRow
                                    key={track.id}
                                    selected={selectedTrack === track}
                                    onClick={() => {
                                        if (showTrackInfo) {
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
                                    <TableCell className={classes.cell}>
                                        {track.name}
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        {track.album.name}
                                    </TableCell>
                                    <TableCell className={classes.cell}>
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
                            <Skeleton variant="rectangular" width="100%" />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Tracklist;

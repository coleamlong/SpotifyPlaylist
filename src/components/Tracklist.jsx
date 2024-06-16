import React from "react";
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
import { makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles({
    cell: {
        maxWidth: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    tableContainer: {
        maxHeight: 475,
    },
});

const Tracklist = ({ title, tracks, buttonType, handleButtonClick }) => {
    const classes = useStyles();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleClick = (track) => {
        console.log("Clicking track: " + track.name);
        handleButtonClick(track);
    };

    const renderTableCell = (content, key) => (
        <TableCell key={key} className={classes.cell}>
            {content}
        </TableCell>
    );

    return (
        <div>
            <Typography variant="h6" gutterBottom textAlign="center">
                {title}
            </Typography>
            <TableContainer
                component={Paper}
                className={classes.tableContainer}
            >
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {renderTableCell("Title", "title")}
                            {!isSmallScreen &&
                                renderTableCell("Album", "album")}
                            {!isSmallScreen &&
                                renderTableCell("Artists", "artists")}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <TableRow key={track.id}>
                                    <TableCell padding="none">
                                        <img
                                            src={track.album.images[2].url}
                                            alt="album art"
                                            style={{ width: "3rem" }}
                                        />
                                    </TableCell>
                                    {renderTableCell(
                                        track.name,
                                        `name-${track.id}`
                                    )}
                                    {!isSmallScreen &&
                                        renderTableCell(
                                            track.album.name,
                                            `album-${track.id}`
                                        )}
                                    {!isSmallScreen &&
                                        renderTableCell(
                                            track.artists
                                                .map(
                                                    (artist, index) =>
                                                        `${artist.name}${
                                                            index <
                                                            track.artists
                                                                .length -
                                                                1
                                                                ? ", "
                                                                : ""
                                                        }`
                                                )
                                                .join(""),
                                            `artists-${track.id}`
                                        )}
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

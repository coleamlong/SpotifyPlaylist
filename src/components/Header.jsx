import React, { useState } from "react";
import { Stack, Modal, Button, Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { REDIRECT_URI, spotifyApi } from "../constants/Spotify";

const Header = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            padding={1}
        >
            <Typography variant="h5">Spotify Playlist Generator</Typography>

            <Button onClick={handleOpen}>
                <FontAwesomeIcon icon={faUser} inverse size="3x" />
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {props.user ? (
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {props.user.display_name}'s Profile
                        </Typography>
                        <div>
                            <img
                                className="w-50"
                                alt="Profile"
                                src={props.user.images[1].url}
                            />
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Username: {props.user.id} <br />
                                Region: {props.user.country} <br />
                                Account Type: {props.user.product} <br />
                                Followers: {props.user.followers.total} <br />
                            </Typography>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    spotifyApi.setAccessToken(null);
                                    props.setUser(null);
                                    window.location.href = REDIRECT_URI;
                                }}
                                size="lg"
                                variant="danger"
                            >
                                Sign Out
                            </Button>
                            <Button
                                onClick={handleClose}
                                size="lg"
                                variant="secondary"
                            >
                                Close
                            </Button>
                        </div>
                    </Box>
                ) : (
                    <Box sx={modalStyle}>
                        {" "}
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Login to see your profile!
                        </Typography>
                    </Box>
                )}
            </Modal>
        </Stack>
    );
};

export default Header;

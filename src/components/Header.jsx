import React, { useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { REDIRECT_URI, spotifyApi } from "../constants/Spotify";

const Header = ({ user, setUser }) => {
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
        <Box
            display="flex"
            height="3em"
            justifyContent="space-between"
            alignItems="center"
            direction="row"
        >
            <Typography>Spotify Playlist Generator</Typography>

            <Button onClick={handleOpen}>
                <FontAwesomeIcon icon={faUser} inverse />
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {user ? (
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {user.display_name}'s Profile
                        </Typography>
                        <div>
                            <img
                                className="w-50"
                                alt="Profile"
                                src={user.images[1].url}
                            />
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Username: {user.id} <br />
                                Region: {user.country} <br />
                                Account Type: {user.product} <br />
                                Followers: {user.followers.total} <br />
                            </Typography>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    spotifyApi.setAccessToken(null);
                                    setUser(null);
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
        </Box>
    );
};

export default Header;

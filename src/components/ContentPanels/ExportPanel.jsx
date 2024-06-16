import React, { useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { spotifyApi } from "../../constants/Spotify";
import Panel from "../Panel";

const ExportPanel = ({ tracks, user }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        console.log(user);
        let playlist = await spotifyApi
            .createPlaylist(user.id, {
                name: formData.name,
                description: formData.description,
            })
            .catch((err) => {
                console.log(err);
            });
        let track_uris = [];
        for (let i = 0; i < tracks.length; i++) {
            track_uris.push(tracks[i].uri);
        }

        console.log(track_uris);

        spotifyApi.addTracksToPlaylist(playlist.id, track_uris).catch((err) => {
            console.log(err);
        });

        alert("Playlist exported. Check your Spotify!");
    };
    return (
        <Panel>
            <Stack gap={2}>
                <Typography variant="h6" gutterBottom textAlign={"center"}>
                    Export Playlist
                </Typography>

                <TextField
                    name="name"
                    label="Playlist Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <TextField
                    name="description"
                    label="Playlist Description"
                    variant="outlined"
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <Button onClick={handleSubmit} variant="contained">
                    Export
                </Button>
            </Stack>
        </Panel>
    );
};

export default ExportPanel;

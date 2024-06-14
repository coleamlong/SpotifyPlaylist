import React, { useEffect, useState } from "react";

import { Stack, Button, Box } from "@mui/material";

import { spotifyApi } from "./constants/Spotify.jsx";
import Header from "./components/Header.jsx";
import LoginModal from "./components/LoginModal.jsx";
import Tracklist from "./components/Tracklist.jsx";
import ExportPlaylistForm from "./components/ExportPlaylistForm.jsx";

const App = () => {
    const [user, setUser] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [seedTracks, setSeedTracks] = useState([]);
    const [recTracks, setRecTracks] = useState([]);

    useEffect(() => {
        if (user) {
            spotifyApi
                .getMyTopTracks()
                .then((data) => {
                    setTopTracks(data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setTopTracks([]);
        }
    }, [user]);

    const handleRecs = () => {
        let seedTrackIds = [];
        for (let i = 0; i < seedTracks.length; i++) {
            seedTrackIds.push(seedTracks[i].id);
        }
        spotifyApi
            .getRecommendations({
                seed_tracks: seedTrackIds,
            })
            .then((data) => {
                setRecTracks(data.tracks);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box className="App">
            <Stack>
                <Header user={user ? user : null} setUser={(u) => setUser(u)} />
                {user ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ width: "98%" }}
                        >
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ width: "100%" }}
                            >
                                <Tracklist
                                    title="Top Tracks"
                                    trackInfoPanel
                                    tracks={topTracks}
                                    buttonType="Add"
                                    handleAdd={(track) => {
                                        if (seedTracks.length < 5) {
                                            setSeedTracks([
                                                ...seedTracks,
                                                track,
                                            ]);
                                        }
                                    }}
                                    handleRemove={(track) => {
                                        if (seedTracks.length < 5) {
                                            if (topTracks.includes(track)) {
                                                let updatedTopTracks =
                                                    topTracks.filter(
                                                        (t) => t.id !== track.id
                                                    );
                                                setTopTracks(updatedTopTracks);
                                            }
                                        } else {
                                            alert(
                                                "Can only have 5 seed tracks"
                                            );
                                        }
                                    }}
                                    height="40vh"
                                />

                                <Tracklist
                                    title="Seed Tracks (5 max)"
                                    tracks={seedTracks}
                                    buttonType="Remove"
                                    handleAdd={(track) =>
                                        setTopTracks([...topTracks, track])
                                    }
                                    handleRemove={(track) => {
                                        if (seedTracks.includes(track)) {
                                            let updatedSeedTracks =
                                                seedTracks.filter(
                                                    (t) => t.id !== track.id
                                                );
                                            setSeedTracks(updatedSeedTracks);
                                        }
                                    }}
                                />

                                <Button variant="outlined" onClick={handleRecs}>
                                    Get Recommendations
                                </Button>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ width: "100%" }}
                            >
                                <Tracklist
                                    title="Recommended Tracks"
                                    trackInfoPanel
                                    tracks={recTracks}
                                    buttonType="Remove"
                                    handleAdd={(track) => {}}
                                    handleRemove={(track) => {
                                        if (recTracks.includes(track)) {
                                            let updatedRecTracks =
                                                recTracks.filter(
                                                    (t) => t.id !== track.id
                                                );
                                            setRecTracks(updatedRecTracks);
                                        }
                                    }}
                                    height="40vh"
                                />
                                <ExportPlaylistForm
                                    tracks={recTracks}
                                    user={user}
                                />
                            </Stack>
                        </Stack>
                    </div>
                ) : (
                    <LoginModal
                        handleLogin={(info) => {
                            setUser(info);
                        }}
                    />
                )}
            </Stack>
        </Box>
    );
};

export default App;

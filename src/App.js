import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import SelectableTrackCard from "./components/SelectableTrackCard/SelectableTrackCard";
import { Container, Button, Stack, Modal } from "react-bootstrap";
// const URL = "https://spotify-playlist.coleamlong.com";
const URL = "http://localhost:3000";

const CLIENT_ID = "91d037f7894441b2aab67c0acec6689d";
const REDIRECT_URI = URL;
const AUTH_URL = "https://accounts.spotify.com/authorize";
const SCOPES = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
];

const LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token`;

const spotifyApi = new SpotifyWebApi();

const App = () => {
    // State variables using useState
    const [topTracks, setTopTracks] = useState([]);
    const [seedTracks, setSeedTracks] = useState([]);
    const [userData, setUserData] = useState("");

    // Event handlers for various actions
    const handleLogin = () => {
        window.location.href = LOGIN_URL;
    };

    const handleTrackSelect = (trackId) => {
        if (seedTracks.includes(trackId)) {
            const updatedSeedTracks = seedTracks.filter((id) => id !== trackId);
            setSeedTracks(updatedSeedTracks);
        } else {
            if (seedTracks.length < 5) {
                setSeedTracks([...seedTracks, trackId]);
            }
        }
    };

    const handleGen = async () => {
        let recTracks = [];
        let uris = [];

        await spotifyApi
            .getRecommendations({
                seed_tracks: seedTracks,
            })
            .then((data) => {
                recTracks = data.tracks;
            })
            .catch((err) => {
                console.log(err);
            });

        if (recTracks.length === 0) return;

        console.log("Getting uris. Test:", recTracks[0]);
        for (let i = 0; i < recTracks.length; i++) {
            uris.push(recTracks[i].uri);
        }

        if (uris.length === 0) return;

        console.log("Generating playlist");
        spotifyApi
            .createPlaylist(userData, {
                name: "Track Recommendations",
                description: "A list of new tracks for you to discover!",
            })
            .then((data) => {
                return spotifyApi.addTracksToPlaylist(data.id, uris);
            })
            .then((data) => {
                console.log("PLAYLIST MADE");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // useEffect hook for handling user authentication
    useEffect(() => {
        const hashParams = window.location.hash
            .substring(1)
            .split("&")
            .reduce((acc, param) => {
                const [key, value] = param.split("=");
                acc[key] = value;
                return acc;
            }, {});

        if (hashParams.access_token) {
            spotifyApi.setAccessToken(hashParams.access_token);
        }

        if (topTracks.length === 0) {
            spotifyApi
                .getMyTopTracks()
                .then((data) => {
                    setTopTracks(data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        if (!userData) {
            spotifyApi
                .getMe()
                .then((data) => {
                    setUserData(data.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    // Return the JSX to render the application UI
    return (
        <Modal.Dialog>
            <Container className="text-center pt-5">
                <Modal.Title>Spotify Playlist Generator</Modal.Title>
                <p>
                    Use this tool to create a custom Spotify playlist full of
                    new music inspired by your favorite songs.
                </p>
            </Container>
            <Modal.Body>
                {topTracks.length === 0 ? (
                    <Container className="text-center pb-3">
                        <Button size="lg" onClick={handleLogin}>
                            Login with Spotify
                        </Button>
                    </Container>
                ) : (
                    <Container>
                        <Container className="text-center pb-3">
                            <Button
                                disabled={
                                    seedTracks.length === 0 &&
                                    seedTracks.length <= 5
                                }
                                size="lg"
                                onClick={handleGen}
                            >
                                Generate Playlist
                            </Button>
                        </Container>

                        <Stack className="gap-3 d-flex justify-content-center">
                            {topTracks.map((track) => {
                                return (
                                    <SelectableTrackCard
                                        key={track.id}
                                        selected={false}
                                        track={track}
                                        onSelect={handleTrackSelect}
                                    />
                                );
                            })}
                        </Stack>
                    </Container>
                )}
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default App;

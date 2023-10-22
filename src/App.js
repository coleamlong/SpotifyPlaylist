import axios from "axios";
import React, { useEffect, useState } from "react";

import SelectableTrackCard from "./components/SelectableTrackCard";

import { Container, Button, Row, Col } from "react-bootstrap";

const URL = "http://localhost:3000";

const CLIENT_ID = "91d037f7894441b2aab67c0acec6689d";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_URL = "https://accounts.spotify.com/authorize";
const SCOPES = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
];

const LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token`;

const API_BASE_URL = "https://api.spotify.com/v1";

function App() {
    const [token, setToken] = useState("");
    // const [userId, setUserId] = useState("");
    // const [playlistId, setPlaylistId] = useState("");
    const [topTracks, setTopTracks] = useState([]);
    const [seedTracks, setSeedTracks] = useState([]);
    // const [trackRecs, setTrackRecs] = useState([]);
    // const [recUris, setRecUris] = useState([]);

    useEffect(() => {
        const url = window.location.hash;
        const accessTokenPattern = /access_token=([^&]+)/;
        const match = url.match(accessTokenPattern);

        if (match) {
            setToken(match[1]);

            window.history.replaceState({}, document.title, URL);
        }
    }, [token]);

    const fetchTracks = () => {
        console.log(token);
        if (topTracks.length === 0) {
            axios
                .get(API_BASE_URL + "/me/top/tracks?limit=16", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setTopTracks(response.data.items);
                })
                .catch((error) => {
                    console.error("Error fetching top tracks: ", error);
                });
        }
    };

    // const fetchRecommendations = () => {
    //     if (seedTracks.length > 0 && seedTracks.length <= 5) {
    //         console.log(seedTracks);
    //         axios
    //             .get(
    //                 `${API_BASE_URL}/recommendations?limit=5&market=US&seed_tracks=${seedTracks.join(
    //                     ","
    //                 )}`,
    //                 {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 }
    //             )
    //             .then((response) => {
    //                 setTrackRecs(response.data);
    //                 console.log("Recs: " + JSON.stringify(trackRecs));
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching recommendations: ", error);
    //             });
    //     }
    // };

    // const makePlaylist = () => {
    //     console.log(trackRecs.tracks);
    //     if (trackRecs.tracks.length > 0) {
    //         let uris = [];
    //         for (let i = 0; i < trackRecs.tracks.length; i++) {
    //             uris.push(trackRecs.tracks[i].uri);
    //         }

    //         setRecUris(uris);
    //         console.log(recUris);

    //         axios
    //             .get(API_BASE_URL + "/me", {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             })
    //             .then((response) => {
    //                 setUserId(response.data.id);
    //                 console.log(userId);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching user info: ", error);
    //             });
    //         console.log(
    //             `${API_BASE_URL}/users/${userId}/playlists?name=TestRecs`
    //         );
    //         setTimeout(() => {
    //             axios
    //                 .post(
    //                     `${API_BASE_URL}/users/${userId}/playlists?name=TestRecs`,
    //                     {
    //                         headers: { Authorization: `Bearer ${token}` },
    //                     }
    //                 )
    //                 .then((response) => {
    //                     setPlaylistId(response.data.id);
    //                     console.log(playlistId);
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error creating playlist: ", error);
    //                 });

    //             setTimeout(() => {
    //                 axios
    //                     .post(
    //                         `${API_BASE_URL}/playlists/${playlistId}/tracks?uris=${recUris.join(
    //                             ","
    //                         )}`,
    //                         {
    //                             headers: { Authorization: `Bearer ${token}` },
    //                         }
    //                     )
    //                     .then(() => {
    //                         console.log("Added URIs");
    //                     })
    //                     .catch((error) => {
    //                         console.error("Error creating playlist: ", error);
    //                     });
    //             }, 1000);
    //         }, 1000);
    //     }
    // };

    const handleTrackSelect = (trackId) => {
        if (seedTracks.includes(trackId)) {
            const updatedSeedTracks = seedTracks.filter((id) => id !== trackId);
            setSeedTracks(updatedSeedTracks);
        } else {
            if (seedTracks.length < 5) {
                setSeedTracks([...seedTracks, trackId]);
            }
        }
        console.log(seedTracks);
    };

    return (
        <Container className="text-center">
            <h1 className="py-5">Spotify Playlist Generator</h1>
            {!token && (
                <a href={LOGIN_URL}>
                    <Button size={"lg"}>Login with Spotify</Button>
                </a>
            )}

            {token && (
                <div>
                    <Button
                        disabled={topTracks.length > 0}
                        size={"lg"}
                        onClick={fetchTracks}
                    >
                        Get Top Tracks
                    </Button>
                </div>
            )}

            <Container className="py-5">
                <Row className="gap-3">
                    {topTracks.map((track) => {
                        return (
                            <Col className="d-flex align-items-stretch">
                                <SelectableTrackCard
                                    key={track.id}
                                    selected={false}
                                    track={track}
                                    onSelect={handleTrackSelect}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            {/* <Container>
                {seedTracks.map((track) => {
                    return <p>{track}</p>;
                })}
            </Container> */}
            {/* <Button onClick={fetchRecommendations}>Recs</Button>
            <Button onClick={makePlaylist}>playlist</Button> */}
        </Container>
    );
}

export default App;

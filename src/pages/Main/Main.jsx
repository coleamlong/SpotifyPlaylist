import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import "./Main.css";
import { spotifyApi } from "../../constants/Spotify.jsx";
import TopTrackPanel from "../../components/ContentPanels/TopTrackPanel.jsx";
import RecTrackPanel from "../../components/ContentPanels/RecTrackPanel.jsx";
import SeedTrackPanel from "../../components/ContentPanels/SeedTrackPanel.jsx";
import ExportPanel from "../../components/ContentPanels/ExportPanel.jsx";
import useWindowSize from "../../hooks/useWindowSize.jsx";

const Main = ({ user, setUser }) => {
    const [topTracks, setTopTracks] = useState([]);
    const [seedTracks, setSeedTracks] = useState([]);
    const [recTracks, setRecTracks] = useState([]);
    const { width } = useWindowSize();

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

    return (
        <Stack
            style={{
                width: "100%",
                height: "100vh",
            }}
        >
            <div className="panels">
                <TopTrackPanel
                    topTracks={topTracks}
                    setTopTracks={setTopTracks}
                    seedTracks={seedTracks}
                    setSeedTracks={setSeedTracks}
                />
                {width < 768 ? (
                    <>
                        <SeedTrackPanel
                            seedTracks={seedTracks}
                            setSeedTracks={setSeedTracks}
                            topTracks={topTracks}
                            setTopTracks={setTopTracks}
                            setRecTracks={setRecTracks}
                        />
                        <RecTrackPanel
                            recTracks={recTracks}
                            setRecTracks={setRecTracks}
                        />
                    </>
                ) : (
                    <>
                        <RecTrackPanel
                            recTracks={recTracks}
                            setRecTracks={setRecTracks}
                        />
                        <SeedTrackPanel
                            seedTracks={seedTracks}
                            setSeedTracks={setSeedTracks}
                            topTracks={topTracks}
                            setTopTracks={setTopTracks}
                            setRecTracks={setRecTracks}
                        />
                    </>
                )}
                <ExportPanel tracks={recTracks} user={user} />
            </div>
        </Stack>
    );
};

export default Main;

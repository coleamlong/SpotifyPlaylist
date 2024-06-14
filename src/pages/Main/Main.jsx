import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Stack } from "@mui/material";
import "./Main.css";
import { spotifyApi } from "../../constants/Spotify.jsx";
import TopTrackPanel from "../../components/Panels/TopTrackPanel.jsx";
import RecTrackPanel from "../../components/Panels/RecTrackPanel.jsx";
import SeedTrackPanel from "../../components/Panels/SeedTrackPanel.jsx";
import ExportPanel from "../../components/Panels/ExportPanel.jsx";

const Main = ({ user, setUser }) => {
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

    return (
        <Stack
            style={{
                width: "100%",
                height: "100vh",
            }}
        >
            <Header user={user} serUser={setUser} />
            <div className="panels">
                <TopTrackPanel
                    topTracks={topTracks}
                    setTopTracks={setTopTracks}
                    seedTracks={seedTracks}
                    setSeedTracks={setSeedTracks}
                />
                <RecTrackPanel
                    recTracks={recTracks}
                    setRecTracks={setRecTracks}
                />
                <SeedTrackPanel
                    seedTracks={seedTracks}
                    setSeedTracks={setSeedTracks}
                    topTracks={topTracks}
                    setTopTracks={setTopTracks}
                />
                <ExportPanel />
            </div>
        </Stack>
    );
};

export default Main;

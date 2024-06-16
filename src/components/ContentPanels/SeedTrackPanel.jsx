import React from "react";
import Panel from "../Panel.jsx";
import Tracklist from "../Tracklist.jsx";
import RecButton from "../RecButton.jsx";
import { Stack } from "@mui/material";
import { spotifyApi } from "../../constants/Spotify.jsx";

const SeedTrackPanel = ({
    seedTracks,
    setSeedTracks,
    topTracks,
    setTopTracks,
    setRecTracks,
}) => {
    const handleSeedTrackRemove = (track) => {
        setTopTracks([...topTracks, track]);
        setSeedTracks(seedTracks.filter((t) => t.id !== track.id));
    };

    const getRecs = () => {
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
        <Panel>
            <Tracklist
                title="Seed Tracks (3 Max)"
                tracks={seedTracks}
                buttonType="Remove"
                handleButtonClick={handleSeedTrackRemove}
            />
            <Stack direction="column" alignItems="center" sx={{ marginTop: 2 }}>
                <RecButton handleRecButtonClick={getRecs} />
            </Stack>
        </Panel>
    );
};

export default SeedTrackPanel;

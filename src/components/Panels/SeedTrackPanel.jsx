import React from "react";
import Panel from "../Panel";
import Tracklist from "../Tracklist";

const SeedTrackPanel = ({
    seedTracks,
    setSeedTracks,
    topTracks,
    setTopTracks,
}) => {
    const handleSeedTrackRemove = (track) => {
        setTopTracks([...topTracks, track]);
        setSeedTracks(seedTracks.filter((t) => t.id !== track.id));
    };

    return (
        <Panel>
            <Tracklist
                title="Seed Tracks (5 Max)"
                tracks={seedTracks}
                buttonType="Remove"
                handleButtonClick={handleSeedTrackRemove}
            />
        </Panel>
    );
};

export default SeedTrackPanel;

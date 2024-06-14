import React from "react";
import Panel from "../Panel";
import Tracklist from "../Tracklist";

const TopTrackPanel = ({
    topTracks,
    setTopTracks,
    seedTracks,
    setSeedTracks,
}) => {
    const handleSeedTrackAdd = (track) => {
        if (seedTracks.length < 5) {
            setTopTracks(topTracks.filter((t) => t.id !== track.id));
            setSeedTracks([...seedTracks, track]);
        } else {
            alert("Can only have 5 seed tracks");
        }
    };

    return (
        <Panel>
            <Tracklist
                title="Top Tracks"
                showTrackInfo
                tracks={topTracks}
                buttonType="Add"
                handleButtonClick={handleSeedTrackAdd}
            />
        </Panel>
    );
};

export default TopTrackPanel;

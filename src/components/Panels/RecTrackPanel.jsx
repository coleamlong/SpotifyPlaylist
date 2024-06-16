import React from "react";
import Panel from "../Panel";
import Tracklist from "../Tracklist";

const RecTrackPanel = ({ recTracks, setRecTracks }) => {
    const handleRecTrackRemove = (track) => {
        setRecTracks(recTracks.filter((t) => t.id !== track.id));
    };

    return (
        <Panel>
            <Tracklist
                title="Recommended Tracks"
                tracks={recTracks}
                buttonType="Remove"
                handleButtonClick={handleRecTrackRemove}
            />
        </Panel>
    );
};

export default RecTrackPanel;

import React, { useState } from "react";
import { Card, Stack } from "react-bootstrap";

function SelectableTrackCard({ track, onSelect }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        onSelect(track.id);
        setSelected(!selected);
    };

    return (
        <Card
            onClick={handleClick}
            className={
                selected ? "border border-primary border-5" : "border-muted"
            }
        >
            <Stack direction="horizontal">
                <Card.Img
                    style={{ width: "5rem" }}
                    src={track.album.images[1].url}
                />
                <Card.Body>
                    <Card.Title>
                        {" "}
                        {track.artists.map((artist, index) => {
                            return `${artist.name}${
                                index < track.artists.length - 1 ? ", " : ""
                            }`;
                        })}
                        {" - " + track.name}
                    </Card.Title>
                </Card.Body>
            </Stack>
        </Card>
    );
}

export default SelectableTrackCard;

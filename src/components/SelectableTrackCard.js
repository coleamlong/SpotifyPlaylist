import React, { useState } from "react";
import { Card } from "react-bootstrap";

function SelectableTrackCard({ track, onSelect }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        onSelect(track.id);
        setSelected(!selected);
    };

    return (
        <Card
            style={{ width: "18rem" }}
            onClick={handleClick}
            className={
                selected ? "border border-primary bg-primary" : "border-muted"
            }
        >
            <Card.Img variant="top" src={track.album.images[1].url} />
            <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Subtitle>{track.album.name}</Card.Subtitle>
                <Card.Text>
                    {track.artists.map((artist, index) => {
                        return `${artist.name}${
                            index < track.artists.length - 1 ? ", " : ""
                        }`;
                    })}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SelectableTrackCard;

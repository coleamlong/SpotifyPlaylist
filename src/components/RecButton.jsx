import { Button } from "@mui/material";
import React from "react";

const RecButton = ({ handleRecButtonClick }) => {
    return (
        <Button
            variant="contained"
            onClick={() => {
                console.log("Getting Recs");
                handleRecButtonClick();
            }}
        >
            Get Recommendations
        </Button>
    );
};

export default RecButton;

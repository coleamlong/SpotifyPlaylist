import { Box } from "@mui/material";
import React from "react";

const Panel = ({ children }) => {
    return (
        <Box
            margin={2}
            padding={2}
            borderRadius="1"
            height="100%"
            sx={{ backgroundColor: "#111" }}
        >
            {children}
        </Box>
    );
};

export default Panel;

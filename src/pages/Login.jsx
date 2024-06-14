import React from "react";
import LoginButton from "../components/LoginButton";
import { Box, Typography } from "@mui/material";

const Login = ({ handleLogin }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            padding={5}
            gap={4}
        >
            <Typography variant="h3">Spotify Playlist Generator</Typography>
            <Typography variant="subtitle1">
                Use this tool to generate a custom spotify playlist from a set
                of seed tracks!
            </Typography>
            <LoginButton handleLogin={handleLogin} />
        </Box>
    );
};

export default Login;

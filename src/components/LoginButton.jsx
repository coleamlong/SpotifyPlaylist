import React, { useEffect } from "react";
import { Button } from "@mui/material";
import {
    spotifyApi,
    AUTH_URL,
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES,
} from "../constants/Spotify.jsx";

const LoginButton = ({ handleLogin }) => {
    const handleClick = () => {
        window.location.href = getLoginUrl();
    };

    useEffect(() => {
        handleAccessToken();
    });

    const getLoginUrl = () => {
        return `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token`;
    };

    const handleAccessToken = () => {
        const hashParams = window.location.hash
            .substring(1)
            .split("&")
            .reduce((acc, param) => {
                const [key, value] = param.split("=");
                acc[key] = value;
                return acc;
            }, {});

        if (hashParams.access_token) {
            spotifyApi.setAccessToken(hashParams.access_token);
            spotifyApi
                .getMe()
                .then((data) => {
                    console.log(data);
                    handleLogin(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Button variant="contained" onClick={handleClick}>
            Login with Spotify
        </Button>
    );
};

export default LoginButton;

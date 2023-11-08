import React, { useEffect } from "react";

import { Button } from "@mui/material";

import {
    spotifyApi,
    AUTH_URL,
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES,
} from "../constants/Spotify.jsx";

const LoginModal = (props) => {
    const handleClick = () => {
        let LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token`;
        window.location.href = LOGIN_URL;
    };

    useEffect(() => {
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

                    props.handleLogin(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Login with Spotify
            </Button>
        </div>
    );
};

export default LoginModal;

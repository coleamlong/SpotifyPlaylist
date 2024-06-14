import React, { useState } from "react";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (info) => {
        setUser(info);
    };

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            {user ? (
                <Main user={user} setUser={setUser} />
            ) : (
                <Login handleLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
    const url = "http://localhost:5000/logout";
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post(url, {}, { withCredentials: true });
                localStorage.removeItem("jwtToken");
                navigate("/");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}

export default Logout;
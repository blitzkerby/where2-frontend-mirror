import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "./Loading";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to Logout?')) {
            setLoading(true);
            localStorage.removeItem('authData');
            
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 1000);
        }
    };

    return (
        <>
            {loading && <LoadingOverlay message="We are logging you out..."/>}
            {!loading && handleLogout()}
        </>
    );
};

export default Logout;
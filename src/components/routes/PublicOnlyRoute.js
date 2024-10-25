import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

// THIS IS THE ROUTE THAT IS ACCESSIVLE TO NOT LOGGED IN USER
const PublicOnlyROute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // IT CHECKS WHETHER A USER IS LOGGED IN FROM CUSTOM HOOK, IF HE IS LOGGED IN, THEN NAVIGATE THE USER TO HOMEPAGE (USED MOSTLY FOR PROTECTING AUTHENTICATION COMPONENTS)
    useEffect(() => {
        if (isLoggedIn) {
            console.log('User is already logged in');
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return !isLoggedIn? children : null;
}

export default PublicOnlyROute;
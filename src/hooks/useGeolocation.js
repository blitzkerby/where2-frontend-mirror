import { useState } from "react";
import axios from "axios";


// CUSTOM HOOK USED TO OBTAIN GEOLOCATION BASED ON USER GPS
const useGeolocation = () => {
    const [location, setLocation] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [error, setError] = useState("");

    const getLocation = () => {
        setIsGettingLocation(true);
        setError("");

        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                const errorMsg = "Geolocation is not supported by your browser";
                setError(errorMsg);
                setIsGettingLocation(false);
                reject(errorMsg);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );

                        if (response.data && response.data.display_name) {
                            setLocation(response.data.display_name);
                            resolve(response.data.display_name);
                        } else {
                            const errorMsg = "Failed to get location";
                            setError(errorMsg);
                            reject(errorMsg);
                        }
                    } catch (error) {
                        const errorMsg = "Failed to get location";
                        setError(errorMsg);
                        reject(errorMsg);
                    } finally {
                        setIsGettingLocation(false);
                    }
                },
                () => {
                    const errorMsg = "Failed to get location";
                    setError(errorMsg);
                    setIsGettingLocation(false);
                    reject(errorMsg); 
                }
            );
        });
    };

    return { location, getLocation, isGettingLocation, error };
};

export default useGeolocation;

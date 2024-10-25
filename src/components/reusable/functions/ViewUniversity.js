import config from "../../../config";

// function for fetching university information
const fetchUniversity = async (universityId) => {
    try {
        const response = await fetch(`${config.universities.getUniversityById(universityId)}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching university');
        }

        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching university:', error);
        throw error;
    }
}
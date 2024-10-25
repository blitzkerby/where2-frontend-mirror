import config from "../../../config";

const fetchJob = async(paramsJobId) => {
    try{
        const response = await fetch(`${config.job.getJobById(paramsJobId)}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching job');
        }

        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching job:', error);
        throw error;
    }
}
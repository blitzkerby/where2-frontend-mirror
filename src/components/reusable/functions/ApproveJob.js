import config from "../../../config";

// function for approving job offers
const approveJobOffer = async (jobId, token) => {
    try {
        const response = await fetch(`${config.job.approveJob(jobId)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error approving job offer');
        }

        return await response.json();
    } catch (error) {
        console.error('Error approving job offer:', error);
        throw error;
    }
}
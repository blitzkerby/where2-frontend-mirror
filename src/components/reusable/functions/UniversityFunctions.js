import { useNavigate } from "react-router-dom";
import { X, Eye, Check } from "lucide-react";
import config from "../../../config";
import axios from "axios";

export const useUniversityFunctions = () => {
    const navigate = useNavigate();

    const handleApprovePost = async (id) => {
        console.log("approve action triggered for university with ID:", id);
        try {
            const response = await axios.patch(config.universities.approveUniversity(id));
            console.log(response);
        } catch (error) {
            console.error("Failed to approve university with ID:", id, error);
        }
    };

    const handleView = (id) => {
        console.log("View action triggered for university with ID:", id);
        navigate(`/detail/university/${id}`);
    };

    const handleDisapprovePost = async (id) => {
        console.log("Disapprove action triggered for university with ID:", id);
        try {
            const response = await axios.patch(config.universities.disapproveUniversity(id));
            console.log(response);
        } catch (error) {
            console.error("Failed to disapprove university with ID:", id, error);
        }
    }

    const getUniversityFunctions = (showApproved) => {
        const baseActions = [
            {
                variant: "ghost",
                icon: null,
                label: "View",
                onClick: (id) => handleView(id),
            }
        ];

        if (!showApproved) {
            baseActions.push({
                variant: "success",
                icon: <Check />,
                onClick: (id) => handleApprovePost(id),
                requiresConfirmation: true,
            });
        }
        if (showApproved) {
            baseActions.push({
                variant: "danger",
                icon: <X />,
                onClick: (id) => handleDisapprovePost(id),
                requiresConfirmation: true,
            });
        }

        return baseActions;
    };

    return { getUniversityFunctions };
};
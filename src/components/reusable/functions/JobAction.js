import { useNavigate } from "react-router-dom";
import { X, Eye, Check } from "lucide-react";
import config from "../../../config";
import axios from "axios";

export const useJobFunctions = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    console.log("View action triggered for Job with ID:", id);
    navigate(`/detail/job/${id}`);
  };

  const handleApprovePost = async (id) => {
    console.log("Job with ID:", id, "approve function called");
    try {
      const response = await axios.patch(config.job.approveJob(id));
      console.log(response);
    } catch (error) {
      console.error("Failed to approve job with ID:", id, error);
    }
  };

  const handledisapprovePost = async (id) => {
    console.log("Job with ID:", id, "disapprove function called");
    try {
      const response = await axios.patch(config.job.disapproveJob(id));
      console.log(response);
    } catch (error) {
      console.error("Failed to disapprove job with ID:", id, error);
    }
  }

  // Return a function that generates the appropriate actions based on showApproved state
  const getJobFunctions = (showApproved) => {
    const baseActions = [
      {
        variant: "ghost",
        icon: <Eye />,
        label: "",
        onClick: (id) => handleView(id),
      }
    ];

    // Only add the approve button if we're not showing approved posts
    if (!showApproved) {
      baseActions.push({
        variant: "success",
        icon: <Check />,
        label: "",
        onClick: (id) => handleApprovePost(id),
        requiresConfirmation: true,
      });
    }
    if (showApproved){
      baseActions.push({
        variant: "danger",
        icon: <X />,
        label: "",
        onClick: (id) => handledisapprovePost(id),
        requiresConfirmation: true,
      });
    }

    return baseActions;
  };

  return { getJobFunctions };
};
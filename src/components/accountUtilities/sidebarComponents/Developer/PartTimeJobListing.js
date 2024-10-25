import config from "../../../../config";
import ListingComponent from "../../../reusable/ListingComponent";
import React, { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../reusable/Loading";
import { useJobFunctions } from "../../../reusable/functions/JobAction";
import ButtonComponent from "../../../reusable/Button";

const PartTimeJobListing = () => {
  const { getJobFunctions } = useJobFunctions();
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showApproved, setShowApproved] = useState(false);

  const getAllPartTimeJobs = async () => {
    try {
      const response = await fetch(config.job.getAllJob);
      if (!response.ok) {
        throw new Error("Failed to fetch part-time jobs");
      }
      const data = await response.json();
      setPartTimeJobs(data.data.jobs);
      setFilteredJobs(data.data.jobs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPartTimeJobs();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }


  const toggleApproval = () => {
    setShowApproved(!showApproved);
    if (showApproved) {
      const unapprovedJobs = partTimeJobs.filter(job => !job.isApproved);
      setFilteredJobs(unapprovedJobs);
    } else {
      const approvedJobs = partTimeJobs.filter(job => job.isApproved);
      setFilteredJobs(approvedJobs);
    }
  };

  // Update filtered jobs when a job's approval status changes
  const handleJobStatusChange = (jobId, newApprovalStatus) => {
    const updatedJobs = partTimeJobs.map(job => 
      job.id === jobId ? { ...job, isApproved: newApprovalStatus } : job
    );
    setPartTimeJobs(updatedJobs);
    
    // Update filtered jobs based on current filter
    if (showApproved) {
      setFilteredJobs(updatedJobs.filter(job => job.isApproved));
    } else {
      setFilteredJobs(updatedJobs.filter(job => !job.isApproved));
    }
  };

  return (
    <main>
      <ButtonComponent onClick={toggleApproval}>
        {showApproved ? "Show Unapproved Posts" : "Show Approved Posts"}
      </ButtonComponent>

      <ListingComponent
        data={filteredJobs}
        title={showApproved ? "Approved Part-time Jobs" : "Unapproved Part-time Jobs"}
        columns={["id", "company_id", "company_name"]}
        isLoading={loading}
        actions={getJobFunctions(showApproved)} // Pass showApproved state to get appropriate actions
        totalItems={filteredJobs.length}
        onStatusChange={handleJobStatusChange}
      />
    </main>
  );
};

export default PartTimeJobListing;
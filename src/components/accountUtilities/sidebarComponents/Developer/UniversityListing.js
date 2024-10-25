import config from "../../../../config";
import ListingComponent from "../../../reusable/ListingComponent";
import React, { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../reusable/Loading";
import { useUniversityFunctions } from "../../../reusable/functions/UniversityFunctions";
import ButtonComponent from "../../../reusable/Button";

const UniversityListing = () => {
  const { getUniversityFunctions } = useUniversityFunctions();
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApproved, setShowApproved] = useState(false);

  const getAllUniversities = async () => {
    try {
      const response = await fetch(config.universities.getUniversityList);
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      const data = await response.json();
      const universityData = data.universities || [];
      setUniversities(universityData);
      setFilteredUniversities(universityData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUniversities();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!universities || universities.length === 0) {
    return <div>No universities found.</div>;
  }


  const toggleApproval = () => {
    setShowApproved(!showApproved);
    if (showApproved) {
      const unapprovedUniversities = universities.filter(uni => !uni.isApproved);
      setFilteredUniversities(unapprovedUniversities);
    } else {
      const approvedUniversities = universities.filter(uni => uni.isApproved);
      setFilteredUniversities(approvedUniversities);
    }
  };

  // Update filtered universities when approval status changes
  const handleUniversityStatusChange = (uniId, newApprovalStatus) => {
    const updatedUniversities = universities.map(uni => 
      uni.id === uniId ? { ...uni, isApproved: newApprovalStatus } : uni
    );
    setUniversities(updatedUniversities);
    
    // Update filtered universities based on current filter
    if (showApproved) {
      setFilteredUniversities(updatedUniversities.filter(uni => uni.isApproved));
    } else {
      setFilteredUniversities(updatedUniversities.filter(uni => !uni.isApproved));
    }
  };

  return (
    <main>
      <ButtonComponent onClick={toggleApproval}>
        {showApproved ? "Show Unapproved Posts" : "Show Approved Posts"}
      </ButtonComponent>

      <ListingComponent
        title={showApproved ? "Approved Universities" : "Unapproved Universities"}
        data={filteredUniversities}
        columns={["id", "email", "name", "role"]}
        totalItems={filteredUniversities.length}
        actions={getUniversityFunctions(showApproved)}
        onStatusChange={handleUniversityStatusChange}
      />
    </main>
  );
};

export default UniversityListing;
import React, { useEffect, useState } from 'react';
import ListingComponent from "../../../reusable/ListingComponent";
import { useUserFunctions } from '../../../reusable/functions/UserFunction';
import config from "../../../../config";
import { LoadingOverlay } from "../../../reusable/Loading";

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userActions } = useUserFunctions(); // Correctly destructure userActions

  const getAllUsers = async () => {
    try {
      const response = await fetch(config.analytics.getAllUsers);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const usersData = data.data || [];
      setUsers(usersData);
      console.log(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (<LoadingOverlay message="Fetching users data..."/>);
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <ListingComponent
      title="USER LISTING"
      data={users}
      columns={["id", "email", "role"]}
      totalItems={users.length}
      additionalStats={[
        { label: "Total Admins", value: users.filter(user => user.role === "admin").length },
        { label: "Total inActive", value: users.filter(user => user.isActive === false).length }
      ]}
      actions={userActions} 
    />
  );
};

export default UserListing;
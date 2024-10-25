import React, { useState } from "react";
import useAuth from "./../../../../hooks/useAuth";
import PostsBarChart from "./../../../reusable/dashboardComponents/BarChart";
import CustomedPieChart from "./../../../reusable/dashboardComponents/CustomedPieChart";
import UsersStatusComponent from "./../../../reusable/dashboardComponents/UsersStatus";
import TopPostsChart from "./../../../reusable/dashboardComponents/TopPostsChart";
import config from "./../../../../config";

const PostViewsDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [viewsToday, setViewsToday] = useState([]);
  const { username, entity } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-right tracking-tight text-gray-800">
        Welcome to Dashboard, {username ? username : entity}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            User Counts by City
          </h2>
          <TopPostsChart fetchUrl={config.dashboard.getUserCounts} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            User Status
          </h2>
          <UsersStatusComponent
            activeUsers={activeUsers}
            viewsToday={viewsToday}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Device Distribution
          </h2>
          <CustomedPieChart fetchUrl={config.dashboard.getDeviceDistribution} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Verification Status
          </h2>
          <PostsBarChart fetchUrl={config.dashboard.getVerificationData} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          Verified vs. Unverified Users
        </h2>
        <PostsBarChart
          fetchUrl={config.dashboard.getVerificationData}
          title="Verified vs. Unverified Users"
          isDataArray={false}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Number of Posts
          </h2>
          <PostsBarChart
            fetchUrl={config.dashboard.getDiscussionsPerDay}
            title="Post(s) created per day"
            isDataArray={false}
            barColor="#4f46e5"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Number of Comments
          </h2>
          <PostsBarChart
            fetchUrl={config.dashboard.getCommentsPerDay}
            title="Comment(s) created per day"
            barColor="#10b981"
            isDataArray={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PostViewsDashboard;

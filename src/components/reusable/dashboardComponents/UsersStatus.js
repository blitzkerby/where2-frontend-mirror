import React from 'react'
import { ResponsiveContainer } from 'recharts';

const UsersStatusComponent = ({ activeUsers, viewsToday }) => {
  return (
    <ResponsiveContainer>
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Real-time Updates</h2>
      <p className="text-lg">
        Currently active users: <span className="font-bold">{activeUsers}</span>
      </p>
      <p className="text-lg">
        Total views today: <span className="font-bold">{viewsToday}</span>
      </p>
    </div>
    </ResponsiveContainer>
  );
};

export default UsersStatusComponent;

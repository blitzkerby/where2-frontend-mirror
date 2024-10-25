import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

const TopPostsChart = ({ fetchUrl }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const transformData = (data) => {
      return Object.entries(data).map(([city, count]) => ({
        name: city,
        views: count,
      }));
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(fetchUrl);
          const transformedData = transformData(response.data.data);
          setData(transformedData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [fetchUrl]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;
  
    return (
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#E2F1E7" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default TopPostsChart;

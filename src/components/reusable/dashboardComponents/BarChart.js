import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PostsBarChart = ({
  fetchUrl,
  dataKey = "count",
  dateKey = "date",
  barColor = "#82ca9d",
  title = "Posts",
  height = 300,
  isDataArray = true,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(fetchUrl);

        const fetchedData = isDataArray ? response.data.data : response.data;

        setData(fetchedData);
        setError(null);
      } catch (error) {
        console.error(`Error fetching ${title} data:`, error);
        setError(`Failed to load ${title} data`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl, title, isDataArray]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dateKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={barColor} name={title} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostsBarChart;

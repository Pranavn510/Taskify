import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

//The ResponsiveContainer component is typically used in conjunction with chart libraries like recharts to make charts responsive and adaptable to different screen sizes.
//It automatically adjusts the dimensions of its child component (usually a chart) based on the size of the parent container.

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

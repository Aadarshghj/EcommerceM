import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTabs = () => {
  const [datas, setData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    axios
      .get("/analytics/")
      .then((res) => {
        setData(res.data.analyticsData);

        if (res.data.dailySalesData) {
          setDailySalesData(res.data.dailySalesData);
        }

        console.log("Analytics response:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-w-screen p-4">
      {/* Title */}
      <div className="font-bold mt-5 flex items-center justify-start">
        <h1 className="text-xl md:text-2xl">Analytics</h1>
      </div>

      {/* Stats Grid */}
      <div className="w-full py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-amber-300 rounded-md flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-medium">Users</h2>
          <h1 className="text-2xl font-bold">{datas.users}</h1>
        </div>

        <div className="bg-amber-300 rounded-md flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-medium">Products</h2>
          <h1 className="text-2xl font-bold">{datas.products}</h1>
        </div>

        <div className="bg-amber-300 rounded-md flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-medium">Sales</h2>
          <h1 className="text-2xl font-bold">{datas.totalSales}</h1>
        </div>

        <div className="bg-amber-300 rounded-md flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-medium">Revenue</h2>
          <h1 className="text-2xl font-bold">{datas.totalRevenue}</h1>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-10 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsTabs;

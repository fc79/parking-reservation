import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomerCountsDailyChart = (props) => {
  const { todayCustomers } = props;

  const data = [
    {
      name: "مشتریان امروز",
      uv: todayCustomers,
      // "amt": dailyIncome
    },
  ];

  return (
    <div>
      {todayCustomers === 0 ? (
        <div
          style={{
            display: "inline-block",
            marginRight: "30%",
            backgroundColor: "#e7e6f4",
            color: "red",
            borderRadius: "5%",
            marginTop: "3%",
            padding: "5px",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          امروز هیچ مشتری برای این پارکینگ نداشته اید!{" "}
        </div>
      ) : (
        <div>
          <BarChart width={300} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              // tick={{ fill: "blue" }}
              // tickCount={11}
              tickMargin={45}
              width={100}
              fontSize={13}
            />
            <Tooltip />
            {/* <Legend /> */}
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="uv" fill="#4361ee" width={20}radius={[5, 5, 0, 0]}/>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default CustomerCountsDailyChart;

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

const OveralIncomeChartDaily = (props) => {
  const { dailyIncome } = props;

  const data = [
    {
      name: "درامد امروز",
      uv: dailyIncome,
      // "amt": dailyIncome
    },
  ];

  return (
    <div>
      {dailyIncome === "0" ? (
        <div
          style={{
            display: "inline-block",
            marginRight: "20%",
            backgroundColor: "#e7e6f4",
            color: "red",
            borderRadius: "5%",
            marginTop: "3%",
            padding: "5px",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
             امروز هیچ درامدی نداشته اید!{" "}
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
            <Bar dataKey="uv" fill="#F72585" width={20} radius={[5, 5, 0, 0]}/>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default OveralIncomeChartDaily;

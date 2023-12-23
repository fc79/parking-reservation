import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { BaseUrl } from "../Url";
import { PieChart, Pie, Cell } from "recharts";
const CancelReasonChartWeekly = ({ parkingId }) => {
  const [count, setCount] = useState();
  // const [year2, setYear2] = useState();
  // const [year3, setYear3] = useState();
  // const [year4, setYear4] = useState();
  // const [year5, setYear5] = useState();
  // const [year6, setYear6] = useState();
  // const [year7, setYear7] = useState();
  const [wrongTimeCount, setWrongTimeCount] = useState(0);
  const [parkingIsClosedCount, setParkingIsClosedCount] = useState(0);
  const [changePlanCount, setChangePlanCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
  const COLORS = ["#F72585", "#3a0ca3", "#4361ee", "#4cc9f0"];

  useEffect(() => {
    axios
      .get(`${BaseUrl}/carowner/cancel/?`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
        params: {
          interval: "week",
          parkingId: parkingId,
        },
      })
      .then((res) => {
        console.log("redMonth", res);
        // setWrongTimeCount(res.data[1]);
        // setChangePlanCount(res.data[2]);
        // setParkingIsClosedCount(res.data[3]);
        // setOthersCount(res.data[4]);
        if (res.data[1] === undefined) {
          setWrongTimeCount(0);
          setChangePlanCount(0);
          setParkingIsClosedCount(0);
          setOthersCount(0);
        } else {
          setWrongTimeCount(parseInt(res.data[1].toString().substring(0, 4)));
          setChangePlanCount(parseInt(res.data[2].toString().substring(0, 4)));
          setParkingIsClosedCount(
            parseInt(res.data[3].toString().substring(0, 4))
          );
          setOthersCount(parseInt(res.data[4].toString().substring(0, 4)));
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [wrongTimeCount, changePlanCount, parkingIsClosedCount, othersCount]);

  const data = [
    { name: "انتخاب زمان اشتباه", value: wrongTimeCount },
    { name: "تغییر در برنامه", value: changePlanCount },
    { name: "بسته‌بودن پارکینگ", value: parkingIsClosedCount },
    { name: "سایر دلایل", value: othersCount },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div className="App">
        {wrongTimeCount === 0 &&
        changePlanCount === 0 &&
        parkingIsClosedCount === 0 &&
        othersCount === 0 ? (
          <div
            style={{
              display: "inline-block",
              marginRight: "25%",
              backgroundColor: "#e7e6f4",
              color: "red",
              borderRadius: "5%",
              marginTop: "3%",
              padding: "5px",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            آماری برای نمایش دلیل لغو وجود ندارد!{" "}
          </div>
        ) : (
          <div>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div
              style={{
                display: "inline-block",
                marginRight: "25%",
                backgroundColor: "#e7e6f4",
                color: "#706bec",
                borderRadius: "5%",
                marginTop: "3%",
                padding: "5px",
                fontSize: 14,
              }}
            >
              دلایل لغو رزرو در هفت گذشته{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelReasonChartWeekly;

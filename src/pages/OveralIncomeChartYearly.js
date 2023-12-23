import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const OveralIncomeChartYearly = (props) => {
  const { yearMonths } = props;
  var yearArr = new Array();
  var data = new Array();

  if (yearMonths != "0" && yearMonths != undefined) {
    for (var i = 0; i < Object.entries(yearMonths).length; i++) {
      yearArr[i] = {
        date: Object.keys(yearMonths)[i],
        count: Object.values(yearMonths)[i],
      };
    }
  }
  if (yearMonths != "0" && yearMonths != undefined) {
    data = [
      {
        name: "مرداد ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-08").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-08")[0]
                .count,
        // pv: 2000,
        amt: 2000,
      },
      {
        name: "شهریور ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-09").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-09")[0]
                .count,
        // pv: 2100,
        amt: 2100,
      },
      {
        name: "مهر ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-10").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-10")[0]
                .count,
        // pv: 2100,
        amt: 2100,
      },
      {
        name: "آبان ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-11").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-11")[0]
                .count,
        // pv: 2000,
        amt: 2400,
      },
      {
        name: "آذر ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-12").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-12")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "دی ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-01").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-01")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "بهمن ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-02").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-02")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "اسفند ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-03").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-03")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "فروردین ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-04").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-04")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "اردیبهشت ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-05").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-05")[0]
                .count,
        // pv: 2300,
        amt: 2400,
      },
      {
        name: "خرداد ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-06").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-06")[0]
                .count,
        // pv: 2400,
        amt: 2400,
      },
      {
        name: "تیر ",
        درامد:
          yearArr.filter((yearItem) => yearItem.date === "2022-07").length === 0
            ? 0
            : yearArr.filter((yearItem) => yearItem.date === "2022-07")[0]
                .count,
        // pv: 2100,
        amt: 2100,
      },
    ];
  }

  return (
    <div style={{ width: "100%" }}>
      {yearMonths === "0" || yearMonths === undefined ? (
        <div
          style={{
            display: "inline-block",
            marginRight: "5%",
            backgroundColor: "#e7e6f4",
            color: "red",
            borderRadius: "5%",
            marginTop: "3%",
            padding: "5px",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          در سال گذشته هیچ درامدی نداشته اید!{" "}
        </div>
      ) : (
        <div>
          <BarChart width={500} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={13}/>
            <YAxis
              // tick={{ fill: "blue" }}
              // tickCount={11}
              tickMargin={55}
              width={100}
              fontSize={13}
            />
            <Tooltip />
            <Bar dataKey="درامد" fill="#F72585" radius={[5, 5, 0, 0]}/>
          </BarChart>
          <div
            className=""
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
            میزان درامد امسال
          </div>
        </div>
      )}
    </div>
  );
};

export default OveralIncomeChartYearly;

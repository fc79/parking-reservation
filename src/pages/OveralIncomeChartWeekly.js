import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Url";
import { LineChart, Line, CartesianGrid } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const OveralIncomeChartWeekly = (props) => {
  const { weekDays } = props;
  var resultDates = new Array();
  var weekArr = new Array();
  var data = new Array();
  var currentdate = new Date();

  let n = 7;
  while (n > 0) {
    var currentdate = new Date();
    currentdate.setDate(currentdate.getDate() + 1 - n);
    resultDates.push(currentdate);
    n--;
  }

  function gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = gm > 2 ? gy + 1 : gy;
    days =
      355666 +
      365 * gy +
      ~~((gy2 + 3) / 4) -
      ~~((gy2 + 99) / 100) +
      ~~((gy2 + 399) / 400) +
      gd +
      g_d_m[gm - 1];
    jy = -1595 + 33 * ~~(days / 12053);
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
  }

  function DateConvertor(initialDate) {
    const tmp = initialDate;
    const gYear = tmp.slice(0, 4);
    const gMonth = tmp.slice(5, 7);
    const gDay = tmp.slice(8, 10);
    const jalaliDate = gregorian_to_jalali(
      parseInt(gYear),
      parseInt(gMonth),
      parseInt(gDay)
    );
    const FinalDate = jalaliDate[0] + "/" + jalaliDate[1] + "/" + jalaliDate[2];
    return FinalDate;
  }

  if (weekDays != "0" && weekDays != undefined) {
    for (var i = 0; i < Object.entries(weekDays).length; i++) {
      weekArr[i] = {
        date: Object.keys(weekDays)[i],
        count: Object.values(weekDays)[i],
      };
    }
  }
  if (weekDays != "0" && weekDays != undefined) {
    for (var i = 0; i < 7; i++) {
      data[i] = {
        name: DateConvertor(resultDates[i].toISOString().split("T")[0]),
        درامد:
          weekArr.filter(
            (weekItem) =>
              weekItem.date === resultDates[i].toISOString().split("T")[0]
          ).length === 0
            ? 0
            : weekArr.filter(
                (weekItem) =>
                  weekItem.date === resultDates[i].toISOString().split("T")[0]
              )[0].count,
        // pv: 2000,
        amt: 2000,
      };
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {weekDays === "0" || weekDays === undefined ? (
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
          در هفت روز گذشته هیچ درامدی نداشته اید!{" "}
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
            میزان درامد در هفت روز گذشته
          </div>
        </div>
      )}
    </div>
  );
};

export default OveralIncomeChartWeekly;

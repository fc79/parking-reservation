import React from "react";
import Table from "react-bootstrap/Table";
import "../css/table.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Global.css";
import { BaseUrl } from "../Url";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import "../css/layout.css";
import OveralIncomeChartDaily from "./OveralIncomeChartDaily";
import OveralIncomeChartMonthly from "./OveralIncomeChartMonthly";
import OveralIncomeChartYearly from "./OveralIncomeChartYearly";
import OveralIncomeChartWeekly from "./OveralIncomeChartWeekly";
import CancelReasonChartYearly from "./CancelReasonChartYearly";
import CancelReasonChartMonthly from "./CancelReasonChartMonthly";
import CancelReasonChartDaily from "./CancelReasonChartDaily";
import CancelReasonChartWeekly from "./CancelReasonChartWeekly";
import CustomerCountsDailyChart from "./CustomerCountsDailyChart";
import CustomerCountsWeeklyChart from "./CustomerCountsWeeklyChart";
import CustomerCountsYearlyChart from "./CustomerCountsYearlyChart";
import CustomerCountsMonthlyChart from "./CustomerCountsMonthlyChart";
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const Charts = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [wrongTimeCount, setWrongTimeCount] = useState(0);
  const [parkingIsClosedCount, setParkingIsClosedCount] = useState(0);
  const [changePlanCount, setChangePlanCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const [week, setWeek] = useState();
  const [weeklyIncome, setWeeklyIncome] = useState();
  const [month, setMonth] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [dailyIncome, setDailyIncome] = useState();
  const [year, setYear] = useState();
  const [yearlyIncome, setYearlyIncome] = useState();
  const [todayCustomers, setTodayCustomers] = useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
  let ParkingId;
  const id = localStorage.getItem("pID");
  console.log("idparking", id);
  useEffect(() => {
    ///daily income
    axios
      .get(`${BaseUrl}/parkingowner/income/?parkingId=${id}&interval=day`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        setDailyIncome(Object.values(res.data)[0]);
      })

      .catch(function (error) {
        console.log(error);
      });
    //// weekly income
    axios
      .get(`${BaseUrl}/parkingowner/income/?parkingId=${id}&interval=week`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        setWeeklyIncome(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    //// monthly income
    axios
      .get(`${BaseUrl}/parkingowner/income/?parkingId=${id}&interval=month`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        setMonthlyIncome(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    /// yearly income
    axios
      .get(`${BaseUrl}/parkingowner/income/?parkingId=${id}&interval=year`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        setYearlyIncome(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    /// daily customers
    axios
      .get(
        `${BaseUrl}/parkingowner/allcustomers/?interval=day&parkingId=${id}`,
        {
          headers: { "Content-Type": "application/json", Authorization: auth },
        }
      )
      .then((res) => {
        console.log("dayycussssssss", res.data);
        if (res.data === "No Customer found in this interval") {
          setTodayCustomers(0);
        } else {
          setTodayCustomers(Object.values(res.data)[0]);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    //// weekly customers
    axios
      .get(
        `${BaseUrl}/parkingowner/allcustomers/?interval=week&parkingId=${id}`,
        {
          headers: { "Content-Type": "application/json", Authorization: auth },
        }
      )
      .then((res) => {
        setWeek(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    ////monthly customers
    axios
      .get(
        `${BaseUrl}/parkingowner/allcustomers/?interval=month&parkingId=${id}`,
        {
          headers: { "Content-Type": "application/json", Authorization: auth },
        }
      )
      .then((res) => {
        setMonth(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    ////yearly customers
    axios
      .get(
        `${BaseUrl}/parkingowner/allcustomers/?interval=year&parkingId=${id}`,
        {
          headers: { "Content-Type": "application/json", Authorization: auth },
        }
      )
      .then((res) => {
        setYear(res.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div
      class="container pt-5 mt-5"
      style={{
        marginLeft: "-3%",
        backgroundColor: "rgb (241,241,241)",
        maxWidth: "117%",
      }}
    >
      <div class="row row-cols-1 row-cols-md-2 g-5">
        <div class="col-md-11 jobs_index_middle_panels">
          <div class="card h-90" style={{ marginRight: "14%" }}>
            <h4
              class="card-header"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              آمارها
            </h4>
            {/* <h5
              class="card-title pt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              لطفاً الگوی جدول خود را انتخاب کنید.
            </h5> */}
            <div class="card-body pt-5 pb-1">
              <div className="d-flex justify-content-around">
                <div
                  style={{
                    width: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Radio
                    style={{ marginRight: "10%" }}
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                    data-testid="checked"
                    role="radio"
                  />
                  روزانه
                  <Radio
                    style={{ marginRight: "10%" }}
                    checked={selectedValue === "b"}
                    onChange={handleChange}
                    value="b"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "B" }}
                  />
                  <div>هفتگی</div>
                  <Radio
                    style={{ marginRight: "10%" }}
                    checked={selectedValue === "c"}
                    onChange={handleChange}
                    value="c"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "C" }}
                  />
                  <div>ماهانه</div>
                  <Radio
                    style={{ marginRight: "10%" }}
                    checked={selectedValue === "d"}
                    onChange={handleChange}
                    value="d"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                  />
                  <div>سالانه</div>
                </div>
              </div>
              <hr />
              <div className=" d-flex justify-content-around mt-4 pt-4 jc-center margr-3">
                <div cass="row">
                  <div class="col flex-1 jc-center">
                    {selectedValue == "a" ? (
                      <div className="margr-5">
                        <CustomerCountsDailyChart
                          todayCustomers={todayCustomers}
                        />
                      </div>
                    ) : selectedValue == "c" ? (
                      <CustomerCountsMonthlyChart monthDays={month} />
                    ) : selectedValue == "d" ? (
                      <div className="margr-5">
                        <CustomerCountsYearlyChart yearMonths={year} />
                      </div>
                    ) : (
                      <div className="margr-6">
                        <CustomerCountsWeeklyChart weekDays={week} />
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div
                  class="col flex-1 jc-center"
                  style={{ marginRight: "-50px" }}
                >
                  {selectedValue == "a" ? (
                    <div className="">
                      <OveralIncomeChartDaily dailyIncome={dailyIncome} />
                    </div>
                  ) : selectedValue == "c" ? (
                    <div className="">
                      <OveralIncomeChartMonthly monthDays={monthlyIncome} />
                    </div>
                  ) : selectedValue == "d" ? (
                    <div className="">
                      <OveralIncomeChartYearly yearMonths={yearlyIncome} />
                    </div>
                  ) : (
                    <div className="">
                      <OveralIncomeChartWeekly weekDays={weeklyIncome} />
                    </div>
                  )}
                </div>
              </div>
              <div
                class="col margt-4 flex-1 jc-center"
                style={{ marginLeft: "200px" }}
              >
                {selectedValue == "a" ? (
                  <div className="margr-5">
                    <CancelReasonChartDaily parkingId={id} />
                  </div>
                ) : selectedValue == "c" ? (
                  <div className="margr-5">
                    <CancelReasonChartMonthly parkingId={id} />
                  </div>
                ) : selectedValue == "d" ? (
                  <div className="margr-5">
                    <CancelReasonChartYearly parkingId={id} />
                  </div>
                ) : (
                  <div className="margr-7">
                    <CancelReasonChartWeekly parkingId={id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col-md-12 jobs_index_middle_panels">
          <div
            class="card h-100"
            style={{
              marginTop: "2%",
            }}
          >
            <h5 class="card-header" style={{ marginBottom: "20px" }}>
              {" "}
            </h5>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Charts;

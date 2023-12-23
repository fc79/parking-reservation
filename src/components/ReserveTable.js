import React from "react";
import Table from "react-bootstrap/Table";
import "../css/table.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../css/Global.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BaseUrl } from "../Url";

const ReserveTable = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);

  let ParkingId;

  const [data, setData] = useState([]);
  const [dataPass, setDataPass] = useState([]);
  const [reserveNum, setReserveNum] = useState([]);
  const [reserveNumPass, setReserveNumPass] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("pID");
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    console.log(id);

    axios
      .get(`${BaseUrl}/parkingowner/parkingdetail/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log("response: ", response.data);
        setCurrentParking({
          parkingName: response.data.parkingName,
          address: response.data.location,
          id: response.data.id,
          capacity: response.data.capacity,
          image: response.data.parkingPicture,
          isPrivate: response.data.isPrivate,
          pricePerHour: response.data.pricePerHour,
          number: response.data.parkingPhoneNumber,
        });
        ParkingId = response.data.id;
      });

    axios
      .get(`${BaseUrl}/parkingowner/reservelist/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          parkingId: id,
        },
      })
      .then((response) => {
        console.log("response reserveList current: ", response.data);
        response.data.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime); // ascending
        });
        setData(response.data);
        setReserveNum(response.data.length);
      });
    //give passed reserves
    axios
      .get(`${BaseUrl}/parkingowner/passedreservelist/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          parkingId: id,
        },
      })
      .then((response) => {
        console.log("response reserveList Passed: ", response.data);
        response.data.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime); // ascending
        });
        setDataPass(response.data);
        setReserveNumPass(response.data.length);
      });
  }, []);

  const renderTableCurrent = () => {
    return data.map((user, index) => {
      const FinalStart = DateConvertor(user.startTime);
      const FinalEnd = DateConvertor(user.endTime);
      const finalPelak = PelakModify(user.car_pelak);

      return (
        <tr>
          <td>{index}</td>
          <td>{user.trackingCode}</td>

          <td>{user.owner_email}</td>
          <td>
            {user.car_name} {user.car_color}
          </td>
          {/* <td>{user.carColor}</td> */}
          <td>{finalPelak}</td>
          <td>{FinalStart}</td>
          <td>{FinalEnd}</td>
          <td>{user.cost}</td>
        </tr>
      );
    });
  };

  const renderTablePassed = () => {
    return dataPass.map((user, index) => {
      const FinalStart = DateConvertor(user.startTime);
      const FinalEnd = DateConvertor(user.endTime);
      const finalPelak = PelakModify(user.car_pelak);

      return (
        <tr>
          <td>{index}</td>
          <td>{user.trackingCode}</td>

          <td>{user.owner_email}</td>
          <td>
            {user.car_name} {user.car_color}
          </td>
          {/* <td>{user.carColor}</td> */}
          <td>{finalPelak}</td>
          <td>{FinalStart}</td>
          <td>{FinalEnd}</td>
          <td>{user.cost}</td>
        </tr>
      );
    });
  };

  //=========================================================== Date Conversion and Pelak Modification
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
    const gTime = tmp.slice(11, 16);
    const jalaliDate = gregorian_to_jalali(
      parseInt(gYear),
      parseInt(gMonth),
      parseInt(gDay)
    );
    const FinalDate =
      gTime + "  " + jalaliDate[0] + "/" + jalaliDate[1] + "/" + jalaliDate[2];
    return FinalDate;
  }

  function PelakModify(myPelak) {
    const licensePlateID_2 = myPelak.slice(6, 8);
    const lpChar = myPelak.slice(2, 3);
    const lpLeft_2 = myPelak.slice(0, 2);
    const lpRight_3 = myPelak.slice(3, 6);
    const finalPelak =
      licensePlateID_2 +
      " - " +
      " " +
      lpRight_3 +
      " " +
      lpChar +
      " " +
      lpLeft_2;
    return finalPelak;
  }
  //===========================================================
  return (
    <div className="table-mmd soheilPadd">
      <br />
      <br />
      <br />
      <br />
      <br />

      <div>
        <Tabs
          defaultActiveKey="current"
          transition={true}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="current" title="رزرو های موجود">
            {/* <div>{currentReserve()}</div> */}

            {reserveNum === 0 ? (
              <div style={{ marginRight: "45%" }}>رزروی موجود نیست!</div>
            ) : (
              <Table responsive className="table-hover">
                <thead className="table-header-mmd">
                  <tr>
                    <th>#</th>
                    <th>کد رهگیری</th>

                    <th>نام رزرو کننده</th>
                    <th>خودرو</th>
                    {/* <th>رنگ خودرو</th> */}
                    <th>شماره پلاک خودرو</th>
                    <th>تاریخ و ساعت ورود</th>
                    <th>تاریخ و ساعت خروج</th>
                    <th>قیمت</th>
                  </tr>
                </thead>
                <tbody>{renderTableCurrent()}</tbody>
              </Table>
            )}
          </Tab>
          <Tab eventKey="passed" title="رزرو های گذشته">
            {/* <div>{passedReserve()}</div> */}
            {reserveNumPass === 0 ? (
              <div style={{ marginRight: "45%" }}>رزروی موجود نیست!</div>
            ) : (
              <Table responsive className="table-hover">
                <thead className="table-header-mmd">
                  <tr>
                    <th>#</th>
                    <th>کد رهگیری</th>

                    <th>نام رزرو کننده</th>
                    <th>خودرو</th>
                    {/* <th>رنگ خودرو</th> */}
                    <th>شماره پلاک خودرو</th>
                    <th>تاریخ و ساعت ورود</th>
                    <th>تاریخ و ساعت خروج</th>
                    <th>قیمت</th>
                  </tr>
                </thead>
                <tbody>{renderTablePassed()}</tbody>
              </Table>
            )}
          </Tab>
        </Tabs>
      </div>
      {/* <div>{currentReserve()}</div> */}
    </div>
  );
};

export default ReserveTable;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Url";
import { useHistory, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io";
import image from "./../images/sad.png";

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

const SupportPanelReservesPage = (props) => {
  const [reservesList, setReservesList] = useState([]);
  const location = useLocation();
  const parkingId = location.state.id;
  console.log("parkingId", parkingId);

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

  useEffect(() => {
    let token = localStorage.getItem("stoken");
    let auth = `Token ${token}`;
    axios
      .get(`${BaseUrl}/support/reservelist/?parkingId=${parkingId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        setReservesList(response.data);
      });
  }, []);

  const renderTableReserves = () => {
    return reservesList.map((user, index) => {
      const FinalStart = DateConvertor(user.startTime);
      const FinalEnd = DateConvertor(user.endTime);
      const finalPelak = PelakModify(user.car_pelak);
      return (
        <tr>
          <td>{index}</td>
          <td>{user.trackingCode}</td>
          <td>{user.parking_name}</td>
          <td>
            {user.car_name} {user.car_color}
          </td>
          <td>{finalPelak}</td>
          <td>{FinalStart}</td>
          <td>{FinalEnd}</td>
          <td>{user.cost}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="table-mmd">
        {reservesList.length === 0 ? (
          <div>
            <div
              className="flex flex-column  justify-content-center align-items-center"
              style={{ marginTop: "35vh" }}
            >
              <img
                src={image}
                style={{
                  backgroundColor: "#fd0d00",
                  borderRadius: "100%",
                  marginBottom: "15px",

                  height: "200px",
                  animation: "shake 2s ",
                  animationIterationCount: "-moz-initial",
                }}
              />
              <div
                className="top-50"
                style={{ fontSize: "25px", color: "red" }}
              >
                رزروی وجود ندارد.
              </div>
            </div>
          </div>
        ) : (
          <Table responsive className="table-hover">
            <thead className="soheil-table-head">
              <tr>
                <th>ردیف</th>
                <th>کد رهگیری</th>
                <th>نام پاركينگ</th>
                <th>خودرو</th>
                <th>شماره پلاک خودرو</th>
                <th>تاریخ و ساعت ورود</th>
                <th>تاریخ و ساعت خروج</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>{renderTableReserves()}</tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SupportPanelReservesPage;

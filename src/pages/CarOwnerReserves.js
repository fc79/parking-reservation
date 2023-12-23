import React from "react";
import Table from "react-bootstrap/Table";
import "../css/CarOwnerTable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Global.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { BaseUrl } from "../Url";
import { Button, IconButton } from "@mui/material";
import { Alert, Collapse } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import mySwal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as ReactBootstrap from "react-bootstrap";
import { DeleteButton } from "react-admin";
import { ImBin } from "react-icons/im";

const ReserveTableCarOwner = () => {
  const [data, setData] = useState([]);
  const [dataPass, setDataPass] = useState([]);
  const [reserveNum, setReserveNum] = useState([]);
  const [reserveNumPass, setReserveNumPass] = useState([]);
  const [cancelReserveError, setCancelReserveError] = useState(
    "امکان لغو رزرو در این بازه زمانی وجود ندارد."
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setID("");
    setShow(true);
  };
  const [selectedID, setID] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    //current reserves
    axios
      .get(`${BaseUrl}/carowner/reservelist/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log("فعلي ها: ", response);
        console.log(JSON.stringify(response.data));
        setData(response.data);
        setReserveNum(response.data.length);
      });
    //passed reserves
    axios
      .get(`${BaseUrl}/carowner/passedreservelist/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log("اتمام يافته ها: ", response);
        setDataPass(response.data);
        setReserveNumPass(response.data.length);
      });
  }, []);

  const deleteResereve = (reserveId) => {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    var data = JSON.stringify({
      id: reserveId,
    });
    axios
      .delete(`${BaseUrl}/carowner/delete_reserve/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
        data: data,
      })
      .then((response) => {
        console.log("deleteddd", response);
        mySwal({
          title: "پیغام",
          text: "رزرو شما با موفقیت لغو شد. هزینه به کیف پول شما برگشت داده می شود.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          setShow(false);
          axios
            .get(`${BaseUrl}/carowner/reservelist/`, {
              headers: {
                Authorization: auth,
              },
            })
            .then((response) => {
              console.log("فعلي ها: ", response);
              console.log(JSON.stringify(response.data));
              setData(response.data);
              setReserveNum(response.data.length);
            });

          const article = { id: reserveId, cancellationReason: selectedID };
          axios
            .put(`${BaseUrl}/carowner/update_reserve/`, article, {
              headers: {
                Authorization: auth,
              },
            })
            .then((response) => {
              console.log("response of reason: ", response.data);
            });
        });
      })
      .catch((error) => {
        console.log("error", error);
        setCancelReserveError(error.response.data.message);
        mySwal({
          title: "!خطا",
          text: cancelReserveError,
          buttons: "بستن",
          icon: "error",
        });
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

  const renderTableCurrent = () => {
    return data.map((user, index) => {
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
          <td>
            {" "}
            {/* <Button
              // onClick={() => deleteResereve(user.id)}
              onClick={handleShow}
              style={{
                backgroundColor: "#695ce3",
                borderRadius: "20px",
                padding: "8px 5px",
                width: "120px",
              }}
              size="small"
              variant="contained"
              data-testid="cancell-btn-test"
            >
              <text className="bold txt-md">لغو رزرو</text>
            </Button> */}
            <ImBin onClick={handleShow} size={20} style={{ color: "red" }} />
            <Modal show={show} onHide={handleClose} animation={true} centered>
              <Modal.Header style={{ justifyContent: "center" }}>
                <Modal.Title>
                  <h5 style={{ fontWeight: "bold" }}>لغو رزرو</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6 style={{ fontWeight: "bold" }}>
                  لطفا دلیل لغو رزرو خود را تعیین کنید
                </h6>
                <br />
                <Form>
                  <Form.Check
                    className="d-flex justify-content-start"
                    // style={{ marginLeft: "10%" }}
                    type="radio"
                    id={1}
                    label="تایم اشتباهی انتخاب کردم."
                    onChange={() => {
                      setID(1);
                    }}
                    checked={1 === selectedID}
                    data-testid="radio1BtnTest"
                  />
                  <Form.Check
                    className="d-flex justify-content-start"
                    type="radio"
                    id={2}
                    label="برنامه ام عوض شده."
                    onChange={() => {
                      setID(2);
                    }}
                    checked={2 === selectedID}
                  />
                  <Form.Check
                    className="d-flex justify-content-start"
                    type="radio"
                    id={3}
                    label="پارکینگ بسته است."
                    onChange={() => {
                      setID(3);
                    }}
                    checked={3 === selectedID}
                  />
                  <Form.Check
                    className="d-flex justify-content-start"
                    type="radio"
                    id={4}
                    label="سایر دلایل"
                    onChange={() => {
                      setID(4);
                    }}
                    checked={4 === selectedID}
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "center" }}>
                <Button
                  // onClick={() => deleteResereve(user.id)}
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#695ce3",
                    borderRadius: "20px",
                    padding: "8px 5px",
                    width: "120px",
                    marginLeft: "1%",
                    marginBottom: "1%",
                  }}
                  size="small"
                  variant="contained"
                  data-testid="cancell-modal-btn-test"
                >
                  <text className="bold txt-md">انصراف</text>
                </Button>
                <Button
                  // onClick={() => deleteResereve(user.id)}
                  onClick={() => deleteResereve(user.id)}
                  style={{
                    backgroundColor: "#695ce3",
                    borderRadius: "20px",
                    padding: "8px 5px",
                    width: "120px",
                  }}
                  size="small"
                  variant="contained"
                  disabled={selectedID === ""}
                  data-testid="cancell-reserve-btn-test"
                >
                  <text className="bold txt-md">لغو رزرو</text>
                </Button>
                {/* <ReactBootstrap.Button onClick={handleClose} variant="light">
                  انصراف
                </ReactBootstrap.Button>
                <ReactBootstrap.Button
                  onClick={() => deleteResereve(user.id)}
                  variant="secondary"
                >
                  لغو رزرو
                </ReactBootstrap.Button> */}
              </Modal.Footer>
            </Modal>
          </td>
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
    <div className="">
      <div className="table-mmd">
        <div>
          <Tabs
            defaultActiveKey="current"
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="current" title="رزرو های فعلی شما">
              {reserveNum === 0 ? (
                <div style={{ marginRight: "45%" }}>رزروی موجود نیست!</div>
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{renderTableCurrent()}</tbody>
                </Table>
              )}
            </Tab>
            <Tab eventKey="passed" title="رزرو های گذشته شما">
              {reserveNumPass === 0 ? (
                <div style={{ marginRight: "45%" }}>رزروی موجود نیست!</div>
              ) : (
                <Table
                  responsive
                  className="table-hover"
                  style={{ whitespace: "nowrap" }}
                >
                  <thead className="soheil-table-head">
                    <tr>
                      <th className="whites">ردیف</th>
                      <th>کد رهگیری</th>
                      <th>نام پاركينگ</th>
                      <th>خودرو</th>
                      <th>شماره پلاک خودرو</th>
                      <th>تاریخ و ساعت ورود</th>
                      <th>تاریخ و ساعت خروج</th>
                      <th>قیمت</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{renderTablePassed()}</tbody>
                </Table>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReserveTableCarOwner;

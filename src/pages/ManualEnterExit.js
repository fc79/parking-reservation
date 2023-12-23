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

const ManualEnterExit = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);

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
        setTotalCapacity(response.data.capacity);
        ParkingId = response.data.id;
      });

    axios
      .get(`${BaseUrl}/parkingowner/currentperiod/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          parkingId: localStorage.getItem("pID"),
        },
      })
      .then((response) => {
        // console.log("Current P is : ", response);
        // console.log("data is : ", response.data.filledCapacity);
        setFilledCapacity(response.data.filledCapacity);
        setTotalCapacity(response.data.totalCapacity);
      });
  }, []);

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 10,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            fontSize="30px"
          >
            {totalCapacity}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            fontSize="30px"
          >
            {"/" + filledCapacity}
          </Typography>
        </Box>
      </Box>
    );
  }
  let ParkingId;
  const handelExitButton = () => {
    ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    let fd = new FormData();
    console.log("adsdff", ParkingId);
    console.log("token", auth);
    fd.append("parkingId", ParkingId);
    fd.append("status", "exit");
    if (filledCapacity === 0) {
      swal({
        title: "خطا",
        text: "درخواست غیر مجاز : پارکینگ خالی است",
        button: "بستن",
        icon: "error",
      });
    } else {
      fetch(`${BaseUrl}/parkingowner/manualexitorenter/`, {
        method: "PUT",
        headers: {
          Authorization: auth,
        },
        body: fd,
      })
        .then((response) => {
          console.log("response of manual enter is  :", response);
          swal({
            title: "موفق",
            text: "ظرفیت پارکینگ افزایش یافت",
            button: "بستن",
            icon: "success",
          }).then(() => {
            axios
              .get(`${BaseUrl}/parkingowner/currentperiod/`, {
                headers: {
                  Authorization: auth,
                },
                params: {
                  parkingId: localStorage.getItem("pID"),
                },
              })
              .then((response) => {
                // console.log("Current P is : ", response);
                // console.log("data is : ", response.data.filledCapacity);
                setFilledCapacity(response.data.filledCapacity);
                setTotalCapacity(response.data.totalCapacity);
              })
              .catch((error) => {
                swal({
                  title: "خطا",
                  text: "خطا در تغییر ظرفیت پارکینگ",
                  button: "بستن",
                  icon: "error",
                });
              });
          });
          // .then(() => window.location.reload());
        })
        .catch((error) => console.log("error", error));
      //window.location.reload();
    }
  };

  const handelEnterButton = () => {
    ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    let fd = new FormData();
    console.log("parking id is :", ParkingId);
    console.log("token", auth);
    fd.append("parkingId", ParkingId);
    fd.append("status", "enter");
    if (totalCapacity === filledCapacity) {
      swal({
        title: "خطا",
        text: "درخواست غیر مجاز : پارکینگ پر است.",
        button: "بستن",
        icon: "error",
      });
    } else {
      fetch(`${BaseUrl}/parkingowner/manualexitorenter/`, {
        method: "PUT",
        headers: {
          Authorization: auth,
        },
        body: fd,
      })
        .then((response) => {
          console.log("response of manual enter is  :", response);
          // swal({
          //   title: "موفق",
          //   text: "ظرفیت پارکینگ کاهش یافت",
          //   icon: "success",
          //   button: "بستن",
          // });
          swal({
            title: "موفق",
            text: "ظرفیت پارکینگ کاهش یافت",
            icon: "success",
            button: "بستن",
          }).then(() => {
            axios
              .get(`${BaseUrl}/parkingowner/currentperiod/`, {
                headers: {
                  Authorization: auth,
                },
                params: {
                  parkingId: localStorage.getItem("pID"),
                },
              })
              .then((response) => {
                // console.log("Current P is : ", response);
                // console.log("data is : ", response.data.filledCapacity);
                setFilledCapacity(response.data.filledCapacity);
                setTotalCapacity(response.data.totalCapacity);
              })
              .catch((error) => {
                swal({
                  title: "خطا",
                  text: "خطا در تغییر ظرفیت پارکینگ",
                  button: "بستن",
                  icon: "error",
                });
              });
          });
          // .then(() => window.location.reload());
        })
        .catch((error) => console.log("error", error));
    }
  };

  const [filledCapacity, setFilledCapacity] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(1);

  return (
    <div className="table-mmd">
      <br />
      <br />
      <br />
      <br />
      <CircularProgressWithLabel
        className="p-2"
        value={(filledCapacity / totalCapacity) * 100}
        size="10rem"
        color="secondary"
      />
      <div className="containerButtonGlobal">
        <button className="ButtonGlobal m-3" onClick={handelEnterButton}>
          ورود
        </button>
        <button className="ButtonGlobal m-3" onClick={handelExitButton}>
          خروج
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ManualEnterExit;

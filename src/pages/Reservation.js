import React from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import jMoment from "moment-jalaali";
import "./../css/Reserve/Reservation.css";
import "./../css/Global.css";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import JalaliUtils from "@date-io/jalaali";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { ThemeProvider, Typography } from "@mui/material";
import { Image, ProgressBar } from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import axios from "axios";
import Comments from "../components/Comments";
import mySwal from "sweetalert";
import { BaseUrl } from "../Url";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { CarOwnerContext } from "../CarOwnerContext";
import { useContext } from "react";
import { createTheme } from "@mui/material";
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const theme = createTheme({
  MuiPickerDTHeader: {
    hourMinuteLabel: {
      flexDirection: "row",
    },
  },
});
const steps = [
  "انتخاب تاریخ و ساعت ورود",
  "انتخاب تاریخ و ساعت خروج",
  "انتخاب خودرو",
];

const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];
const englishNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const fixNumbers = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
/////////////////////////
const convertToPersian = (str) => {
  return new Promise((resolve) => {
    str = str.toString();
    // if (typeof str === 'string') {
    for (var i = 0; i <= 10; i++) {
      str = str.replace(i, englishNumbers[i]);
    }
    for (var j = 0; j < 5; j++) {}
    resolve(str);
  });

  // }
};
const makeItFarsi = (str) => {
  convertToPersian(str).then((str) => {
    return str;
  });
};

const Reservation = () => {
  const [carList, setCarList, currentCar, setCurrentCar] =
    useContext(CarOwnerContext);
  const histo = useHistory();
  const location = useLocation();
  const [image, setImage] = useState();
  // const [totalCost, setTotalCost] = useState(null);
  const [enter, handleEnterChange] = useState();
  console.log("enter:", enter);
  const [exit, handleExitChange] = useState(new Date());
  const [car, setCar] = useState(0);
  const [cars, setCars] = useState([]);
  const [resData, setResData] = useState(null);
  const [filledCapacity, setFilledCapacity] = useState(0);
  const [open, setOpen] = useState(true);
  const [reserveOk, setReserveOk] = useState(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const handleCarChange = (e) => {
    console.log("j", e.target);
    setCar(e.target.value);
  };

  let token = localStorage.getItem("ctoken");
  console.log("t", token);
  let auth = `Token ${token}`;
  ///////////////////////////////////////////////
  useEffect(() => {
    setCurrentCar(null);
    axios
      .get(`${BaseUrl}/parkingowner/currentperiod/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
        params: { parkingId: location.state.id },
      })
      .then((res) => {
        setFilledCapacity(res.data.filledCapacity);
      });
    axios
      .get(`${BaseUrl}/carowner/carlist/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        //console.log(res.data.results);
        setCars(res.data.results);
        //console.log(cars);
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, []);
  //////////////////////////////////////////////
  const handleSubmitButton = (e) => {
    const enterMoment = new moment(enter);
    const exitMoment = new moment(exit);

    let obj1 = { date: enter, format: "YYYY/MM/DD HH:mm:ss" };
    let obj2 = { date: exit, format: "YYYY/MM/DD HH:mm:ss" };

    const enEnter = fixNumbers(enterMoment.format("YYYY/MM/DD HH:mm:ss"));
    const enExit = fixNumbers(exitMoment.format("YYYY/MM/DD HH:mm:ss"));
    const info = {
      parking_id: location.state.id,
      enter: new DateObject(obj1).convert(gregorian, gregorian_en).format(),
      exit: new DateObject(obj2).convert(gregorian, gregorian_en).format(),
      car_id: car,
    };
    console.log("last dto : ", info);
    axios
      .post(`${BaseUrl}/carowner/reserve/`, info, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        console.log("res reserve", res.data);
        setResData(res.data);
        mySwal({
          title: "موفق",
          text: `رزرو شما با موفقیت انجام شد.`,
          buttons: "بستن",
        });
        setReserveOk(1);
      })
      .catch((e) => {
        console.log("Error", e);
        mySwal({
          title: "!خطا",
          text: "متاسفانه امکان رزرو در این روز و  ساعت وجود ندارد",
          buttons: "بستن",
        });
        setReserveOk(0);
      });
  };
  const openReservation = (e) => {
    setIsReserveModalOpen(true);
  };
  const handleModalClose = () => {
    setIsReserveModalOpen(false);
  };
  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "60vh",
    bgcolor: "white",
    border: "2px solid #706bec",
    boxShadow: 24,
    p: 4,
    background: "white",
    borderRadius: "5px",
    padding: "30px",
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const contentBasedOnStep = (nowStep) => {
    switch (nowStep) {
      case 0:
        return (
          <div className="mx-auto d-flex justify-content-center align-items-center">
            <DatePicker
              value={enter}
              onChange={handleEnterChange}
              format="MM/DD/YYYY HH:mm"
              calendar={persian}
              locale={persian_fa}
              plugins={[<TimePicker />]}
            />
          </div>
        );
        break;
      case 1:
        return (
          <div className="mx-auto d-flex justify-content-center align-items-center">
            {/* <DateTimePicker
              onChange={handleExitChange}
              value={exit}
              format="dd-MM-yyyy mm:HH"
            /> */}
            <DatePicker
              value={exit}
              onChange={handleExitChange}
              format="MM/DD/YYYY HH:mm"
              calendar={persian}
              locale={persian_fa}
              plugins={[<TimePicker />]}
            />
          </div>
        );

        break;
      case 2:
        if (cars.length == 0) {
          return (
            <p className="nocardesc">
              شما ماشینی ثبت نکرده اید. لطفا از منوی کشویی ماشین خود را ثبت
              کنید،سپس برای رزرو اقدام کنید
            </p>
          );
        } else {
          return (
            <div>
              <FormControl
                style={{
                  width: "40%",
                  marginRight: "30%",
                }}
              >
                <InputLabel id="demo-simple-select-label">خودرو</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car}
                  label="Age"
                  onChange={(e) => handleCarChange(e)}
                >
                  {cars.map((car) => (
                    <MenuItem style={{ display: "flex" }} value={car.id}>
                      {car.carName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          );
        }

        break;

      default:
        return null;
        break;
    }
  };
  return (
    <div className="">
      <Modal open={isReserveModalOpen} onClose={handleModalClose}>
        {/* <Box style={modalBoxStyle}> */}
        <Box sx={{ width: "100%" }} style={modalBoxStyle}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  تمامی مراحل انتخاب شد.آیا مایل به رزرو هستید؟
                </Typography>
                <div className="d-flex justify-content-center align-items-center mt-auto">
                  <button
                    onClick={handleSubmitButton}
                    className="ButtonGlobal mt-auto "
                  >
                    اتمام رزرو
                  </button>
                </div>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>انتخاب دوباره</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {contentBasedOnStep(activeStep)}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    مرحله قبل
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    مرحله بعد
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        مرحله {activeStep + 1} قبلا کامل شده
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "اتمام انتخاب"
                          : "تایید مرحله"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
        {/* </Box> */}
      </Modal>
      <div className="ResFirstPart padd-2">
        <div className="resParkingTitle m-5 padd-2">
          {/* <h1 className="flex jc-center titleresname">نام پارکینگ </h1> */}
          <h1 className="flex jc-center">{location.state.parkingName}</h1>
        </div>
        <p className="addressparagraph mt-5 flex jc-center margr-4" style={{fontSize:16}}>
          آدرس : {location.state.location}{" "}
        </p>
        <div style={{width:'90%'}} className=" flex fd-row margr-6 jc-center infosparrent d-flex flex-column flex-lg-row mt-3 align-items-center">
          <div className="littleinfo">
            <h3 style={{ fontSize: "15px" }}>امتیاز</h3>
            <Rating
              name="read-only"
              value={location.state.rating}
              readOnly
              size="small"
            />
          </div>
          <div className="littleinfo">
            {" "}
            <h3 style={{ fontSize: "18px" }}>تلفن</h3>
            <p style={{ fontSize: "14px" }}>{location.state.number}</p>
          </div>
          <div className="littleinfo">
            <h3 style={{ fontSize: "18px" }}>ظرفیت خالی</h3>
            <p style={{ fontSize: "16px" }}>
              {location.state.capacity - filledCapacity}
            </p>
          </div>
          <div className="littleinfo">
            <h3 style={{ fontSize: "18px" }}>هزینه هر ساعت</h3>
            <p style={{ fontSize: "16px" }}>{location.state.pricePerHour}</p>
          </div>
        </div>
        <br></br>
        <button className="ButtonGlobal mx-auto margt-3" onClick={openReservation}>
          شروع فرآیند رزرو
        </button>
      </div>
      <div>
        {" "}
        <Comments />
      </div>
    </div>
  );
};

export default Reservation;
{
  /*  */
}

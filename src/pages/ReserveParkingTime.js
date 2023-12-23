import "../css/Global.css";
import "../css/ReserveTimeP.css";
import { useState, useEffect } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import mySwal from "sweetalert";
import axios from "axios";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory, useLocation } from "react-router-dom";
import image from "../assets/parking.jpeg";
import "../css/form.css";
import "../css/EditCar.css";
import "../css/EditParking.css";
import ".././index.css";
import "../css/Global.css";
import Form from "react-bootstrap/Form";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "../css/Reserve/Reservation.css";

const initOptions = [
  { label: "همه", disabled: false },
  { label: "شنبه", disabled: false },
  { label: "یکشنبه", disabled: false },
  { label: "دوشنبه", disabled: false },
  { label: "سه‌شنبه", disabled: false },
  { label: "چهارشنبه", disabled: false },
  { label: "پنجشنبه", disabled: false },
  { label: "جمعه", disabled: false },
];
const styles = {
  textField: {
    FontFace: "Noto Naskh Arabic", //works!
  },
};
const useStyles = makeStyles({
  root: {
    marginTop: "15%",
  },
  rootSecondCard: {
    minWidth: 210,
    marginTop: "5%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const ReserveParkingTime = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [startTime, setStartTime] = useState("00:00:00");
  const [finishTime, setFinishTime] = useState("00:00:00");
  const [daysOfWeekSuggestions, setOptions] = useState(initOptions);
  const [selected, setSelected] = useState([]);
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const [data, setData] = useState([{}]);
  const location = useLocation();
  const [bla, setBla] = useState([]);
  const history = useHistory();
  const [StartSat, setStartSat] = useState("00:00:00");
  const [StartSun, setStartSun] = useState("00:00:00");
  const [StartMon, setStartMon] = useState("00:00:00");
  const [StartTue, setStartTue] = useState("00:00:00");
  const [StartWed, setStartWed] = useState("00:00:00");
  const [StartThu, setStartThu] = useState("00:00:00");
  const [StartFri, setStartFri] = useState("00:00:00");
  const [endSat, setEndSat] = useState("00:00:00");
  const [endSun, setEndSun] = useState("00:00:00");
  const [endMon, setEndMon] = useState("00:00:00");
  const [endTue, setEndTue] = useState("00:00:00");
  const [endWed, setEndWed] = useState("00:00:00");
  const [endThu, setEndThu] = useState("00:00:00");
  const [endFri, setEndFri] = useState("00:00:00");
  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const handleChangeFinishTime = (e) => {
    setFinishTime(e.target.value);
  };
  let news = {};
  let newListOfDys = [];
  const onOptionsChange = (e, valueArr) => {
    setSelected(valueArr);
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i].label === "دوشنبه") {
        news = { day: 0, is_selected: true };
        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "سه‌شنبه") {
        news = { day: 1, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "چهارشنبه") {
        news = { day: 2, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "پنج‌شنبه") {
        news = { day: 3, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "جمعه") {
        news = { day: 4, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "شنبه") {
        news = { day: 5, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "یکشنبه") {
        news = { day: 6, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
      if (valueArr[i].label === "همه") {
        news = { day: 0, is_selected: true };
        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 1, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 2, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 3, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 4, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 5, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
        news = { day: 6, is_selected: true };

        newListOfDys.push(news);
        setBla(newListOfDys);
      }
    }

    if (valueArr.length === 0) {
      const resetOptions = [...daysOfWeekSuggestions].map((opt) => {
        opt.disabled = false;
        return opt;
      });
      setOptions(resetOptions);
    } else {
      const everyDaySelected = valueArr.find((item) => item.label === "همه");

      if (everyDaySelected) {
        const updatedOptions = [...daysOfWeekSuggestions].map((opt) => {
          if (opt.label !== "همه") opt.disabled = true;
          else opt.disabled = false;
          return opt;
        });
        setOptions(updatedOptions);
      }
    }
  };
  let ParkingId;
  const id = localStorage.getItem("pID");
  let token = localStorage.getItem("ptoken");
  let auth = `token ${token}`;
  useEffect(() => {
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

    var config = {
      method: "GET",

      url: `${BaseUrl}/parkingowner/templatedetail/?parking_id=${id}`,
      params: {
        parking_id: ParkingId,
      },
      headers: {
        Authorization: auth,
      },
    };
    axios(config)
      .then(function (response) {
        console.log("reeeeeeeeeee", response.data);

        setStartMon(response.data[0].openAt.substr(11, 18));
        setEndMon(response.data[0].closeAt.substr(11, 18));

        setStartTue(response.data[1].openAt.substr(11, 18));
        setEndTue(response.data[1].closeAt.substr(11, 18));

        setStartWed(response.data[2].openAt.substr(11, 18));
        setEndWed(response.data[2].closeAt.substr(11, 18));

        setStartThu(response.data[3].openAt.substr(11, 18));
        setEndThu(response.data[3].closeAt.substr(11, 18));

        setStartFri(response.data[4].openAt.substr(11, 18));
        setEndFri(response.data[4].closeAt.substr(11, 18));

        setStartSat(response.data[5].openAt.substr(11, 18));
        setEndSat(response.data[5].closeAt.substr(11, 18));

        setStartSun(response.data[6].openAt.substr(11, 18));
        setEndSun(response.data[6].closeAt.substr(11, 18));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [
    StartMon,
    StartSat,
    StartSun,
    StartThu,
    StartWed,
    StartFri,
    StartTue,
    endTue,
    endWed,
    endThu,
    endSat,
    endSun,
    endFri,
    endMon,
  ]);
  console.log("startsat", StartSat);

  const handleSubmitButton = (event) => {
    let ParkingId = currentParking.id;

    if (selected.length === 0) {
      mySwal({
        title: "خطا!",
        text: "روز انتخاب‌شده نمی‌تواند خالی باشد.",
        buttons: "بستن",
        icon: "error",
      });
    } else if (
      finishTime === startTime &&
      finishTime != "00:00:00" &&
      startTime != "00:00:00"
    ) {
      mySwal({
        title: "خطا!",
        text: "زمان ورود و خروج نمی‌توانند برابر باشند.",
        buttons: "بستن",
        icon: "error",
      });
    } else if (parseInt(finishTime) < parseInt(startTime)) {
      mySwal({
        title: "خطا!",
        text: "  زمان خروج کم‌تر از زمان ورود است.",
        buttons: "بستن",
        icon: "error",
      });
    } else if (
      finishTime.substr(3, 5) != "00:00" &&
      finishTime.substr(3, 5) != "30:00"
    ) {
      mySwal({
        title: "خطا!",
        text: "دقايق و ثانیه‌های واردشده باید 30 یا 00 باشند.",
        buttons: "بستن",
        icon: "error",
      });
    } else if (
      startTime.substr(3, 5) != "00:00" &&
      startTime.substr(3, 5) != "30:00"
    ) {
      mySwal({
        title: "خطا!",
        text: "دقايق و ثانیه‌های واردشده باید 30 یا 00 باشند.",
        buttons: "بستن",
        icon: "error",
      });
    } else {
      var payload = JSON.stringify({
        id: ParkingId,
        openAt: startTime,
        closeAt: finishTime,
        days: bla,
      });
      console.log("payload", payload);
      axios({
        url: `${BaseUrl}/parkingowner/edittemplate/`,
        headers: { authorization: auth, "Content-Type": "application/json" },
        method: "PUT",
        data: payload,
      })
        .then((res) => {
          console.log("gggggg", res.data);

          mySwal({
            title: "پیغام",
            text: "زمان ورود و خروج ثبت شد.",
            buttons: "بستن",
            icon: "success",
          });
          setStartTime("00:00:00");
          setFinishTime("00:00:00");

          var config = {
            method: "GET",

            url: `${BaseUrl}/parkingowner/templatedetail/?parking_id=${id}`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };
          axios(config)
            .then(function (response) {
              console.log("reeeeeeeeeee", response.data);

              setStartMon(response.data[0].openAt.substr(11, 18));
              setEndMon(response.data[0].closeAt.substr(11, 18));

              setStartTue(response.data[1].openAt.substr(11, 18));
              setEndTue(response.data[1].closeAt.substr(11, 18));

              setStartWed(response.data[2].openAt.substr(11, 18));
              setEndWed(response.data[2].closeAt.substr(11, 18));

              setStartThu(response.data[3].openAt.substr(11, 18));
              setEndThu(response.data[3].closeAt.substr(11, 18));

              setStartFri(response.data[4].openAt.substr(11, 18));
              setEndFri(response.data[4].closeAt.substr(11, 18));

              setStartSat(response.data[5].openAt.substr(11, 18));
              setEndSat(response.data[5].closeAt.substr(11, 18));

              setStartSun(response.data[6].openAt.substr(11, 18));
              setEndSun(response.data[6].closeAt.substr(11, 18));
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("ffff", error);
        });
    }
  };

  return (
    <div
      class="container pt-5 mt-5"
      style={{
        marginLeft: "10%",
      }}
    >
      <div class="row row-cols-1 row-cols-md-2 g-5">
        <div class="col-md-11 jobs_index_middle_panels">
          <div class="card h-90">
            <h5
              class="card-header"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              انتخاب الگوی زمانی
            </h5>
            <h6
              class="card-title pt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              لطفاً دقایق را 00 یا 30 و ثانیه‌ها را 00 انتخاب کنید.
            </h6>

            <div class="card-body  pt-5 pb-1 ">
              <div className="d-flex justify-content-around">
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      paddingBottom: "18px",
                      paddingRight: "20%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    انتخاب روز{" "}
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    <Autocomplete
                      disableClearable
                      disablePortal
                      filterSelectedOptions
                      multiple
                      getOptionLabel={(option) => option.label}
                      getOptionDisabled={(option) => !!option.disabled}
                      id="days-autocomplete"
                      value={selected}
                      options={daysOfWeekSuggestions}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <TextField
                          required
                          id="daysOfWeek"
                          name="daysOfWeek"
                          type="search"
                          {...params}
                          style={{
                            whiteSpace: "nowrap",
                            width: "150px",
                            paddingBottom: "50px",
                          }}
                        />
                      )}
                      onChange={(event, value) => onOptionsChange(event, value)}
                    />{" "}
                  </p>
                </div>
                <div style={{ marginLeft: "5%" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      paddingBottom: "18px",
                      paddingRight: "20%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    زمان ورود
                  </h3>
                  <TextField
                    id="time"
                    value={startTime}
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 36,
                    }}
                    onChange={(e) => handleChangeStartTime(e)}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                      paddingBottom: "18px",
                      paddingRight: "20%",
                    }}
                  >
                    زمان خروج
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    <TextField
                      id="time"
                      value={finishTime}
                      type="time"
                      defaultValue={new Date()}
                      //className={classes.textField}
                      inputProps={{
                        step: 36,
                      }}
                      onChange={(e) => handleChangeFinishTime(e)}
                    />
                  </p>
                </div>
              </div>
            </div>
            <p class="card-footer">
              <div className="d-flex justify-content-around">
                <button
                  onClick={(e) => handleSubmitButton(e)}
                  className="ButtonGlobal mt-auto "
                >
                  تأیید{" "}
                </button>
                <button
                  onClick={(e) => {
                    history.push("/UserPannel");
                  }}
                  className="ButtonGlobal mt-auto "
                >
                  بازگشت به صفحه اصلی
                </button>
              </div>
            </p>
          </div>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col-md-12 jobs_index_middle_panels">
              <div
                class="card h-100"
                style={{
                  marginTop: "2%",
                }}
              >
                <h5
                  class="card-header"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  الگوی شما
                </h5>

                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginRight: "11px" }}
                    variant="p"
                    className=""
                  >
                    شنبه
                  </Typography>

                  <h3
                    style={{
                      fontSize: "14px",
                      marginRight: "5px",
                    }}
                  >
                    زمان ورود:{" "}
                  </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {StartSat}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endSat}
                  </Typography>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    یکشنبه
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان ورود: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {StartSun}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endSun}
                  </Typography>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    دوشنبه
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان ورود: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {StartMon}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endMon}
                  </Typography>
                </div>
                <hr />

                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    سه‌شنبه
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان ورود: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {StartTue}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endTue}
                  </Typography>
                </div>

                <hr />
                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    چهارشنبه
                  </Typography>

                  <h3 style={{ fontSize: "14px", marginLeft: "4px" }}>
                    زمان ورود:{" "}
                  </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginLeft: "5px" }}
                    variant="p"
                    className=""
                  >
                    {StartWed}
                  </Typography>

                  <h3 style={{ fontSize: "14px", marginLeft: "5px" }}>
                    زمان خروج:{" "}
                  </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginLeft: "2px" }}
                    variant="p"
                    className=""
                  >
                    {endWed}
                  </Typography>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    پنجشنبه
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان ورود: </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginLeft: "5px" }}
                    variant="p"
                    className=""
                  >
                    {StartThu}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endThu}
                  </Typography>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <h3 style={{ fontSize: "14px" }}>روز: </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginRight: "11px" }}
                    variant="p"
                    className=""
                  >
                    جمعه
                  </Typography>

                  <h3 style={{ fontSize: "14px", marginRight: "11px" }}>
                    زمان ورود:{" "}
                  </h3>
                  <Typography
                    style={{ wordWrap: "break-word", marginLeft: "6px" }}
                    variant="p"
                    className=""
                  >
                    {StartFri}
                  </Typography>

                  <h3 style={{ fontSize: "14px" }}>زمان خروج: </h3>
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    variant="p"
                    className=""
                  >
                    {endFri}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveParkingTime;

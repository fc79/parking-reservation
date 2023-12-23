import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "../css/label.css";
import { Typography } from "@mui/material";
import transitions from "@material-ui/core/styles/transitions";
import Slider from "@material-ui/core/Slider";
import Select, { components } from "react-select";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BaseUrl } from "../Url";
// import Button from "react-bootstrap/Button";
import { Button } from "@mui/material";
import "../App.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineFire } from "react-icons/ai";
import "./../css/layout.css";
import "./../css/padd.css";
import { GrFormPrevious } from "react-icons/gr";
import { useHistory } from "react-router";
import { FiFilter } from "react-icons/fi";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(70),
      height: theme.spacing(15),
    },
  },
  slider: {
    width: 300,
  },
  //   rootForm: {
  //     "& > *": {
  //       marginTop: theme.spacing(5),
  //       width: "25ch",
  //     },
  //   },
}));

function valuetext(value) {
  return `${value},000`;
}
const aquaticCreatures = [
  { label: "شبانه", value: "Shark" },
  { label: "امتیازی", value: "Dolphin" },
  { label: "پارکینگ ۱", value: "Whale" },
  { label: "پارکینگ ۲", value: "Octopus" },
];

const showBy = [{ label: "بیشترین امتیاز", value: "rating" }];
const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>چنین اسمی وجود ندارد!</span>
    </components.NoOptionsMessage>
  );
};
export default function FilterSearch(props) {
  const { updateMax, updateMin } = props;
  const [select, setSelect] = useState("");
  const classes = useStyles();
  let token = localStorage.getItem("ctoken");
  let auth = `Token ${token}`;
  const [value, setValue] = React.useState([
    updateMin / 1000,
    updateMax / 1000,
  ]);
  const [haveOff, setHaveOff] = useState(false);
  const [haveSpace, setHaveSpace] = useState(0);
  const [ordering, setOrdering] = useState(null);
  const [hideFilter, setHideFilter] = useState(true);
  const [popularParkings, setPopularParkings] = useState([]);
  const [recentParkings, setRecentParkings] = useState([]);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitFilter = () => {
    // console.log("have off:", haveOff);
    // console.log("have space:", haveSpace);
    // console.log("selected option:", ordering);
    props.setPrices(value);
    props.setHaveOff(haveOff);
    props.setHaveSpace(haveSpace);
    props.setOrdering(ordering);
    console.log("filter:", haveSpace);
  };

  const handleHide = () => {
    props.setHide(true);
  };

  useEffect(() => {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    axios
      .get(`${BaseUrl}/carowner/carlist/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          has_capacity: haveSpace,
        },
      })
      .then((response) => {
        console.log("rateee");
      })

      .catch(() => {
        console.log("ERROR");
      });

    axios
      .get(`${BaseUrl}/carowner/get_most_popular_parkings/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((response) => {
        console.log("dddddddddd", response.data);
        setPopularParkings(response.data);
      });
    axios
      .get(`${BaseUrl}/carowner/get_recent_parkings/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((response) => {
        console.log("recentResponse", response.data);
        setRecentParkings(response.data);
      });
  }, []);

  function handleReserveButton(item) {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    var data = JSON.stringify({
      parking_id: item.id,
    });
    axios
      .post(`${BaseUrl}/carowner/search_click/`, data, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((response) => {
        console.log("handleReserveButton", response);
        history.push("/ParkingPage", {
          id: item.id,
          image: item.parkingPicture,
          capacity: item.capacity,
          rating: item.rating,
          isPrivate: item.isPrivate,
          parkingName: item.parkingName,
          number: item.parkingPhoneNumber,
          location: item.location,
          pricePerHour: item.pricePerHour,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <div
      class="card pt-5 mt-5"
      style={{
        borderRadius: "20px",
        animation: "showingSmoothly 2s",
        borderColor: "#5c70df",
        maxWidth: "75%",
        marginRight: "18%",
      }}
    >
      <h3 class="card-header pt-4 text-center">
        فیلترها
        <FiFilter style={{ marginRight: "7px" }} />
      </h3>

      <div class="card-body">
        <div className="container pt-1 mt-1 ">
          <div class="row">
            <div className=" ">
              <div class="flex-1 ai-center jc-start">
                <div className="flex">
                  <AiOutlineClockCircle size={25} />
                </div>
                <div
                  className="flex fd-row padd-1"
                  style={{ fontSize: 16 }}
                >
                  آخرین جستجوهای شما
                </div>
              </div>
              <div
                class="topContainer jc-start scrollbar-hidden"
                style={{
                  maxWidth: "100%",
                  whiteSpace: "nowrap",
                  overflowX: "scroll",
                }}
              >
                {recentParkings.map((item) => (
                  <div
                    onClick={() => handleReserveButton(item)}
                    className="flex fd-row jc-stretch dark-border round-3 ai-center cur-point paddh-3 padd-1 marg-05 txt-sm"
                  >
                    <div className="flex">{item.parkingName}</div>
                    <div className="flex-1 margr-1">
                      <GrFormPrevious />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div class="flex-1 ai-center jc-start">
                <div className="flex">
                  <AiOutlineFire size={25} />
                </div>
                <div
                  className="flex fd-row padd-1"
                  style={{ fontSize: 16 }}
                >
                  جستجوهای پرطرفدار
                </div>
              </div>
              <div
                class="topContainer jc-start scrollbar-hidden "
                style={{
                  maxWidth: "100%",
                  whiteSpace: "nowrap",
                  overflowX: "scroll",
                }}
              >
                {popularParkings.map((item) => (
                  <div
                    onClick={() => handleReserveButton(item)}
                    className="flex fd-row jc-stretch dark-border round-3 ai-center cur-point paddh-3 padd-1 marg-05 txt-sm"
                  >
                    <div className="flex">{item.parkingName}</div>
                    <div className="flex-1 margr-1">
                      <GrFormPrevious />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div class="row flex ai-center">
            {/* <div class="col-md-4 col-xs-6 ">
              <div>
                <div>
                  <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                      maxWidth: "65%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    قیمت از {valuetext(value[0])} تا {valuetext(value[1])} تومان
                  </Typography>
                  <Slider
                    value={value}
                    onChange={handleChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    style={{ maxWidth: "50%", marginLeft: "40%" }}
                  />
                </div>
              </div>
            </div> */}

            {/* <div class="col-md-4 col-xs-6 ">
              <div>
                <div>
                  <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    نام پارکینگ
                  </Typography>
                  <div>
                    <Select
                      value={select}
                      options={aquaticCreatures}
                      onChange={(opt) => setSelect(opt)}
                      placeholder="انتخاب کنید..."
                      isClearable
                      components={{ NoOptionsMessage }}
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div class="col-md-4 col-xs-6 ">
              <div>
                <div>
                  {/* <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    مرتب سازی بر اساس ...
                  </Typography> */}
                  <div class="flex-1 fd-row ">
                    <div
                      className="flex fd-row padd-1"
                      style={{ fontSize: "18px" }}
                    >
                      مرتب سازی بر اساس ...
                    </div>
                  </div>
                  <div>
                    <Select
                      options={showBy}
                      onChange={(opt) => {
                        if (opt === null) {
                          setOrdering(opt);
                        } else {
                          setOrdering(opt.value);
                        }
                      }}
                      placeholder="انتخاب کنید..."
                      isClearable
                      components={{ NoOptionsMessage }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-6 ">
              <div>
                <div className={classes.slider}>
                  {/* <Typography
                    className="flex-1 ai-center jc-start"
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    پارکینگ های تخفیف دار{" "}
                  </Typography> */}
                  <div class="flex-1 fd-row text-center">
                    <div
                      className="flex fd-row padd-1"
                      style={{ fontSize: "18px" }}
                    >
                      پارکینگ‌های تخفیف دار
                    </div>
                  </div>
                  <div className="text-center">
                    <Form>
                      <Form.Check
                        // style={{ width: "25%", height: "30px" }}
                        type="switch"
                        id="custom-switch"
                        label=""
                        onChange={() => {
                          setHaveOff(!haveOff);
                        }}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-6 ">
              <div>
                <div className={classes.slider}>
                  {/* <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    ظرفیت خالی دارد{" "}
                  </Typography> */}
                  <div class="flex-1 fd-row ">
                    <div
                      className="flex fd-row padd-1"
                      style={{ fontSize: "18px" }}
                    >
                      ظرفیت خالی
                    </div>
                  </div>
                  <div className="text-center">
                    <Form>
                      <Form.Check
                        // style={{ width: "25%", height: "30px" }}
                        type="switch"
                        id="custom-switch"
                        label=""
                        onChange={() => {
                          if (haveSpace === 0) {
                            setHaveSpace(1);
                          } else {
                            setHaveSpace(0);
                          }
                        }}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div class="row">
            {/* <div class="col-md-4 col-xs-6 ">
              <div>
                <div>
                  <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    مرتب سازی بر اساس ...
                  </Typography>
                  <div>
                    <Select
                      options={showBy}
                      onChange={(opt) => {
                        if (opt === null) {
                          setOrdering(opt);
                        } else {
                          setOrdering(opt.value);
                        }
                      }}
                      placeholder="انتخاب کنید..."
                      isClearable
                      components={{ NoOptionsMessage }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div class="col-md-4 col-xs-6 ">
              <div>
                <div>
                  {/* <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                      maxWidth: "65%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    قیمت از {valuetext(value[0])} تا {valuetext(value[1])} تومان
                  </Typography> */}
                  <div class="flex-1 fd-row " data-testid="range">
                    <div
                      className="flex fd-row padd-1 font"
                      style={{ fontSize: "20px" }}
                    >
                      قیمت از {valuetext(value[0])} تا {valuetext(value[1])}{" "}
                      تومان
                    </div>
                  </div>
                  <Slider
                    value={value}
                    onChange={handleChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    style={{ maxWidth: "50%", marginRight: "25%" }}
                    min={updateMin / 1000}
                    max={updateMax / 1000}
                  />
                </div>
              </div>
            </div>
            {/* <div class="col-md-4 col-xs-6 ">
              <div>
                <div className={classes.slider}>
                  <Typography
                    id="range-slider"
                    style={{
                      fontSize: "20px",
                      fontFamily: "iranSans",
                      paddingBottom: "15px",
                    }}
                  >
                    ظرفیت خالی دارد{" "}
                  </Typography>
                  <div>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label=""
                        onChange={() => {
                          setHaveSpace(!haveSpace);
                        }}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <br />
          <br />
          <div class="row text-center">
            <div class="margt-5 col-md-4 col-xs-6">
              <Button
                onClick={() => handleSubmitFilter()}
                style={{
                  backgroundColor: "#695ce3",
                  borderRadius: "20px",
                  padding: "8px 5px",
                  width: "120px",
                }}
                size="small"
                variant="contained"
              >
                <text className="bold txt-md">اعمال</text>
              </Button>
            </div>
            <div class="margt-5 col-md-4 col-xs-6">
              <Button
                onClick={handleHide}
                style={{
                  backgroundColor: "#695ce3",
                  borderRadius: "20px",
                  padding: "8px 5px",
                  width: "120px",
                }}
                size="small"
                variant="contained"
              >
                <text className="bold txt-md"> انصراف </text>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "../css/Global.css";
import "../css/ReserveTimeP.css";
import { useState, useEffect } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import mySwal from "sweetalert";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import axios from "axios";

const ReserveTime = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const [sat1, setSat1] = useState("00:00:00");
  const [sat2, setSat2] = useState("00:00:00");
  const [sun1, setSun1] = useState("00:00:00");
  const [sun2, setSun2] = useState("00:00:00");
  const [mon1, setMon1] = useState("00:00:00");
  const [mon2, setMon2] = useState("00:00:00");
  const [tue1, setTue1] = useState("00:00:00");
  const [tue2, setTue2] = useState("00:00:00");
  const [wed1, setWed1] = useState("00:00:00");
  const [wed2, setWed2] = useState("00:00:00");
  const [thu1, setThu1] = useState("00:00:00");
  const [thu2, setThu2] = useState("00:00:00");
  const [fri1, setFri1] = useState("00:00:00");
  const [fri2, setFri2] = useState("00:00:00");

  const [StartSat, setStartSat] = useState("");
  const [StartSun, setStartSun] = useState("");
  const [StartMon, setStartMon] = useState("");
  const [StartTue, setStartTue] = useState("");
  const [StartWed, setStartWed] = useState("");
  const [StartThu, setStartThu] = useState("");
  const [StartFri, setStartFri] = useState("");
  const [endSat, setEndSat] = useState("");
  const [endSun, setEndSun] = useState("");
  const [endMon, setEndMon] = useState("");
  const [endTue, setEndTue] = useState("");
  const [endWed, setEndWed] = useState("");
  const [endThu, setEndThu] = useState("");
  const [endFri, setEndFri] = useState("");
  const HandelSatStart = (e) => {
    setStartSat(e.target.value);
  };
  const HandelSunStart = (e) => {
    setStartSun(e.target.value);
  };
  const HandelMonStart = (e) => {
    setStartMon(e.target.value);
  };
  const HandelTueStart = (e) => {
    setStartTue(e.target.value);
  };
  const HandelWedStart = (e) => {
    setStartWed(e.target.value);
  };
  const HandelThuStart = (e) => {
    setStartThu(e.target.value);
  };
  const HandelFriStart = (e) => {
    setStartFri(e.target.value);
  };

  const HandelSatend = (e) => {
    setEndSat(e.target.value);
  };
  const HandelSunend = (e) => {
    setEndSun(e.target.value);
  };
  const HandelMonend = (e) => {
    setEndMon(e.target.value);
  };
  const HandelTueend = (e) => {
    setEndTue(e.target.value);
  };
  const HandelWedend = (e) => {
    setEndWed(e.target.value);
  };
  const HandelThuend = (e) => {
    setEndThu(e.target.value);
  };
  const HandelFriend = (e) => {
    setEndFri(e.target.value);
  };
  let ParkingId;
  useEffect(() => {
    const id = localStorage.getItem("pID");
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");

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
      method: "get",

      url: `${BaseUrl}/parkingowner/templatedetail/`,
      params: {
        parking_id: ParkingId,
      },
      headers: {
        Authorization: auth,
      },
    };

    axios
      .get(`${BaseUrl}/parkingowner/templatedetail/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          parking_id: id,
        },
      })
      .then((response) => {
        console.log("asdadadadasdasd");
        console.log(response.data);
        setMon1(response.data[0].openAt.substr(11, 18));
        setMon2(response.data[0].closeAt.substr(11, 18));

        setTue1(response.data[1].openAt.substr(11, 18));
        setTue2(response.data[1].closeAt.substr(11, 18));

        setWed1(response.data[2].openAt.substr(11, 18));
        setWed2(response.data[2].closeAt.substr(11, 18));

        setThu1(response.data[3].openAt.substr(11, 18));
        setThu2(response.data[3].closeAt.substr(11, 18));

        setFri1(response.data[4].openAt.substr(11, 18));
        setFri2(response.data[4].closeAt.substr(11, 18));

        setSat1(response.data[5].openAt.substr(11, 18));
        setSat2(response.data[5].closeAt.substr(11, 18));
        console.log(response.data[5].openAt, response.data[5].closeAt);

        setSun1(response.data[6].openAt.substr(11, 18));
        setSun2(response.data[6].closeAt.substr(11, 18));
      });

    // axios(config)
    //   .then(function (response) {
    //     console.log(response.data);
    //     setMon1(response.data[0].openAt.substr(11, 18));
    //     setMon2(response.data[0].closeAt.substr(11, 18));

    //     setTue1(response.data[1].openAt.substr(11, 18));
    //     setTue2(response.data[1].closeAt.substr(11, 18));

    //     setWed1(response.data[2].openAt.substr(11, 18));
    //     setWed2(response.data[2].closeAt.substr(11, 18));

    //     setThu1(response.data[3].openAt.substr(11, 18));
    //     setThu2(response.data[3].closeAt.substr(11, 18));

    //     setFri1(response.data[4].openAt.substr(11, 18));
    //     setFri2(response.data[4].closeAt.substr(11, 18));

    //     setSat1(response.data[5].openAt.substr(11, 18));
    //     setSat2(response.data[5].closeAt.substr(11, 18));
    //     console.log(response.data[5].openAt, response.data[5].closeAt);

    //     setSun1(response.data[6].openAt.substr(11, 18));
    //     setSun2(response.data[6].closeAt.substr(11, 18));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  const Sun = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartSun,
      closeAt: endSun,
      date: 6,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setSun1(response.data[6].openAt.substr(11, 18));
            setSun2(response.data[6].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Mon = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartMon,
      closeAt: endMon,
      date: 0,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setMon1(response.data[0].openAt.substr(11, 18));
            setMon2(response.data[0].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Tue = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartTue,
      closeAt: endTue,
      date: 1,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setTue1(response.data[1].openAt.substr(11, 18));
            setTue2(response.data[1].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Wed = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartWed,
      closeAt: endWed,
      date: 2,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setWed1(response.data[2].openAt.substr(11, 18));
            setWed2(response.data[2].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Thu = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartThu,
      closeAt: endThu,
      date: 3,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setThu1(response.data[3].openAt.substr(11, 18));
            setThu2(response.data[3].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Fri = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartFri,
      closeAt: endFri,
      date: 4,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();
          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };

          axios(config).then(function (response) {
            console.log(response.data);
            setFri1(response.data[4].openAt.substr(11, 18));
            setFri2(response.data[4].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };
  const Sat = (event) => {
    event.preventDefault();
    let ParkingId = currentParking.id;
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var axios = require("axios");
    var data = JSON.stringify({
      id: ParkingId,
      openAt: StartSat,
      closeAt: endSat,
      date: 5,
    });

    var config = {
      method: "put",
      url: `${BaseUrl}/parkingowner/edittemplate/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // let fd = new FormData();
    // fd.append("id", ParkingId);
    // fd.append("openAt", StartSat);
    // fd.append("closeAt", endSat);
    // fd.append("date", 5);
    // console.log("dataaaa:", ParkingId, StartSat, endSat, auth);
    // fetch(`${BaseUrl}/parkingowner/edittemplate/`, {
    //   headers: { authorization: auth },
    //   method: "PUT",
    //   body: fd,
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then(() => {
    //     console.log("okkkkkkkkkkkkkkk");
    //   });

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.id));
        mySwal({
          title: "پیغام",
          text: "تایم ورود و خروج ست شد.",
          buttons: "بستن",
          icon: "success",
        }).then(() => {
          // window.location.reload();

          let token = localStorage.getItem("ptoken");
          let auth = `Token ${token}`;
          var axios = require("axios");
          var config = {
            method: "get",

            url: `${BaseUrl}/parkingowner/templatedetail/`,
            params: {
              parking_id: ParkingId,
            },
            headers: {
              Authorization: auth,
            },
          };
          console.log("dataaaa:", ParkingId, StartSat, endSat, auth);
          axios(config).then(function (response) {
            console.log(response.data);
            setSat1(response.data[5].openAt.substr(11, 18));
            setSat2(response.data[5].closeAt.substr(11, 18));
          });
        });
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        mySwal({
          title: "!خطا",
          text: "ساعت وارد شده معتبر نیست",
          buttons: "بستن",
          icon: "error",
        });
      });
  };

  return (
    <div className="MainDivReserve">
      <div>
        <br />
        <br /> <br /> <br />
        <Divider>شنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={sat1}
                onChange={(e) => HandelSatStart(e)}
                helperText="Please enter your name"
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={sat2}
                onChange={(e) => HandelSatend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Sat}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>یکشنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={sun1}
                onChange={(e) => HandelSunStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={sun2}
                onChange={(e) => HandelSunend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Sun}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>دوشنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={mon1}
                onChange={(e) => HandelMonStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={mon2}
                onChange={(e) => HandelMonend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Mon}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>سه شنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={tue1}
                onChange={(e) => HandelTueStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={tue2}
                onChange={(e) => HandelTueend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Tue}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>چهارشنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={wed1}
                onChange={(e) => HandelWedStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={wed2}
                onChange={(e) => HandelWedend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Wed}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>پنج شنبه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={thu1}
                onChange={(e) => HandelThuStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={thu2}
                onChange={(e) => HandelThuend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Thu}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
        <Divider>جمعه</Divider>
        <form>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space6-reserve" />
              <label>تایم شروع</label>
              <div className="space5-reserve" />
              <label>تایم پایان</label>
              <div className="space7-reserve" />
            </div>
          </div>
          <div className="wrapper-reserve-time">
            <div className="flex-container-reserve">
              <div className="space1-reserve" />
              <input
                className="input1-reserve boxes-reserve"
                type="text"
                placeholder={fri1}
                onChange={(e) => HandelFriStart(e)}
              />
              <div className="space2-reserve" />
              <input
                class="input1-reserve boxes-reserve"
                type="text"
                placeholder={fri2}
                onChange={(e) => HandelFriend(e)}
              />
              <div className="space4-reserve" />
              <button
                className="ButtonRserveNarges btn-ReserveT-narges"
                onClick={Fri}
              >
                ثبت
              </button>
              <div className="space3-reserve" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReserveTime;

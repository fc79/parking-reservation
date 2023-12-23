import { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import mySwal from "sweetalert";
import swal from "sweetalert";
import "../css/form.css";
import "../css/RegisterCar.css";
import "../css/RegisterParking.css";
import ".././index.css";
import "../css/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defparking from "../images/opalParking.jpg";
import { isPrivate } from "@babel/types";
import Form from "react-bootstrap/Form";
import { BaseUrl } from "../Url";
import ParkingLocation from "../components/ParkingLocation";

const RegisterParking = () => {
  const history = useHistory();
  const location = useLocation();

  //Input fields
  const [parkingName, setParkingName] = useState("");
  const [parkingCapacity, setParkingCapacity] = useState();
  const [parkingAddress, setParkingAddress] = useState("");
  const [parkingPhoneNum, setParkingPhoneNum] = useState();
  const [pricePerHour, setPricePerHour] = useState();

  const [parkingImage, setParkingImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  //Checkbox for private or public parking
  const [role, setRole] = useState("C");
  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxChange = (e) => {
    setCheckbox(e.target.value);
  };

  const handleRoleChange = (e) => {
    handleCheckboxChange(e);
    if (checkbox === true) setRole("Private");
    else setRole("Public");
  };

  //Handling the states
  const handleParkingName = (e) => {
    setParkingName(e.target.value);
  };

  const handleParkingCapacity = (e) => {
    setParkingCapacity(e.target.value);
  };

  const handleParkingAddress = (e) => {
    setParkingAddress(e.target.value);
  };

  const handleParkingPhoneNum = (e) => {
    setParkingPhoneNum(e.target.value);
  };

  const handleParkingPrice = (e) => {
    setPricePerHour(e.target.value);
    console.log("مایه تیله:", e.target.value);
  };

  const handleMySubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    const fd = new FormData();
    // console.log('parkingimag:');
    // console.log(parkingImage);
    // console.log('image:');
    // const image = '/media/parkingpictures/' + parkingImage.name;
    // setParkingImage({ name: image });
    // const info = {
    //   isPrivate: checkbox,
    //   parkingName: parkingName,
    //   location: parkingAddress,
    //   parkingPhoneNumber: parkingPhoneNum,
    //   capacity: parkingCapacity,
    //   parkingPicture: parkingImage,
    // };

    if (!parkingImage) {
      console.log("عکسم", defparking);
      setParkingImage({ src: " '../images/opalParking.jpg'" });
      //formdata.append("parkingPicture", fileInput.files[0], "/path/to/file");
    }

    fd.append("isPrivate", checkbox);
    fd.append("parkingName", parkingName);
    fd.append("location", parkingAddress);
    fd.append("parkingPhoneNumber", parkingPhoneNum);
    fd.append("capacity", parkingCapacity);
    fd.append("parkingPicture", parkingImage);
    // console.log(fd.get('parkingName'));
    // for (var pair of fd.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    fetch(`${BaseUrl}/parkingowner/createparking/`, {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: auth,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Origin': 'parkingyabapi.herokuapp.com',
      },
      body: fd,
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          console.log("everything was ok!");
          history.push("/HomeParkingOwner");
          return res.json();
        }
        throw res;
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "!خطا",
          text: "اطلاعات وارد شده اشتباه است",
          buttons: "بستن",
          icon: "error",
        });
        return;
      });
  };

  //َAdd new parking
  const handleAddParking = (e) => {
    e.preventDefault();
    // console.log("req", location.state.lat, location.state.lng);
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    console.log(location.state.lat, location.state.lng);
    if (location.state.lng === 51.337886 && location.state.lat === 35.699992) {
      swal({
        title: "پیغام!",
        text: "لطفا موقعیت مکانی پارکینگ را روی نقشه انتخاب کنید",
        buttons: "بستن",
        icon: "warning",
      });
    } else {
      var axios = require("axios");
      var FormData = require("form-data");
      var fs = require("fs");
      var data = new FormData();
      data.append("isPrivate", checkbox);
      data.append("parkingName", parkingName);
      data.append("location", parkingAddress);
      data.append("parkingPhoneNumber", parkingPhoneNum);
      data.append("capacity", parkingCapacity);
      data.append("parkingPicture", parkingImage);
      data.append("pricePerHour", pricePerHour);
      data.append("lat", location.state.lat);
      data.append("lng", location.state.lng);

      var config = {
        method: "post",
        url: `${BaseUrl}/parkingowner/createparking/`,
        headers: { "Content-Type": "application/json", Authorization: auth },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("rrrrrrrrrrr", response.data.parkingPicture[0]);
          if (
            response.data.parkingPicture[0] ===
            "The submitted data was not a file. Check the encoding type on the form."
          ) {
            swal({
              title: "پیغام!",
              text: "لطفاً عکس را بارگذاری کنید.",
              buttons: "بستن",
              icon: "error",
            });
          } else {
            swal({
              title: "پیغام!",
              text: "پارکینگ با موفقیت اضافه شد",
              buttons: "بستن",
              icon: "success",
            });
            history.push("/HomeParkingOwner");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //Upload image and preview => Note!: The image is just a preview and must be saved!
  // useEffect(() => {
  //   if (parkingImage) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(parkingImage);
  //   } else {
  //     setPreview(defparking);
  //   }
  // }, [parkingImage]);

  return (
    <div className="c-regpar d-flex justify-content-center align-items-center">
      <div className="two_main_cols2 bg-light  d-flex flex-column flex-lg-row newAlignMent">
        <div>
          <form className="validate-form">
            <br />
            <br />

            <h2 className="login-form-title"> افزودن پارکینگ</h2>
            <br />

            <div className="d-flex">
              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "55%" }}
              >
                <Form.Control
                  id="floatingInputCustom"
                  value={parkingName}
                  onChange={(e) => handleParkingName(e)}
                  className="input100"
                  type="text"
                  name="ParkingName"
                  placeholder="نام پارکینگ"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label14" htmlFor="floatingInputCustom">
                  نام پارکینگ
                </label>
              </Form.Floating>

              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "45%" }}
              >
                <Form.Control
                  id="floatingInputCustom"
                  value={parkingCapacity}
                  onChange={(e) => handleParkingCapacity(e)}
                  className="input100"
                  type="text"
                  name="ParkingCapacity"
                  placeholder="ظرفیت"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label24" htmlFor="floatingInputCustom">
                  ظرفیت
                </label>
              </Form.Floating>
            </div>

            <div className="d-flex">
              <Form.Floating className="soheil_input validate-input">
                <Form.Control
                  id="floatingInputCustom"
                  value={parkingAddress}
                  onChange={(e) => handleParkingAddress(e)}
                  className="input100"
                  type="text"
                  name="ParkingAddress"
                  placeholder="آدرس"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label34" htmlFor="floatingInputCustom">
                  آدرس
                </label>
              </Form.Floating>
            </div>

            <div className="d-flex">
              <Form.Floating className="soheil_input validate-input">
                <Form.Control
                  id="floatingInputCustom"
                  value={parkingPhoneNum}
                  onChange={(e) => handleParkingPhoneNum(e)}
                  className="input100"
                  type="text"
                  name="ParkingPhoneNum"
                  placeholder="شماره تماس"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label44" htmlFor="floatingInputCustom">
                  شماره تماس
                </label>
              </Form.Floating>

              <Form.Floating className="soheil_input validate-input">
                <Form.Control
                  id="floatingInputCustom"
                  value={pricePerHour}
                  onChange={(e) => handleParkingPrice(e)}
                  className="input100"
                  type="text"
                  name="pricePerHour"
                  placeholder="قیمت"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label54" htmlFor="floatingInputCustom">
                  قیمت
                </label>
              </Form.Floating>
              <br />
              <br />
            </div>

            <div class="form-check form-switch mx-auto w-75">
              <input
                value={checkbox}
                onChange={(event) => {
                  if (event.target.checked === true) setCheckbox(true);
                  else setRole(false);
                }}
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                پارکینگ خصوصی
              </label>
            </div>
            <br />

            <div className="d-flex">
              <div className="mb-4">
                <label className="mb-2" style={{ fontFamily: "iransans" }}>
                  افزودن عکس
                </label>
                <input
                  class="form-control form-control-sm"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(e.target.files[0]);
                    setParkingImage(e.target.files[0]);
                  }}
                />
              </div>
              <br />
            </div>
            <ParkingLocation />
            <br />
            <div className="containerButtonGlobal" data-testid="parkingsubmit">
              <button
                onClick={(e) => handleAddParking(e)}
                className="ButtonGlobal"
              >
                ثبت پارکینگ
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterParking;

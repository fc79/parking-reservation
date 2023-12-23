import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import swal from "sweetalert";
import "../css/form.css";
import "../css/EditCar.css";
import "../css/EditParking.css";
import ".././index.css";
import "../css/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defparking from "../images/opalParking.jpg";

import axios from "axios";
import defParkingImg from "../images/parking.jpg";
import Form from "react-bootstrap/Form";

import { BaseUrl } from "../Url";

const EditParking = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const history = useHistory();
  const [idTmp, setIdTmp] = useState();
  let id;
  //Input fields
  const [parkingName, setParkingName] = useState();
  // localStorage.getItem('pName')
  // currentParking.parkingName
  const [parkingCapacity, setParkingCapacity] = useState();
  // localStorage.getItem('pCapacity')
  // currentParking.capacity
  const [parkingAddress, setParkingAddress] = useState();
  // localStorage.getItem('pAddress')
  // currentParking.address
  const [parkingPhoneNum, setParkingPhoneNum] = useState();
  // localStorage.getItem('pPhoneNum')
  // currentParking.number

  const [parkingImage, setParkingImage] = useState();
  // localStorage.getItem('pImage')
  // currentParking.image

  const [pricePerHour, setPricePerHour] = useState();
  // localStorage.getItem('pricePerHour')
  // currentParking.pricePerHour

  const fileInputRef = useRef();

  //Handling the states
  const handleParkingName = (e) => {
    setParkingName(e.target.value);
  };

  const handleParkingCapacity = (e) => {
    setParkingCapacity(e.target.value);
  };

  const handleParkingAddress = (e) => {
    console.log("before req");
    setParkingAddress(e.target.value);
  };

  const handleParkingPhoneNum = (e) => {
    setParkingPhoneNum(e.target.value);
  };

  const handleParkingImg = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setParkingImage(e.target.files[0]);
  };

  const handleParkingPrice = (e) => {
    setPricePerHour(e.target.value);
  };

  useEffect(() => {
    const id2 = localStorage.getItem("pID");
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;

    axios
      .get(`${BaseUrl}/parkingowner/parkingdetail/`, {
        headers: {
          Authorization: auth,
        },
        params: {
          id: id2,
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
        setParkingName(response.data.parkingName);
        setParkingCapacity(response.data.capacity);
        setParkingAddress(response.data.location);
        setParkingPhoneNum(response.data.parkingPhoneNumber);
        setParkingImage(response.data.parkingPicture);
        setPricePerHour(response.data.pricePerHour);
        // id = response.data.id;
        setIdTmp(response.data.id);
      });

    console.log("عکس اصلی:", parkingImage);
    console.log("عکس پیشفرض:", defParkingImg);
    setParkingImage(defParkingImg);
    console.log("قیمت", pricePerHour);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setParkingImage(defParkingImg);
    let token = localStorage.getItem("ptoken"); //ptoken: Parking Owner
    let auth = `Token ${token}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", auth);
    console.log("id3 handle", idTmp);
    var formdata = new FormData();
    formdata.append("id", idTmp);
    formdata.append("parkingName", parkingName);
    formdata.append("location", parkingAddress);
    formdata.append("parkingPhoneNumber", parkingPhoneNum);
    formdata.append("capacity", parkingCapacity);
    formdata.append("parkingPicture", parkingImage);
    formdata.append("pricePerHour", pricePerHour);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/parkingowner/updateparking/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          response.text();
          swal({
            title: "پیغام!",
            text: "پارکینگ با موفقیت ویرایش شد",
            button: "بستن",
            icon: "success",
          });
        } else {
          swal({
            title: "!خطا",
            text: "ویرایش اظلاعات با خطا مواجه شد",
            icon: "error",
            button: "بستن",
          });
        }
      })
      .then((result) => console.log("نتیجه ویرایش", result))
      .catch((error) => console.log("error", error));
  };

  //Delete button
  const handleDelete = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    var data = JSON.stringify({
      id: idTmp,
    });
    let fd = new FormData();
    fd.append("id", idTmp);
    console.log("data delete:", data);
    axios
      .delete(`${BaseUrl}/parkingowner/deleteparking/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
        data: data,
      })
      .then((response) => {
        // console.log("Parking deleted successfully!");
        // console.log(response);
        // swal({
        //   title: "پیغام!",
        //   text: "پارکینگ با موفقیت حذف شد",
        //   buttons: "بستن",
        //   icon: "success",
        // });

        // response.text();
        swal({
          title: "پیغام!",
          text: "پارکینگ با موفقیت حذف شد",
          button: "بستن",
          icon: "success",
        });
        history.push("/HomeParkingOwner");
      })
      .catch((err) => {
        swal({
          title: "!خطا",
          text: "حذف پارکینگ با خطا مواجه شد",
          icon: "error",
          button: "بستن",
        });
      });
  };

  //Return Button
  const handleReturn = (e) => {
    history.push("/HomeParkingOwner");
  };

  return (
    <div className="c-regpar d-flex justify-content-center align-items-center">
      <div className="two_main_cols2 bg-light  d-flex flex-column flex-lg-row newAlignMent">
        <div>
          <form className="validate-form">
            <br />
            <br />

            <h2 className="login-frm-title"> تغییر اطلاعات پارکینگ</h2>
            <br />

            <div className="d-flex">
              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "60%" }}
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
                <label className="soheil-label13" htmlFor="floatingInputCustom">
                  نام پارکینگ
                </label>
              </Form.Floating>

              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "40%" }}
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
                <label className="soheil-label23" htmlFor="floatingInputCustom">
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
                <label className="soheil-label33" htmlFor="floatingInputCustom">
                  آدرس
                </label>
              </Form.Floating>
            </div>

            <div className="d-flex">
              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "60%" }}
              >
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
                <label className="soheil-label43" htmlFor="floatingInputCustom">
                  شماره تماس
                </label>
              </Form.Floating>

              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "40%" }}
              >
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
                <label className="soheil-label53" htmlFor="floatingInputCustom">
                  قیمت
                </label>
              </Form.Floating>

              <br />
            </div>

            <div className="d-flex">
              <div className="mb-4">
                <label className="mb-3" style={{ fontFamily: "iransans" }}>
                  تغییر عکس
                </label>
                <input
                  class="form-control form-control-sm"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    handleParkingImg(e);
                  }}
                />
              </div>
              <br />
            </div>

            <div className="containerButtonGlobal">
              <button onClick={(e) => handleEdit(e)} className="ButtonGlobal">
                ذخیره تغییرات
              </button>
            </div>
            <br />
            <div className="containerButtonGlobal">
              <button
                onClick={(e) => {
                  const confirmBox = window.confirm(
                    "آیا از حذف پارکینگ اطمینان دارید؟"
                  );
                  if (confirmBox === true) {
                    handleDelete(e);
                  }
                }}
                className="ButtonGlobal"
              >
                حذف پارکینگ!
              </button>
            </div>
            <br />

            <div className="containerButtonGlobal">
              <button onClick={(e) => handleReturn(e)} className="ButtonGlobal">
                بازگشت به پنل اصلی
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditParking;

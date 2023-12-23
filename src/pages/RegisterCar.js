import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import mySwal from "sweetalert";
import swal from "sweetalert";
import ".././index.css";
import "../css/form.css";
import "../css/RegisterCar.css";
import "../css/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { BaseUrl } from "../Url";

const RegisterCar = () => {
  const history = useHistory();

  //Input fields
  const [licensePlateID_2, setlicensePlateID_2] = useState();
  const [lpChar, setLPChar] = useState();
  const [lpLeft_2, setLPLeft_2] = useState();
  const [lpRight_3, setLPRight_3] = useState();

  const [carName, setCarName] = useState();
  const [carColor, setCarColor] = useState();

  //Handling the states
  const handleCarName = (e) => {
    setCarName(e.target.value);
  };

  const handleLicensePlate = (e) => {
    setlicensePlateID_2(e.target.value);
  };

  const handleCarColor = (e) => {
    setCarColor(e.target.value);
  };

  const handleLPChar = (e) => {
    setLPChar(e.target.value);
  };

  const handleLPLeft_2 = (e) => {
    setLPLeft_2(e.target.value);
  };

  const handleLPRight_3 = (e) => {
    setLPRight_3(e.target.value);
  };

  const handleMySubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    const fd = new FormData();
    const p = lpLeft_2 + lpChar + lpRight_3 + licensePlateID_2;
    fd.append("carName", carName);
    fd.append("pelak", p);
    fd.append("color", carColor);
    console.log(p);
    const formValues = { carName: carName, pelak: p, color: carColor };
    console.log(formValues);

    fetch(`${BaseUrl}/carowner/carcreate/`, {
      method: "POST",
      headers: {
        Authorization: auth,
        // 'Access-Control-Allow-Origin': 'parkingyabapi.herokuapp.com',
      },
      body: fd,
    })
      .then((res) => {
        if (res.ok) {
          console.log("everything was ok!");
          history.push("/UserPannel");
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

  //=================================================================
  const handleAddCar = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("ctoken"); //ctoken: Car Owner
    let auth = `Token ${token}`;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", auth);

    const p = lpLeft_2 + lpChar + lpRight_3 + licensePlateID_2;
    var formdata = new FormData();
    formdata.append("carName", carName);
    formdata.append("pelak", p);
    formdata.append("color", carColor);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/carowner/carcreate/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        swal({
          title: "پیغام!",
          text: "خودرو با موفقیت اضافه شد",
          buttons: "بستن",
          icon: "success",
        });
        history.push("/UserPannel", { isRefreshed: true });
      })
      .catch((error) => console.log("error", error));
  };

  //const handleAddCar = (e) =>
  // {
  //   e.preventDefault();

  //   let token = localStorage.getItem('ctoken');//ctoken: Car Owner
  //   let auth = `Token ${token}`;

  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", auth);
  //   const p = lpLeft_2 + lpChar + lpRight_3 + licensePlateID_2;

  //   var formdata = new FormData();
  //   formdata.append("carName", carName);
  //   formdata.append("pelak", p);
  //   formdata.append("color", carColor);

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: 'follow'
  //   };

  //   fetch(`${BaseUrl}/carowner/carcreate/`, requestOptions)
  //     .then(response => response.text())
  //     .then(result =>{
  //       mySwal({
  //         title: 'پیغام!',
  //         text: 'خودرو با موفقیت اضافه شد',
  //         buttons: 'بستن',
  //       });
  //       history.push('/UserPannel');
  //     } )
  //     .catch(error => console.log('error', error));
  // };

  //=================================================================

  return (
    <div className="c-regcar d-flex justify-content-center align-items-center ">
      <div className="two_main_cols1 bg-light d-flex flex-column flex-lg-row newAlignMent">
        <div>
          <form className="validate-form">
            <br />
            <br />

            <h2 className="login-form-title"> افزودن خودرو</h2>
            <br />

            <div className="d-flex">
              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "60%" }}
              >
                <Form.Control
                  id="floatingInputCustom"
                  value={carName}
                  onChange={(e) => handleCarName(e)}
                  className="input100"
                  type="text"
                  name="carName"
                  placeholder="نوع خودرو"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label12" htmlFor="floatingInputCustom">
                  نوع خودرو
                </label>
              </Form.Floating>

              <Form.Floating
                className="soheil_input validate-input"
                style={{ width: "40%" }}
              >
                <Form.Control
                  id="floatingInputCustom"
                  value={carColor}
                  onChange={(e) => handleCarColor(e)}
                  className="input100"
                  type="text"
                  name="carColor"
                  placeholder="رنگ"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label22" htmlFor="floatingInputCustom">
                  رنگ
                </label>
              </Form.Floating>
            </div>
            <br />

            <h6 className="myTitle">مشخصات پلاک</h6>

            <div className="d-flex">
              <Form.Floating className="soheil_input validate-input">
                <Form.Control
                  id="floatingInputCustom"
                  value={lpRight_3}
                  onChange={(e) => handleLPRight_3(e)}
                  className="input100"
                  type="text"
                  name="LPRight_3"
                  placeholder="سه رقم راست"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label32" htmlFor="floatingInputCustom">
                  سه رقم راست
                </label>
              </Form.Floating>

              <Form.Floating className="soheil_input validate-input">
                <Form.Control
                  id="floatingInputCustom"
                  value={lpLeft_2}
                  onChange={(e) => handleLPLeft_2(e)}
                  className="input100"
                  type="text"
                  name="LPLeft_2"
                  placeholder="دو رقم چپ"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label42" htmlFor="floatingInputCustom">
                  دو رقم چپ
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
                  value={licensePlateID_2}
                  onChange={(e) => handleLicensePlate(e)}
                  className="input100"
                  type="text"
                  name="licensePlateID_2"
                  placeholder="شناسه (دو رقم)"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 16px 0px #ddd",
                    paddingRight: "24px",
                  }}
                />
                <label className="soheil-label52" htmlFor="floatingInputCustom">
                  شناسه(دورقم)
                </label>
              </Form.Floating>

              <select
                className="plate_class"
                dir="rtl"
                name="LPChar"
                value={lpChar}
                onChange={(e) => handleLPChar(e)}
                style={{ width: "40%" }}
              >
                <option disabled selected>
                  حرف پلاک
                </option>
                <option value="الف">الف</option>
                <option value="ب">ب</option>
                <option value="پ">پ</option>
                <option value="ت">ت</option>
                <option value="ث">ث</option>
                <option value="ج">ج</option>
                <option value="چ">چ</option>
                <option value="ح">ح</option>
                <option value="خ">خ</option>
                <option value="د">د</option>
                <option value="ذ">ذ</option>
                <option value="ر">ر</option>
                <option value="ز">ز</option>
                <option value="ژ">ژ</option>
                <option value="س">س</option>
                <option value="َش">ش</option>
                <option value="ص">ص</option>
                <option value="ض">ض</option>
                <option value="ط">ط</option>
                <option value="ظ">ظ</option>
                <option value="ع">ع</option>
                <option value="غ">غ</option>
                <option value="ف">ف</option>
                <option value="ق">ق</option>
                <option value="ک">ک</option>
                <option value="گ">گ</option>
                <option value="ل">ل</option>
                <option value="م">م</option>
                <option value="ن">ن</option>
                <option value="و">و</option>
                <option value="ه">ه</option>
                <option value="ی">ی</option>
              </select>
            </div>

            <div className="containerButtonGlobal">
              <button data-testid="registerCarButton" className="ButtonGlobal" onClick={(e) => handleAddCar(e)}>
                ثبت خودرو
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCar;

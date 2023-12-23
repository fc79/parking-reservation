import { useState, useEffect, useRef } from "react";
import mySwal from "sweetalert";
import swal from "sweetalert";
import ".././index.css";
import defcar from "./../images/206.jpg";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import "../css/form.css";
import "../css/EditCar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Global.css";
import Form from "react-bootstrap/Form";
//import DeleteConfirmation from '../components/DeleteConfirmation';
import { BaseUrl } from "../Url";

const EditCar = () => {
  //Delete Confirmation
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handle the displaying of the modal
  const showDeleteModal = () => {
    console.log("Modal!!!!!!!!!!!1");
    setDeleteMessage("از حذف خودرو اطمینان دارید؟");
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // // Handle the actual deletion of the item
  // const submitDelete = (type, id) => {
  //   setDisplayConfirmationModal(false);
  // };

  //ُRedirects to the "UserPanel" page
  const history = useHistory();

  //Input fields
  const pelak = localStorage.getItem("carPelak");
  const id = localStorage.getItem("carId");

  const [licensePlateID_2, setlicensePlateID_2] = useState(pelak.slice(6, 8));
  const [lpChar, setLPChar] = useState(pelak.slice(2, 3));
  const [lpLeft_2, setLPLeft_2] = useState(pelak.slice(0, 2));
  const [lpRight_3, setLPRight_3] = useState(pelak.slice(3, 6));

  const [carName, setCarName] = useState(localStorage.getItem("carName"));
  const [carColor, setCarColor] = useState(localStorage.getItem("carColor"));

  const [preview, setPreview] = useState(defcar);

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

  //Edit button
  const handleEdit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("ctoken"); //ctoken: Car Owner
    let auth = `Token ${token}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", auth);
    const p = lpLeft_2 + lpChar + lpRight_3 + licensePlateID_2;

    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("carName", carName);
    formdata.append("pelak", p);
    formdata.append("color", carColor);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/carowner/carupdate/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        swal({
          title: "پیغام!",
          text: "خودرو با موفقیت ویرایش شد",
          buttons: "بستن",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log("error", error);
        swal({
          title: "!خطا",
          text: "ویرایش اطلاعات با خطا مواجه شد",
          icon: "error",
          button: "بستن",
        });
      });
  };

  //Return Button
  const handleReturn = (e) => {
    history.push("/UserPannel");
  };

  return (
    <div className="c-regcar d-flex justify-content-center align-items-center ">
      <div className="two_main_cols1 bg-light d-flex flex-column flex-lg-row newAlignMent">
        <div>
          <form className="validate-form">
            <br />
            <br />

            <h2 className="login-frm-title"> ویرایش اطلاعات خودرو</h2>
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
                    paddingRight: "20px",
                  }}
                  data-testid="car-test"
                />
                <label className="soheil-label1" htmlFor="floatingInputCustom">
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
                  data-testid="color-test"
                />
                <label className="soheil-label2" htmlFor="floatingInputCustom">
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
                    paddingRight: "26px",
                  }}
                  data-testid="pelak1-test"
                />
                <label className="soheil-label3" htmlFor="floatingInputCustom">
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
                  data-testid="pelak2-test"
                />
                <label className="soheil-label4" htmlFor="floatingInputCustom">
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
                  data-testid="pelak3-test"
                />
                <label className="soheil-label5" htmlFor="floatingInputCustom">
                  شناسه(دو رقم)
                </label>
              </Form.Floating>

              <select
                className="plate_class"
                dir="rtl"
                name="LPChar"
                value={lpChar}
                placeholder="حرف پلاک"
                onChange={(e) => handleLPChar(e)}
                style={{ width: "40%" }}
              >
                <option disabled defaultValue>
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
              <button
                onClick={handleEdit}
                className="ButtonGlobal"
                data-testid="submit-btn"
              >
                ذخیره تغییرات
              </button>
            </div>
            <br />
            <div className="containerButtonGlobal">
              <button
                onClick={(e) => handleReturn(e)}
                className="ButtonGlobal"
                data-testid="back-btn"
              >
                بازگشت به پنل اصلی
              </button>
            </div>
            <br />
          </form>
        </div>
        {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} message={deleteMessage}/> */}
      </div>
    </div>
  );
};

export default EditCar;

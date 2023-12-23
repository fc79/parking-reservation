import "../css/Validation.css";
import "../css/Global.css";
import axios from "axios";
import {
  nationalCodeValidation,
  postalCodeValidation,
} from "../functions/validationfun";
import { useState } from "react";
import mySwal from "sweetalert";
import { ParkingValidation } from "../api/validationApi";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";

const Validation = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const history = useHistory();
  // let ParkingLocation = currentParking.address;
  const [nationalCode, setnationalCode] = useState("0");
  const [submitvalue, setSubmitvalue] = useState();
  const [location, setLocation] = useState();
  const [postalCode, setpostalCode] = useState("0");
  const [validationCode, setvalidationCode] = useState(1);
  const [validationFiles, setValidationFiles] = useState(null);
  const handlenationalCode = (e) => {
    setnationalCode(e.target.value);
  };
  const handleFile = (e) => {
    setValidationFiles(e.target.files[0]);
  };
  const handelvalidationCode = (e) => {
    setvalidationCode(parseInt(e.target.value));
  };
  const handelpostalCode = (e) => {
    setpostalCode(e.target.value);
  };
  let ParkingId;
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;

  useEffect(() => {
    const id = localStorage.getItem("pID");
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;

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
        setLocation(response.data.location);
      });
    // setLocation(currentParking.address);
  }, []);

  const handelGoToPanel = (e) => {
    history.push("/Panel");
  };

  const handleMySubmit = (event) => {
    event.preventDefault();
    if (nationalCode.length !== 10 || postalCode.length !== 10) {
      mySwal({
        title: "!خطا",
        text: "کد ملی یا کد پستی اشتباه وارد شده است",
        buttons: "بستن",
        icon: "error",
      });
    } else {
      let ParkingId = currentParking.id;
      let token = localStorage.getItem("ptoken");
      let auth = `Token ${token}`;
      const fd = new FormData();
      fd.append("id", ParkingId);
      fd.append("nationalCode", nationalCode);
      fd.append("validationCode", validationCode);
      fd.append("postalCode", postalCode);
      fd.append("validationFiles", validationFiles);

      // console.log(fd);
      // console.log(nationalCode);

      let axiosConfig = {
        headers: {
          Authorization: auth,
        },
      };
      const body = {
        id: ParkingId,
        nationalCode: nationalCode,
        postalCode: postalCode,
        validationCode: validationCode,
        validationFiles: validationFiles,
      };
      console.log(body);
      axios
        .post(`${BaseUrl}/parkingowner/validation/`, fd, axiosConfig)
        .then((res) => {
          if (
            res.data.validationFiles[0] ==
            "The submitted data was not a file. Check the encoding type on the form."
          ) {
            mySwal({
              title: "پیغام",
              text: "لطفاً عکس را بارگذاری کنید.",
              buttons: "بستن",
              icon: "error",
            });
          } else {
            mySwal({
              title: "عملیات موفق",
              text: "عملیات با موفقیت انجام شد",
              buttons: "بستن",
              icon: "success",
            });
            history.push("Panel");
          }
          throw res;
        })
        .catch((error) => {
          console.log(error);

          return;
        });
    }
  };

  return (
    <div class="MainDivValidation">
      <div
        class="SecondDiv position-absolute top-50 start-50 translate-middle overflow-scroll"
        // style={{ maxHeight: "70%" }}
      >
        <br />
        <h2 class="title">احراز هویت</h2>
        <br />

        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="text"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              // value={password1}
              onChange={(e) => handlenationalCode(e)}
              data-testid="national-test"
            />
            <label for="inputEmail">کد ملی</label>
          </div>
        </form>

        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="text"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              // value={password1}
              data-testid="post-test"
              onChange={(e) => handelpostalCode(e)}
            />
            <label for="inputEmail">کد پستی</label>
          </div>
        </form>

        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="text"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              // value={password1}
              data-testid="code-test"
              onChange={(e) => handelvalidationCode(e)}
            />
            <label for="inputEmail">کد جواز کسب</label>
          </div>
        </form>

        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="text"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
                backgroundColor: "#e6e6e6",
              }}
              value={location}
              contentEditable="false"
              className="InputFieldGlobal"
              disabled="disabled"
            />
            <label for="inputEmail">آدرس</label>
          </div>
        </form>
        <div class="m-2  mx-auto w-75 m-b-25"></div>
        {/* <br /> */}
        <div>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>فایل مستند را اینجا اپلود کنید</Form.Label>
            <Form.Control
              type="file"
              size="md"
              onChange={(e) => handleFile(e)}
              style={{ marginRight: "10%", width: "80%" }}
            />
          </Form.Group>
        </div>
        <div class="col-12 containerButtonGlobal">
          <button
            class="ButtonGlobal m-3"
            onClick={(e) => handleMySubmit(e)}
            data-testid="validation-btn"
          >
            ثبت اطلاعات
          </button>
          <button
            class="ButtonGlobal m-3"
            onClick={handelGoToPanel}
            data-testid="back-btn"
          >
            بازگشت به صفحه قبل
          </button>
        </div>
      </div>
    </div>
  );
};
export default Validation;

import "../css/form.css";
import "../css/EditInfoPage.css";
import "../css/Global.css";
import { useState, useRef, useEffect } from "react";
import mySwal from "sweetalert";
import { validateEmail } from "../functions/loginValidations";
import defprof from "../images/carGif.gif";
import { useHistory } from "react-router";
import backpg from "../images/206.jpg";
import axios from "axios";
import { BaseUrl } from "../Url";
import swal from "sweetalert";
import FilterButton from "../components/FilterButton";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { AiOutlineClose } from "react-icons/ai";
import "./../css/layout.css";
import "./../css/padd.css";
import "./../css/round.css";
import "./../css/light.css";

const EditInfoParkingOwner = () => {
  const [namePlaceHolder, setNamePlaceHolder] = useState("نام");
  const [lastNamePlaceHolder, setLastNamePlaceHolder] =
    useState("نام خانوادگی");
  const [emailPlaceHolder, setEmailPlaceHolder] = useState("ایمیل");
  const [fullName, setFullName] = useState("پروفایل");
  const history = useHistory();
  const [name, SetName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [email, SetEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();

  const fileInputRef = useRef();
  const handleEmailChanged = (e) => {
    SetEmail(e.target.value);
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    if (email === "") {
      SetEmail(emailPlaceHolder);
    }

    if (emailPlaceHolder && validateEmail(email) === false) {
      swal({
        title: "خطا",
        text: "ایمیل وارد شده معتبر نیست",
        buttons: "بستن",
        icon: "error",
      });
    } else {
      let token = localStorage.getItem("ptoken");
      let auth = `Token ${token}`;
      var fd = new FormData();

      if (name === "") {
        fd.append("firstName", null);
      } else {
        fd.append("firstName", name);
      }

      if (lastName === "") {
        fd.append("lastName", null);
      } else {
        fd.append("lastName", lastName);
      }

      fd.append("email", email);
      if (image != null) {
        fd.append("profilePhoto", image);
        console.log("dhdhdh");
      }

      axios
        .put(`${BaseUrl}/users/update/`, fd, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log("post", res.data);

          swal({
            title: "پیغام!",
            text: "ویرایش اطلاعات با موفقیت انجام شد.",
            button: "بستن",
            icon: "success",
          });
        })
        .catch((error) => console.log("e", error));
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("ptoken");
    let auth = `Token ${token}`;
    axios
      .get(`${BaseUrl}/users/rest-auth/user/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log("get", res.data);
        SetEmail(res.data.email);
        if (res.data.firstName === "null") {
          SetName("");
        } else SetName(res.data.firstName);

        if (res.data.lastName === "null") {
          SetLastName("");
        } else SetLastName(res.data.lastName);
        setPreview(res.data.profilePhoto);
      })
      .catch((error) => console.log(error));
  }, []);
  const savePro = () => {
    alert("success");
    <div className="custom-file text-center">
      <input type="file" className="custom-file-input" id="customFile" />
      <label className="custom-file-label" for="customFile">
        Choose file
      </label>
    </div>;
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  });

  return (
    <div className="MainDiv pt-5">
      <div className="SecondDiv shadow-lg p-5 bg-white rounded FormDiv wrapper">
        <div class="text-center">
          <div class="InputFieldGlobal mx-auto w-75 m-b-25 m-3">
            <h3>{fullName}</h3>
          </div>
        </div>
        <div className="flex-container">
          <div className="image ">
            {preview ? (
              <img
                src={preview}
                style={{
                  objectFit: "cover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  border: "none",
                  background: "#cacaca",
                  color: "#000",
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImage(null);
                }}
              />
            ) : (
              <div
                style={{
                  objectFit: "cover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  marginBottom: "23px",

                  border: "1px solid #4800ff",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    objectFit: "cover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",

                    border: "1px solid #4800ff",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setImage(e.target.value[0]);
                    fileInputRef.current.click();
                  }}
                >
                  <button
                    backgroundImage={preview}
                    style={{
                      objectFit: "cover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      border: "none",
                      background: "#cacaca",
                      color: "#000",
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    انتخاب عکس جدید
                  </button>
                </div>
              </div>
            )}
            <input
              style={{ marginBottom: "10px" }}
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.substr(0, 5) === "image") {
                  setImage(file);
                  setPreview(file);
                } else {
                  setImage(null);
                  setPreview(defprof);
                }
              }}
            ></input>
          </div>
          <div className="text-center"></div>
        </div>

        <div class="text-center">
          <div class="InputFieldGlobal mx-auto w-75 m-b-25">
            <input
              value={name}
              type="text"
              className="shadow p-2 mb-4 WarpInputGlobal"
              placeholder={namePlaceHolder}
              onChange={(e) => {
                SetName(e.target.value);
              }}
            />
          </div>
          <br />
          <div class="InputFieldGlobal mx-auto w-75 m-b-25">
            <input
              value={lastName}
              type="text"
              className="shadow p-2 mb-4 WarpInputGlobal"
              placeholder={lastNamePlaceHolder}
              onChange={(e) => {
                SetLastName(e.target.value);
              }}
            />
          </div>
          <br />
          <div class="InputFieldGlobal mx-auto w-75 m-b-25">
            <input
              value={email}
              type="email"
              onChange={(e) => handleEmailChanged(e)}
              className="shadow p-2 mb-4 WarpInputGlobal"
              placeholder={emailPlaceHolder}
            />
          </div>

          <br />

          <br />
          <div class="containerButtonGlobal">
            <Button
              type="submit"
              onClick={(e) => SubmitInfo(e)}
              style={{
                backgroundColor: "#695ce3",
                borderRadius: "20px",
                padding: "8px 5px",
                width: "120px",
              }}
              size="small"
              variant="contained"
            >
              <text className="bold txt-md" style={{ color: "white" }}>
                ویرایش
              </text>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditInfoParkingOwner;

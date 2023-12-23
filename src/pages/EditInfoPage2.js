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
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <Button
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <AiOutlineClose color="black" />
        </Button>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const EditInfoPage2 = () => {
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
  const [credit, setCredit] = useState(0);
  const [showCredit, setShowCredit] = useState(0);

  const fileInputRef = useRef();
  const handleEmailChanged = (e) => {
    SetEmail(e.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCredit = () => {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    console.log("token", auth);

    let amount = credit;
    let setAmount = {
      amount,
    };
    console.log(JSON.stringify(setAmount));
    axios
      .put(`${BaseUrl}/carowner/add-credit/`, JSON.stringify(setAmount), {
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("resssss", response.data.credit);
        setShowCredit(response.data.credit);
        setOpen(false);
        swal({
          title: "پیغام!",
          text: " افزایش موجودی با موفقیت انجام شد",
          button: "بستن",
          icon: "success",
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
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
      let token = localStorage.getItem("ctoken");
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
    let token = localStorage.getItem("ctoken");
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

    axios
      .get(`${BaseUrl}/carowner/detail/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        setShowCredit(res.data.credit);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, [showCredit, credit]);
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

        <div className="text-center">
          <div className="InputFieldGlobal mx-auto w-75 m-b-25">
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
          <div className="InputFieldGlobal mx-auto w-75 m-b-25">
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
          <div
            class="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "30%",
              marginRight: "15%",
              whiteSpace: "nowrap",
            }}
          >
            <div class="col-md-6">
              <div class=" mx-auto w-75 m-b-25">
                <div data-testid="text" style={{ color: "#473e9d" }}>
                  {" "}
                  کیف پول{" "}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class=" mx-auto w-75 m-b-25">
                <div
                  className="font"
                  style={{ color: "#473e9d" }}
                  data-testid="credit-text"
                >
                  {showCredit / 1000} هزار تومان
                </div>
              </div>
            </div>
          </div>

          <br />
          <div style={{ marginTop: "-5%" }}>
            <p
              type="button"
              data-testid="modalButton"
              onClick={handleClickOpen}
            >
              افزایش موجودی
            </p>
            <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              data-testid="modal"
            >
              <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                id="customized-dialog-title"
                onClose={handleClose}
              >
                افزودن موجودی
              </DialogTitle>
              <DialogContent dividers>
                <Typography
                  gutterBottom
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "23px",
                  }}
                >
                  مبلغ موردنظر جهت افزودن موجودی را وارد نمایید.
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  gutterBottom
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      marginBottom: "23px",
                      borderRadius: "25px",

                      border: "1px solid #5ca7ee",
                      width: "300px",
                      height: "60px",

                      // borderRadius: "20%",
                    }}
                    data-testid="credit-clicked"
                    className="font"
                  >
                    {credit / 1000} هزار تومان
                  </div>
                </Typography>

                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  gutterBottom
                ></Typography>

                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  gutterBottom
                >
                  <button
                    style={{
                      borderRadius: "15px",
                      borderColor: "#5ca7ee",
                      marginLeft: "10px",
                    }}
                    data-testid="hj"
                    type="button"
                    class="btn btn-outline"
                    onClick={() => setCredit(10 * 1000)}
                  >
                    ۱۰ هزار تومان{" "}
                  </button>{" "}
                  <button
                    style={{
                      borderRadius: "15px",
                      borderColor: "#5ca7ee",
                      marginLeft: "10px",
                    }}
                    type="button"
                    class="btn btn-outline"
                    onClick={() => setCredit(20 * 1000)}
                  >
                    ۲۰ هزار تومان
                  </button>{" "}
                  <button
                    style={{ borderRadius: "15px", borderColor: "#5ca7ee" }}
                    type="button"
                    class="btn btn-outline"
                    onClick={() => setCredit(50 * 1000)}
                  >
                    ۵۰ هزار تومان{" "}
                  </button>{" "}
                </Typography>
              </DialogContent>
              <DialogActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#695ce3",
                    borderRadius: "20px",
                    padding: "8px 5px",
                    width: "120px",
                    marginLeft: "10px",
                  }}
                  size="small"
                  variant="contained"
                >
                  <text className="bold txt-md" style={{ color: "white" }}>
                    انصراف{" "}
                  </text>
                </Button>

                <Button
                  type="submit"
                  onClick={handleAddCredit}
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
                    افزودن{" "}
                  </text>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <br />
          <div className="containerButtonGlobal">
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
export default EditInfoPage2;

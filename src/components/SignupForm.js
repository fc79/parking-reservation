import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  passResetValidation,
  validateEmail,
} from "../functions/loginValidations";
import { useHistory } from "react-router";

import mySwal from "sweetalert";

// import '../css/formUtill.css';
import "../css/form.css";
///api///
import { register } from "../api/registerApi";
import Form from "react-bootstrap/Form";
import "../css/label.css";
// import Alert from "react-bootstrap/Alert";
// import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";

const SignupForm = () => {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);
  const [open4, setOpen4] = useState(true);
  const [tmp, setTmp] = useState(false);
  const [tmp2, setTmp2] = useState(false);

  useEffect(() => {
    // mySwal({
    //   title: "توجه",
    //   text: "اگر ارائه دهنده خدمات هستید گزینه مربوطه را روشن نمایید",
    //   button: "باشه",
    // });
    // <div>
    //   <Alert show={show} variant="success" fade={false}>
    //     <Alert.Heading>How's it going?!</Alert.Heading>
    //     <p>
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
    //       lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
    //       fermentum.
    //     </p>
    //     <hr />
    //     <div className="d-flex justify-content-end">
    //       <Button onClick={() => setShow(false)} variant="outline-success">
    //         Close me y'all!
    //       </Button>
    //     </div>
    //   </Alert>
    // </div>;
    swal({
      title: "توجه",
      text: "اگر ارائه دهنده خدمات هستید گزینه مربوطه را روشن نمایید",
      icon: "warning",
      button: "باشه",
    }).then(() => {
      swal({
        title: "توجه",
        text: "گذرواژه باید دارای حروف بزرگ و اعدا باشد.",
        icon: "info",
        button: "باشه",
      });
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("C");
  const [checkbox, setCheckbox] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePass1Change = (e) => {
    setPassword1(e.target.value);
  };
  const handlePass2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    setCheckbox(e.target.value);
  };
  const handleRoleChange = (e) => {
    handleCheckboxChange(e);
    if (checkbox === true) setRole("P");
    else setRole("C");
  };

  const handleMySubmit = (e) => {
    e.preventDefault();
    if (
      passResetValidation(password1, password2) === false ||
      validateEmail(email) === false
    ) {
      swal({
        title: "!خطا",
        text: ".اطلاعات وارد شده اشتباه است",
        icon: "error",
        button: "بستن",
      });
      setTmp2(true);
      return;
    } else {
      const info = {
        email: email,
        password1: password1,
        password2: password2,
        role: role,
      };
      console.log(JSON.stringify(info));
      fetch(register.url, {
        credentials: "omit",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'localhost:8000',
        },
        body: JSON.stringify(info),
      })
        .then((res) => {
          if (res.ok) {
            console.log("everything was ok!");
            setTmp(true);
            swal({
              title: "توجه",
              text: "ایمیل حاوی لینک فعال سازی برای شما ارسال شد",
              icon: "success",
              button: "باشه",
            }).then(() => history.push("/"));
            return res.json();
          }
          throw res;
        })
        .catch((error) => {
          console.log(error);
          swal({
            title: "!خطا",
            text: ".اطلاعات وارد شده اشتباه است",
            icon: "error",
            button: "بستن",
          });
          setTmp2(true);
          return;
        });
    }
  };
  return (
    <div>
      <br />
      {/* <Collapse dir="rtl" in={open}>
        <Alert
          dir="rtl"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
              dir="rtl"
            >
              <CloseIcon dir="rtl" fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          اگر ارائه دهنده خدمات هستید گزینه مربوطه را روشن نمایید
        </Alert>
      </Collapse>
      <Collapse dir="rtl" in={open2}>
        <Alert
          dir="rtl"
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen2(false);
              }}
              dir="rtl"
            >
              <CloseIcon dir="rtl" fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          گذرواژه باید دارای حروف بزرگ و اعدا باشد.
        </Alert>
      </Collapse> */}
      {/* <Alert show={show} variant="warning">
        <Alert.Heading>توجه</Alert.Heading>
        <p>اگر ارائه دهنده خدمات هستید گزینه مربوطه را روشن نمایید</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-warning">
            باشه
          </Button>
        </div>
      </Alert> */}
      <form
        className="login100-form validate-form"
        onSubmit={(e) => handleMySubmit(e)}
      >
        <br />
        <br />
        <h2
          className="login100-form-title  p-b-5"
          style={{ marginBottom: "20px" }}
        >
          پارکش کن!
        </h2>
        <br />
        <br />
        <h2
          className="login100-form-title  p-b-5"
          style={{ marginBottom: "20px" }}
        >
          عضویت
        </h2>
        {/* <br /> */}
        <br />
        {/* <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          // type="email"
          placeholder="name@example.com"
          style={{
            borderRadius: "15px",
            boxShadow: "0px 4px 16px 0px #ddd",
            paddingRight: "23px",
          }}
          value={email}
          onChange={(e) => handleEmailChange(e)}
          className="input100"
          type="text"
          name="email"
        />
        <label
          className="label-email-mmd"
          htmlFor="floatingInputCustom"
          // style={{ left: "225px", paddingLeft: "1px" }}
        >
          ایمیل
        </label>
      </Form.Floating> */}
        <form className="form-signin">
          <div className="form-label-group">
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required=""
              autofocus=""
              dir="rtl"
              data-testid="email-test"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            <label for="inputEmail">ایمیل</label>
          </div>
        </form>
        {/* <br /> */}
        {/* <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          style={{
            borderRadius: "15px",
            boxShadow: "0px 4px 16px 0px #ddd",
            paddingRight: "25px",
          }}
          value={password1}
          onChange={(e) => handlePass1Change(e)}
          className="input100"
          type="password"
          name="password1"
        />
        <label
          className="label-pass-mmd-signup"
          htmlFor="floatingPasswordCustom"
          // style={{ left: "196px", paddingLeft: "16px" }}
        >
          رمز عبور
        </label>
      </Form.Floating> */}
        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="password"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              data-testid="password-test"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              value={password1}
              onChange={(e) => handlePass1Change(e)}
            />
            <label for="inputEmail">رمز عبور</label>
          </div>
        </form>
        {/* <br /> */}
        {/* <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          style={{
            borderRadius: "15px",
            boxShadow: "0px 4px 16px 0px #ddd",
            paddingRight: "25px",
          }}
          value={password2}
          onChange={(e) => handlePass2Change(e)}
          className="input100"
          type="password"
          name="password2"
        />
        <label
          className="label-pass-mmd-signup2"
          htmlFor="floatingPasswordCustom"
          style={{ left: "165px", paddingLeft: "16px" }}
        >
          تکرار رمز عبور
        </label>
      </Form.Floating> */}
        <form className="form-signin">
          <div className="form-label-group">
            <input
              id="inputEmail"
              class="form-control"
              type="password"
              placeholder="Password"
              required=""
              autofocus=""
              dir="rtl"
              data-testid="password-test2"
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 16px 0px #ddd",
                paddingRight: "25px",
              }}
              value={password2}
              onChange={(e) => handlePass2Change(e)}
            />
            <label for="inputEmail">تکرار رمز عبور</label>
          </div>
        </form>
        <br />
        <div class="form-check form-switch mx-auto w-75">
          <input
            value={checkbox}
            onChange={(event) => {
              if (event.target.checked === true) setRole("P");
              else setRole("C");
            }}
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">
            ثبت نام به عنوان متصدی پارکینگ
          </label>
        </div>
        <br />
        <br />
        <div className="container-login100-form-btn">
          <button className="login100-form-btn" data-testid="signup-btn">
            ثبت نام
          </button>
        </div>
        <br />
        {/* {tmp != false ? (
          <Collapse dir="rtl" in={open3}>
            <Alert
              dir="rtl"
              severity="success"
              style={{ zIndex: "1000" }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen3(false);
                    history.push("/");
                  }}
                  dir="rtl"
                >
                  <CloseIcon dir="rtl" fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              ایمیل حاوی لینک فعال سازی برای شما ارسال شد
            </Alert>
          </Collapse>
        ) : null}
        {tmp2 != false ? (
          <Collapse dir="rtl" in={open4}>
            <Alert
              dir="rtl"
              severity="error"
              style={{ zIndex: "1000" }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen4(false);
                  }}
                  dir="rtl"
                >
                  <CloseIcon dir="rtl" fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              اطلاعات وارد شده اشتباه است لطفا دوباره وارد کنید
            </Alert>
          </Collapse>
        ) : null} */}
        <br />
        <br />
        <div className="text-center">
          <Link to="/" className="txt2 hov1 h1">
            ورود
          </Link>
        </div>
        <br />
      </form>
    </div>
  );
};

export default SignupForm;

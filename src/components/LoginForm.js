import { Link } from "react-router-dom";
import { useState } from "react";
import {
  passwordValidation,
  validateEmail,
} from "../functions/loginValidations";
import { useHistory } from "react-router";
import mySwal from "sweetalert";
import Button from "@material-ui/core/Button";

///api import///
import { loginApi } from "../api/loginApi";
import Form from "react-bootstrap/Form";
import "../css/label.css";

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");

  const [role, setRole] = useState("C");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePass1Change = (e) => {
    setPassword1(e.target.value);
  };
  const handleMySubmit = (e) => {
    e.preventDefault();
    if (
      passwordValidation(password1) === false ||
      validateEmail(email) === false
    ) {
      mySwal({
        title: "!خطا",
        text: "اطلاعات وارد شده اشتباه است",
        buttons: "بستن",
        icon: "error",
      });
      return;
    } else {
      const info = {
        email: email,
        password: password1,
      };

      console.log(JSON.stringify(info));
      fetch(loginApi.url, {
        credentials: "omit",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'localhost:8000',
        },
        body: JSON.stringify(info),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          console.log("everything was ok!");
          console.log(data);
          setRole(data.role);

          if (data.role == "C") {
            localStorage.setItem("ctoken", data.key);
            history.push("/UserPannel");
          } else if (data.role == "P") {
            localStorage.setItem("ptoken", data.key);
            history.push("/HomeParkingOwner");
          } else if (data.role == "S") {
            localStorage.setItem("stoken", data.key);
            history.push("/HomeSupportPanel");
          }
        })
        .catch((error) => {
          console.log(error);
          mySwal({
            title: "!خطا",
            text: "اطلاعات وارد شده اشتباه است",
            buttons: "بستن",
            icon: "error",
          });
          return;
        });
    }
  };
  return (
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
        ورود
      </h2>
      <br />
      <br />
      {/* <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          style={{
            borderRadius: "15px",
            boxShadow: "0px 4px 16px 0px #ddd",
            paddingRight: "25px",
          }}
          value={email}
          onChange={(e) => handleEmailChange(e)}
          className="input100"
          type="text"
          name="username"
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
            data-testid="email-test"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            //autofocus=""
            dir="rtl"
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
          name="pass"
        />
        <label
          className="label-pass-mmd"
          htmlFor="floatingPasswordCustom"
          style={{ left: "196px" }}
        >
          رمز ورود
        </label>
      </Form.Floating> */}
      <form className="form-signin">
        <div className="form-label-group">
          <input
            id="inputPass"
            className="form-control"
            data-testid="password-test"
            type="password"
            placeholder="Password"
            required=""
            //autofocus=""
            dir="rtl"
            style={{
              borderRadius: "15px",
              boxShadow: "0px 4px 16px 0px #ddd",
              paddingRight: "25px",
            }}
            value={password1}
            onChange={(e) => handlePass1Change(e)}
          />
          <label for="inputPass">رمز ورود</label>
        </div>
      </form>
      <br />

      <div className="container-login100-form-btn">
        <Button
          type="submit"
          data-testid="login-btn"
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
            ورود{" "}
          </text>
        </Button>
      </div>
      <br />
      <br />
      <br />

      <br />
      <div className="text-center">
        <Link to="/Signup" className="txt2 hov1 h1">
          ثبت نام کنید
        </Link>
      </div>
      <br />
    </form>
  );
};

export default LoginForm;

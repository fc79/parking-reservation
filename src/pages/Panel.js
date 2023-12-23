import "../css/panel.css";
import { GiEmptyHourglass } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { TiWarningOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { MdLocalParking } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { AiOutlineBarChart } from "react-icons/ai";
import axios from "axios";
import { render } from "react-dom";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";

const Panel = () => {
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);
  const [submitvalue, setSubmitvalue] = useState(
    localStorage.getItem("pValidationStatus")
  );
  const history = useHistory();
  const validationbuttonchange = (e) => {
    let ParkingId = localStorage.getItem("pID");
    history.push("/ValidationPage", { id: ParkingId });
  };
  /// for validation status ///////////////////
  let ParkingId = localStorage.getItem("pID");
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
  const fd2 = new FormData();

  //for validation status
  useEffect(() => {
    // setSubmitvalue(localStorage.getItem("pValidationStatus"))
    console.log("t", token);

    var axios = require("axios");
    var config = {
      method: "get",
      url: `${BaseUrl}/parkingowner/validation/`,
      params: {
        id: ParkingId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(
          "ValidationStatus for this parking is :",
          response.data.validationStatus
        );
        setSubmitvalue(response.data.validationStatus);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentParking]);
  const [parkingsbtn, setParkingsbtn] = useState([]);
  useEffect(() => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: `${BaseUrl}/parkingowner/parkinglist/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log("myInfo:", response.data.results);
        setParkingsbtn(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // parkingsbtn.map(function (parking) {
  //   localStorage.setItem("pID", parking.id);
  //   localStorage.setItem("pAddress", parking.location);
  //   localStorage.setItem("pName", parking.parkingName);
  //   localStorage.setItem("pPhoneNum", parking.parkingPhoneNumber);
  //   localStorage.setItem("pCapacity", parking.capacity);
  //   localStorage.setItem("pImage", parking.parkingPicture);
  //   localStorage.setItem("pCheckbox", parking.isPrivate);
  // });

  const handleMoveToEdit = (e) => {
    history.push("/EditParking");
  };

  const handleMoveToReserveList = (e) => {
    history.push("/PrkingReserve");
  };

  const handleMoveToReserveTime = (e) => {
    history.push("/ReserveTime");
  };

  const handleMoveToCommentPage = (e) => {
    history.push("/CommentParkingOwner");
  };

  const handleMoveToManualEnterExitPage = (e) => {
    history.push("/ManualEnterExit");
  };
  const handleMoveToChartsPage = (e) => {
    history.push("/Statistic");
  };

  return (
    <div class="MainDivPanel ">
      <div class="container CardDivPanel ">
        <div class="row gap-2 m-5 flex-1 jc-start paddr-7">
          <div class="col-md-4 col-xl-3 nargescardhover ">
            <div class="card nargescard  order-card bg-c-white ">
              {submitvalue === "V" ? (
                <button
                  class="card-block bg-c-white"
                  onClick={validationbuttonchange}
                >
                  <i class="bi bi-align-bottom"></i>
                  <h2>
                    <br />
                  </h2>
                  <TiTick size={40} color="green" className="mb-2" />
                  <h6 class="m-b-20" style={{ color: "black" }}>
                    احراز هویت
                  </h6>
                  <h2>
                    <br />
                  </h2>
                </button>
              ) : submitvalue === "P" ? (
                <button
                  class="card-block bg-c-white"
                  onClick={validationbuttonchange}
                >
                  <i class="bi bi-align-bottom"></i>
                  <h2>
                    <br />
                  </h2>
                  <TiWarningOutline size={40} color="orange" className="mb-2" />
                  <h6 class="m-b-20" style={{ color: "black" }}>
                    احراز هویت
                  </h6>
                  <h2>
                    <br />
                  </h2>
                </button>
              ) : (
                <button
                  class="card-block bg-c-white"
                  onClick={validationbuttonchange}
                >
                  <i class="bi bi-align-bottom"></i>
                  <h2>
                    <br />
                  </h2>
                  <IoClose size={40} color="red" className="mb-2" />
                  <h6 class="m-b-20" style={{ color: "black" }}>
                    احراز هویت
                  </h6>
                  <h2>
                    <br />
                  </h2>
                </button>
              )}
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard order-card bg-c-white">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToEdit(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <MdLocalParking size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  ویرایش اطلاعات پارکینگ
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard bg-c-white order-card">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToReserveList(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <BsCardChecklist size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  لیست رزرو پارکینگ
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard bg-c-white order-card">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToReserveTime(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <BiTimeFive size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  الگو زمانی رزرو پارکینگ
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard bg-c-white order-card">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToCommentPage(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <GoCommentDiscussion size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  نظرات
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard bg-c-white order-card">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToManualEnterExitPage(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <GrAdd size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  ورود و خروج دستی
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard bg-c-white order-card">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToChartsPage(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <AiOutlineBarChart size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  آمار پارکینگ{" "}
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card nargescard bg-c-purple order-card">
              <button class="card-block">
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <GiEmptyHourglass size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  به این بخش چیزی اضافه نشده است{" "}
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card nargescard bg-c-purple order-card">
              <button class="card-block">
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <GiEmptyHourglass size={40} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  به این بخش چیزی اضافه نشده است{" "}
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;

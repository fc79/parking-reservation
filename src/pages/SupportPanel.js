import "../css/panel.css";
import "../css/layout.css"
import "../css/padd.css"
import { GiEmptyHourglass } from "react-icons/gi";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { MdLocalParking } from "react-icons/md";
import axios from "axios";
import { BaseUrl } from "../Url";
import { useContext } from "react";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import { BsCardChecklist } from "react-icons/bs";

const SupportPanel = () => {
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

  const handleMoveToParkings = (e) => {
    history.push("/SupportPanelParkingsPage");
  };

  const handleMoveToAllReserves = (e) => {
    history.push("/SupportPanelAllReservesPage");
  };

  return (
    <div className="MainDivPanel">
      <div class="container CardDivPanel">
        <div class="row gap-2 m-5 flex-1 jc-start paddr-7">
          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard  order-card bg-c-white ">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToParkings(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <MdLocalParking size={58} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                {" "}
                  پارکینگ ها
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover ">
            <div class="card nargescard  order-card bg-c-white ">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToAllReserves(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <BsCardChecklist size={58} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  همه رزرو ها
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

export default SupportPanel;

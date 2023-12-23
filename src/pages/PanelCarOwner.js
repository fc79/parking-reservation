import "../css/panel.css";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiEmptyHourglass } from "react-icons/gi";
import mySwal from "sweetalert";
import swal from "sweetalert";
import { TiTick } from "react-icons/ti";
import { useHistory } from "react-router";
import { BsCardChecklist } from "react-icons/bs";
import { BaseUrl } from "../Url";
const Panel = () => {
  const history = useHistory();
  const validationbuttonchange = (e) => {
    history.push("/ValidationPage", { id: "1" });
  };

  const handleMoveToEditCar = (e) => {
    history.push("/EditCar");
  };

  const handleMoveToReserves = (e) => {
    history.push("/CarOwnerReserves");
  };

  const id = localStorage.getItem("carId");

  const handleDelete = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;

    var axios = require("axios");
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "delete",
      url: `${BaseUrl}/carowner/cardelete/`,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        mySwal({
          title: "پیغام!",
          text: "خودرو با موفقیت حذف شد",
          buttons: "بستن",
          icon: "success",
        });
        history.push("/UserPannel");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="MainDivPanel ">
      <div class="container CardDivPanel">
        <div class="row gap-2 m-5 flex-1 jc-start paddr-6">
          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard order-card bg-c-white">
              <button
                class="card-block bg-c-white"
                onClick={(e) => handleMoveToEditCar(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <TiTick size={58} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  ویرایش اطلاعات خودرو
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>

          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard order-card bg-c-white">
              <button
                class="card-block bg-c-white"
                onClick={(e) => {
                  const confirmBox = window.confirm(
                    "آیا از حذف خودرو اطمینان دارید؟"
                  );
                  if (confirmBox === true) {
                    handleDelete(e);
                  }
                }}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <RiDeleteBin5Line size={58} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  {" "}
                  حذف خودرو
                </h6>
                <h2>
                  <br />
                </h2>
              </button>
            </div>
          </div>
          <div class="col-md-4 col-xl-3 nargescardhover">
            <div class="card nargescard order-card bg-c-white">
              <button
                class="card-block"
                onClick={(e) => handleMoveToReserves(e)}
              >
                <i class="bi bi-align-bottom"></i>
                <h2>
                  <br />
                </h2>
                <BsCardChecklist size={58} color="black" className="mb-2" />
                <h6 class="m-b-20" style={{ color: "black" }}>
                  لیست رزروها
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
export default Panel;

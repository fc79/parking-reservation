import parkingOpal from "../../images/opalParking.jpg";
import "./../../css/Global.css";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import "./../../css/layout.css";
import "./../../css/padd.css";
import ParkingDefault from "../../images/parkingDefault.png";
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../../Url";

const privateStr = "خصوصی";
const publicStr = "عمومی";
const rateStr = "امتیاز";
const ParkingCard = (props) => {
  const { parkings } = props;
  const history = useHistory();
  const [page, setPage] = useState(1);

  function handleReserveButton(item) {
    let token = localStorage.getItem("ctoken");
    let auth = `Token ${token}`;
    var data = JSON.stringify({
      parking_id: item.id,
    });
    console.log("data", data);
    axios
      .post(`${BaseUrl}/carowner/search_click/`, data, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((response) => {
        console.log("handleReserveButton", response);
        history.push("/ParkingPage", {
          id: item.id,
          image: item.parkingPicture,
          capacity: item.capacity,
          rating: item.rating,
          isPrivate: item.isPrivate,
          parkingName: item.parkingName,
          number: item.parkingPhoneNumber,
          location: item.location,
          pricePerHour: item.pricePerHour,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  var firstArray = new Array();
  var seccondArray = new Array();
  var thirdArray = new Array();

  for (let i = 0; i < parkings.length; i++) {
    if (i % 3 === 0) {
      firstArray.push(parkings[i]);
    } else if (i % 3 === 1) {
      seccondArray.push(parkings[i]);
    } else if (i % 3 === 2) {
      thirdArray.push(parkings[i]);
    }
  }

  const renderParkings = (parkingList) => {
    return (
      <div className="col mb-4 h-100 margt-3">
        <div class="">
          {parkingList.map((parkingItem) => {
            return (
              <div className="back-light round-1 padd-1 margb-1 scrollbar-hidden margt-5 shadow">
                {parkingItem.parkingPicture === null ? (
                  <img
                    src={ParkingDefault}
                    class="card-img-top"
                    width="193"
                    height="120"
                  ></img>
                ) : (
                  <img
                    src={parkingItem.parkingPicture}
                    class="card-img-top"
                    width="193"
                    height="120"
                  ></img>
                )}

                <text className="txt-sm bold flex-1 jc-center padd-1">
                  {parkingItem.parkingName}
                </text>
                <div className="flex-1 fd-row ai-start jc-sbet">
                  <h3 className="jc-start txt-sm paddv-05">آدرس </h3>
                  <p
                    className="display-4 flex-container"
                    style={{
                      fontSize: "14px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {parkingItem.location.length > 15
                      ? `${parkingItem.location.substring(0, 15)}...`
                      : parkingItem.location}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3 className="jc-start txt-sm paddv-05">ظرفیت </h3>
                  <p
                    className="txt-xsm"
                    style={{ fontSize: "14px", overflowWrap: "break-word" }}
                  >
                    {parkingItem.capacity}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3 className="jc-start txt-sm paddv-05">تلفن</h3>
                  <p
                    className="txt-xsm"
                    style={{ fontSize: "14px", overflowWrap: "break-word" }}
                  >
                    {parkingItem.parkingPhoneNumber}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3 className="jc-start txt-sm paddv-05">وضعیت</h3>
                  <p
                    className="txt-xsm"
                    style={{ fontSize: "14px", overflowWrap: "break-word" }}
                  >
                    {parkingItem.isPrivate ? privateStr : publicStr}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3 className="jc-start txt-sm">{rateStr}</h3>
                  <Rating
                    name="read-only"
                    value={parkingItem.rating}
                    size="small"
                    readOnly
                  />
                </div>
                <div className="flex-1 ai-end">
                  <text className="txt-xsm paddh-2">{}</text>
                </div>
                <div className="flex-1 jc-center margt-1">
                  <Button
                    onClick={() => handleReserveButton(parkingItem)}
                    style={{
                      backgroundColor: "#695ce3",
                      borderRadius: "20px",
                      padding: "8px 5px",
                      width: "120px",
                    }}
                    size="small"
                    variant="contained"
                    data-testid="reserveButton"
                  >
                    <text className="bold txt-md">رزرو کنید</text>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="row row-cols-1 row-cols-md-4">
      {renderParkings(firstArray)} {renderParkings(seccondArray)}
      {renderParkings(thirdArray)}
    </div>
  );
};

export default ParkingCard;

import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import "leaflet/dist/leaflet.css";
import "../css/ParkingsOverview.css";
import osm from "./osm_provider";
import { BaseUrl } from "../Url";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import "../App.css";
// import image from "../images/one.png";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
// import cities from "../assets/parkingsLoc.json";
import { AiOutlineClose } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import image from "../images/map.png";
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
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {children}
      </Typography>
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
    padding: theme.spacing(10),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const privateStr = "خصوصی";
const publicStr = "عمومی";
const rateStr = "امتیاز";
const ParkingsOverview = (props) => {
  const [parkings, setParkings] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let token = localStorage.getItem("ctoken");
  let auth = `token ${token}`;
  // console.log("token", auth);
  useEffect(() => {
    console.log("insideeeeeeeeeeee");
    axios
      .get(`${BaseUrl}/carowner/parkinglist/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log("responsepppp: ", response);
        setParkings(response.data.results);
      })
      .catch((err) => {
        console.log("errrrrrr", err);
      });
  }, [parkings]);

  const [center, setCenter] = useState({ lat: 35.732668, lng: 51.344894 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [open, setOpen] = useState(false);
  const [parkingDet, setParkingDet] = useState({
    capcity: 1,
    location: "",
    isPrivate: false,
    parkingName: "",
    parkingPhoneNumber: "",
    pricePerHour: 1000,
    parkingPicture: null,
    rating: 0,
  });
  const handleClickOpen = (parking) => {
    console.log("p", parking);
    // axios
    //   .get(`${BaseUrl}/carowner/parkingdetail/?id=${parking.id}`, {
    //     headers: {
    //       Authorization: auth,
    //     },
    //     // params: {
    //     //   id: pId,
    //     // },
    //   })
    //   .then((response) => {
    //     console.log("response: ", response.data);
    //     setOpen(true);
    //     console.log("oprn", open);

    setParkingDet({
      capacity: parking.capacity,
      location: parking.location,
      isPrivate: parking.isPrivate,
      parkingName: parking.parkingName,
      parkingPhoneNumber: parking.parkingPhoneNumber,
      pricePerHour: parking.pricePerHour,
      parkingPicture: parking.parkingPicture,
      rating: parking.rating,
    });
    // });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        class="container pt-4 mt-4"
        style={{
          // marginLeft: "2%",
          marginRight:'22%'
        }}
      >
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              data-testid="modal"
            >
              <DialogTitle
                id="responsive-dialog-title"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // id="customized-dialog-title"
                onClose={handleClose}
              >
                مشخصات پارکینگ{" "}
              </DialogTitle>
              <DialogContent dividers>
                <img src={parkingDet.parkingPicture} class="card-img-top"></img>
                <h5 className=" bold flex-1 jc-center padd-3">
                  {parkingDet.parkingName}
                </h5>
                <div className="flex-1 fd-row ai-start jc-sbet">
                  <h3
                    className="jc-start bold txt-sm paddv-05"
                    style={{
                      fontSize: "18px",
                      overflowWrap: "break-word",
                    }}
                  >
                    آدرس
                  </h3>
                  <p
                    className="display-4 bold flex-container"
                    style={{
                      fontSize: "16px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {parkingDet.location.length > 15
                      ? `${parkingDet.location.substring(0, 15)}...`
                      : parkingDet.location}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3
                    className="jc-start bold txt-sm paddv-05"
                    style={{
                      fontSize: "18px",
                      overflowWrap: "break-word",
                    }}
                  >
                    ظرفیت{" "}
                  </h3>
                  <p
                    className="txt-xsm bold"
                    style={{ fontSize: "16px", overflowWrap: "break-word" }}
                  >
                    {parkingDet.capacity}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3
                    className="jc-start bold txt-sm paddv-05"
                    style={{
                      fontSize: "18px",
                      overflowWrap: "break-word",
                    }}
                  >
                    تلفن
                  </h3>
                  <p
                    className="txt-xsm bold"
                    style={{ fontSize: "16px", overflowWrap: "break-word" }}
                  >
                    {parkingDet.parkingPhoneNumber}
                  </p>
                </div>
                <div className="flex-1 fd-row ai-end jc-sbet">
                  <h3
                    className="jc-start bold txt-sm paddv-05"
                    style={{
                      fontSize: "18px",
                      overflowWrap: "break-word",
                    }}
                  >
                    وضعیت
                  </h3>
                  <p
                    className="txt-xsm bold"
                    style={{ fontSize: "16px", overflowWrap: "break-word" }}
                  >
                    {parkingDet.isPrivate ? privateStr : publicStr}
                  </p>
                </div>
                <div
                  className="fd-row ai-end jc-sbet"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="read-only"
                    value={parkingDet.rating}
                    size="medium"
                    readOnly
                  />
                </div>
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
                  data-testid="closeBonus"
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
                    بستن
                  </text>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div class="col-md-12 jobs_index_middle_panels">
            <div
              class="card h-100"
              style={{
                marginTop: "2%",
                backgroundColor: "rgb(241, 241, 241)",
                borderColor: "rgb(241, 241, 241)",
              }}
            >
              <h5
                class="card-header"
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(241, 241, 241)",
                  // borderColor: "rgb(241, 241, 241)",
                }}
              >
                در این بخش شما می‌توانید مکان تمام پارکینگ‌ها را در سطح کشور
                ببینید.
              </h5>
              <h6
                class="card-title pt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                برای دیدن جزییات بیشتر روی پارکینگ کلیک کنید.
              </h6>
              <div class="card-body  pt-5 pb-1 ">
                {/* <div className="d-flex justify-content map"> */}
                {/* <div className="map"> */}
                <MapContainer
                  center={center}
                  zoom={ZOOM_LEVEL}
                  ref={mapRef}
                  className="leaflet-container"
                >
                  <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                  />
                  {parkings.map((parking, idx) => {
                    let markerHtmlStyles = `
                background-color: red;
                  width: 2rem;
                  height: 2rem;
                  display: block;
                  left: -1.5rem;

                  top: -1.5rem;
                  position: relative;
                  border-radius: 3rem 3rem 0;
                  transform: rotate(45deg);
                  border: 3px solid white`;

                    let markerIcon = new L.icon({
                      // html: `<span style="${markerHtmlStyles}" />`,
                      iconUrl: image,

                      iconSize: [25, 41],
                      iconAnchor: [10, 41],
                      popupAnchor: [2, -40],
                    });

                    return (
                      <Marker
                        position={[parking.lat, parking.lng]}
                        icon={markerIcon}
                        key={idx}
                        eventHandlers={{
                          click: (e) => {
                            handleClickOpen(parking);
                          },
                        }}
                      >
                        {/* <Popup>
                        {/* <b>
                          {city.city}, {city.country}
                        </b> */}
                        {/* </Popup> */}
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParkingsOverview;

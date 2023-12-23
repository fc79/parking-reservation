import "bootstrap/dist/css/bootstrap.min.css";
import ParkingCard from "../components/userpannel/ParkingCard";
import "../css/userpannel/userpannel.css";
import * as React from "react";
import { useState, useEffect } from "react";
import ParkingList from "../components/userpannel/ParkingList";
import AppHeader from "../components/AppHeader";
import "./../css/layout.css";
import "./../css/padd.css";
import image from "./../images/sad.png";
import FilterSearch from "../components/FilterSearch";
import { BaseUrl } from "../Url";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { AiOutlineClose } from "react-icons/ai";
import "./../css/Giftbox.css";
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
const UserPannel = (filterSearch) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filter, setFilter] = useState(false);
  const [value, setValue] = useState([5, 37]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState();
  const [hide, setHide] = useState(false);
  const [credit, setCredit] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
    setMin(newValue[0]);
    setMax(newValue[1]);
  };

  let token = localStorage.getItem("ctoken");
  let auth = `Token ${token}`;

  const [updateMin, setUpdateMin] = useState(0);
  const [updateMax, setUpdateMax] = useState(100);
  const [haveOff, setHaveOff] = useState(false);
  const [haveSpace, setHaveSpace] = useState(0);
  const [ordering, setOrdering] = useState(null);
  const handleHide = (e) => {
    setHide(e);
    if (hide) {
      setFilter(false);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("token", token);
    axios
      .get(`${BaseUrl}/carowner/detail/`, {
        headers: { Authorization: auth },
      })
      .then((res) => {
        console.log("resppppp", res.data);
        if (res.data.reserveCount === 5) {
          setOpen(true);
          let amount = 10;
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
              console.log("rrrrrrr", response.data);

              var fd = new FormData();
              fd.append("credit", response.data.credit);
              fd.append("reserveCount", 0);

              axios
                .put(`${BaseUrl}/carowner/update/`, fd, {
                  headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  console.log("gggg", response);
                })
                .catch((error) => {
                  console.log("e", error);
                });
            })
            .catch((error) => {
              console.log("e", error);
            });
        }
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${BaseUrl}/carowner/get_min_max_price/`, {
        headers: { Authorization: auth },
      })
      .then((res) => {
        console.log("res", res);

        setUpdateMin(res.data[0]);
        setUpdateMax(res.data[1]);
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, [updateMax, updateMin]);

  return (
    <>
      <AppHeader
        search={search}
        setIsSearching={setIsSearching}
        setSearch={setSearch}
        filterSearch={setFilter}
      />
      <div>
        {filter && (
          <FilterSearch
            setPrices={handleChange}
            updateMin={updateMin}
            updateMax={updateMax}
            setHaveOff={setHaveOff}
            setHaveSpace={setHaveSpace}
            setOrdering={setOrdering}
            setHide={handleHide}
          />
        )}
      </div>
      <div>
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
            تبریک!{" "}
          </DialogTitle>
          <DialogContent dividers>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20%",
                fontWeight: "bold",
              }}
            >
              <div class="container" style={{ marginTop: "-10%" }}>
                <div class="row">
                  <div class="col-12  d-flex justify-content-center">
                    <div
                      class="box"
                      style={{
                        animation: "tilt-n-move-shaking 5s",
                        animationIterationCount: "infinite",
                      }}
                    >
                      <div class="box-body" style={{ backgroundColor: "red" }}>
                        <div class="box-lid">
                          <div class="box-bowtie"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                fontWeight: "bold",
                color: "green",
              }}
            >
              تعداد رزروهای شما به عدد ۵ رسیده‌است!{" "}
            </Typography>
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "green",
              }}
            >
              مبلغ ۱۰ هزارتومان به کیف پول شما اضافه شد.
            </Typography>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="ButtonGlobalSmall"
              style={{ marginLeft: "1%" }}
              type="submit"
              onClick={handleClose}
              data-testid="closeBonus"
            >
              بستن{" "}
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="p-lg-5 ">
        {isEmpty && (
          <div
            className="flex flex-column  justify-content-center align-items-center"
            style={{ marginTop: "35vh" }}
          >
            <img
              src={image}
              style={{
                backgroundColor: "#fd0d00",
                borderRadius: "100%",
                marginBottom: "15px",

                height: "200px",
                animation: "shake 2s ",
                animationIterationCount: "-moz-initial",
              }}
            />
            <Typography
              className="top-50"
              style={{ fontSize: "25px", color: "red" }}
            >
              پارکینگی با این مشخصات یافت نشد.
            </Typography>
          </div>
        )}

        <div
          // className="userpannel d-flex flex-column align-items-center"
          className="margr-9"
          style={{ zIndex: "-3" }}
        >
          <ParkingList
            search={search}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            setIsEmpty={setIsEmpty}
            filter={filter}
            setFilter={setFilter}
            min={min}
            max={max}
            haveOff={haveOff}
            haveSpace={haveSpace}
            ordering={ordering}
          />
        </div>
      </div>
    </>
  );
};

export default UserPannel;

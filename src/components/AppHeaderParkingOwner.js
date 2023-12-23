import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import { SwipeableDrawer } from "@mui/material";
import { Avatar } from "@mui/material";
import defpro from "./../images/def.png";
import HomeIcon from "@mui/icons-material/Home";
import "./../css/headAndSide.css";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Collapse from "@mui/material/Collapse";
import KeyIcon from "@mui/icons-material/Key";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { GiHomeGarage } from "react-icons/gi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { BaseUrl } from "../Url";
import styled, { ThemeProvider } from "styled-components";
import { ParkingOwnerContext } from "../ParkingOwnerContext";
import { useContext } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;
const homeString = "خانه";
const Content = styled.div`
  margin: auto;
  max-width: 500px;
`;
const AppHeaderParkingOwner = (props) => {
  const [openmenue, setOpenMenue] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenue((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenue(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenue(false);
    }
  }

  const prevOpen = React.useRef(openmenue);
  React.useEffect(() => {
    if (prevOpen.current === true && openmenue === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openmenue;
  }, [openmenue]);
  const [parkingList, setParkingList, currentParking, setCurrentParking] =
    useContext(ParkingOwnerContext);

  const histo = useHistory();
  const [profilePhoto, setProfilePhoto] = useState(defpro);
  const [email, setEmail] = useState("");
  const [parkings, setParkings] = useState([]);
  const [parkingStyle, setParkingStyle] = useState(false);

  const [open, setOpen] = useState(false);

  const [isHome, setIsHome] = useState(true);
  const [isParkings, setIsParkings] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  let location = useLocation();

  const handleCarOpen = () => {
    setOpen(!open);
  };

  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
  useEffect(() => {
    console.log("here");
    axios
      .get(`${BaseUrl}/users/rest-auth/user/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        console.log("jkjkj", res.data);
        if (res.data.profilePhoto != null) {
          setProfilePhoto(res.data.profilePhoto);
        }
        console.log(res.data.email, "ressss");

        setEmail(res.data.email);
      })
      .catch((e) => {
        console.log("eeeeee", e);
      });

    ///////////
    axios
      .get(`${BaseUrl}/parkingowner/parkinglist/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        //console.log(res.data.results);
        setParkings(res.data.results);
        setParkingList(res.data.results);
        // setCurrentParking({
        //   parkingName: res.data.results[0].parkingName,
        //   address: res.data.results[0].location,
        //   id: res.data.results[0].id,
        //   capacity: res.data.results[0].capacity,
        //   image: res.data.results[0].image,
        //   isPrivate: res.data.results[0].isPrivate,
        //   pricePerHour: res.data.results[0].pricePerHour,
        //   number: res.data.results[0].parkingPhoneNumber,
        // });
        //console.log(cars);
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, [profilePhoto, email, parkingList]);
  useEffect(() => {
    setCurrentParking({
      parkingName: localStorage.getItem("pName"),
      address: localStorage.getItem("pAddress"),
      id: localStorage.getItem("pID"),
      capacity: localStorage.getItem("pCapacity"),
      image: localStorage.getItem("pImage"),
      isPrivate: localStorage.getItem("pCheckbox"),
      pricePerHour: localStorage.getItem("pricePerHour"),
      number: localStorage.getItem("pPhoneNum"),
    });

    if (location.pathname == "/Home") {
      setIsHome(true);
      setIsParkings(false);
      setIsProfile(false);
    } else if (
      location.pathname == "/Panel" ||
      location.pathname == "/ValidationPage" ||
      location.pathname == "/PrkingReserve" ||
      location.pathname == "/CommentParkingOwner" ||
      location.pathname == "/ReserveTime" ||
      location.pathname == "/EditParking"
    ) {
      setIsHome(false);
      setIsParkings(true);
      setIsProfile(false);
    } else if (location.pathname == "/EditInfoPO") {
      setIsHome(false);
      setIsParkings(false);
      setIsProfile(true);
    }
    // data fetch///
    // User Info
  }, [location]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="h-100 border-left-0">
      <div className="headergradient border-left-0" style={{ height: "87px" }}>
        <Typography
          fontSize={25}
          fontWeight="bold"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            paddingTop: "20px",
          }}
        >
          پارکش کن!
          <DriveEtaIcon style={{ margin: "8px 10px 0px 0px" }} />
        </Typography>
      </div>
      <Divider />
      <List className={`${isHome ? "activetab" : ""}`}>
        <ListItem
          button
          onClick={() => {
            histo.push("/HomeParkingOwner");
          }}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          {/* <ListItemText primary={homeString} /> */}

          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {/* <h5>خانه</h5> */}
          <Typography>خانه</Typography>
        </ListItem>
      </List>
      <Divider />
      <List className={`${isParkings ? "activetab" : ""}`}>
        <ListItem button onClick={handleCarOpen}>
          <ListItemIcon>
            <LocalParkingIcon />
          </ListItemIcon>
          <Typography className="ms-2">پارکینگ های من</Typography>
          {open ? (
            <ExpandLess style={{ color: "black" }} />
          ) : (
            <ExpandMore style={{ color: "black" }} />
          )}
        </ListItem>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          className={`${isParkings ? "activetab" : ""}`}
        >
          <List component="div" disablePadding>
            {parkings.map(function (parking) {
              return (
                <ListItem
                  className={`${
                    parking &&
                    currentParking &&
                    parking.parkingName == currentParking.parkingName &&
                    isParkings
                      ? "activenestedtab"
                      : ""
                  }`}
                  button
                  key={parking.id}
                  onClick={() => {
                    localStorage.removeItem("pID");
                    localStorage.removeItem("pAddress");
                    localStorage.removeItem("pName");
                    localStorage.removeItem("pPhoneNum");
                    localStorage.removeItem("pCapacity");
                    localStorage.removeItem("pImage");
                    localStorage.removeItem("pCheckbox");
                    localStorage.removeItem("pricePerHour");
                    localStorage.setItem("pID", parking.id);
                    localStorage.setItem("pAddress", parking.location);
                    localStorage.setItem("pName", parking.parkingName);
                    localStorage.setItem(
                      "pPhoneNum",
                      parking.parkingPhoneNumber
                    );
                    localStorage.setItem("pCapacity", parking.capacity);
                    localStorage.setItem("pImage", parking.parkingPicture);
                    localStorage.setItem("pCheckbox", parking.isPrivate);
                    localStorage.setItem("pricePerHour", parking.pricePerHour);
                    setCurrentParking({
                      parkingName: parking.parkingName,
                      address: parking.location,
                      id: parking.id,
                      capacity: parking.capacity,
                      image: parking.image,
                      isPrivate: parking.isPrivate,
                      pricePerHour: parking.pricePerHour,
                      number: parking.parkingPhoneNumber,
                    });
                    histo.push("/Panel");
                  }}
                >
                  <ListItemIcon>
                    <GiHomeGarage />
                  </ListItemIcon>
                  <Typography>{parking.parkingName}</Typography>
                </ListItem>
              );
            })}
            <ListItem
              button
              onClick={() => {
                histo.push("/RegisterParking");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <Typography>اضافه کردن</Typography>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem
          className={`${isProfile ? "activetab" : ""}`}
          button
          onClick={() => {
            histo.push("/EditInfoPO");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Typography>پروفایل</Typography>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        style={{
          // background:
          //   'linear-gradient(-45deg,#9970ceac,#bf8ffd92,#84a1f9ab,#e7eaf9c7)',
          backgroundColor: "#706bec",
          height: "87px",
        }}
        className="headergradient"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <div
            className="d-flex justify-content-around"
            style={{ marginLeft: "20px" }}
          >
            <div
              style={{
                padding: "35px 0px 0px 0px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {email}
            </div>
            <Button
              ref={anchorRef}
              aria-controls={openmenue ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Content style={{ paddingTop: "19px", marginBottom: "4px" }}>
                <Avatar
                  src={profilePhoto}
                  className="mx-auto"
                  sx={{ width: 45, height: 45, marginBottom: "7px" }}
                />
              </Content>
            </Button>
            <Popper
              open={openmenue}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openmenue}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          {" "}
                          <Typography
                            fontSize={14}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: "5px",
                            }}
                          >
                            {email}
                          </Typography>
                          <Avatar
                            src={profilePhoto}
                            className="mx-auto"
                            sx={{
                              width: 45,
                              height: 45,
                              marginBottom: "7px",
                            }}
                          />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            axios
                              .post(`${BaseUrl}/users/rest-auth/logout/`, {
                                headers: { authorization: auth },
                              })
                              .then((response) => {
                                console.log("logged out!");
                                histo.push("/");
                              });
                          }}
                        >
                          <Typography
                            fontSize={14}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            خروج از سایت
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          {/* <IconButton
            size="large"
            edge="end"
            color="inherit"
            style={{ paddingTop: "5px" }}
          >
            <button
              onClick={() => {
                axios
                  .post(`${BaseUrl}/users/rest-auth/logout/`, {
                    headers: { authorization: auth },
                  })
                  .then((response) => {
                    console.log("logged out!");
                    histo.push("/");
                  });
              }}
              className=" mt-auto "
              style={{
                // backgroundColor: "#422766ac",
                borderRadius: "25px",
                color: "white",
                fontSize: "20px",
                padding: "12px",
              }}
            >
              خروج <ExitToAppIcon className="rotateimg180" />
            </button>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Box
        component="div"
        alignItems="end"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
        borderLeft={0}
        borderColor="red"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SwipeableDrawer
          anchor={"right"}
          SlideProps={{ direction: "left" }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          borderLeft={0}
          borderColor="red"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              alignContent: "flex-start",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          anchor={"right"}
          container={container}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default AppHeaderParkingOwner;

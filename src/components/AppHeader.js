import * as React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CarOwnerContext } from "../CarOwnerContext";
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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import { SwipeableDrawer } from "@mui/material";
import { Avatar } from "@mui/material";
import defpro from "./../images/def.png";
import HomeIcon from "@mui/icons-material/Home";
import "./../css/headAndSide.css";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Collapse from "@mui/material/Collapse";
import KeyIcon from "@mui/icons-material/Key";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import FolderOpenTwoToneIcon from "@mui/icons-material/FolderOpenTwoTone";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import "../css/form.css";
import { BaseUrl } from "../Url";
import styled, { ThemeProvider } from "styled-components";
import FilterSearch from "./FilterSearch";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { HiOutlineLocationMarker } from "react-icons/hi";
const drawerWidth = 220;
const homeString = "خانه";
const Content = styled.div`
  marginleft: 30px;
  max-width: 500px;
`;
const AppHeader = (props) => {
  const [carList, setCarList, currentCar, setCurrentCar] =
    useContext(CarOwnerContext);
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
  const histo = useHistory();
  const [profilePhoto, setProfilePhoto] = useState(defpro);
  const [email, setEmail] = useState("");
  const [cars, setCars] = useState([]);
  const [searchFilter, setSearchFilter] = useState(false);
  const [open, setOpen] = useState(false);

  const [isHome, setIsHome] = useState(true);
  const [isCars, setIsCars] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isReserve, setIsReserve] = useState(false);
  const [isPanel, setIsPanel] = useState(false);
  const [isMap, setIsMap] = useState(false);
  const [isParkingPage, setIsParkingPage] = useState(false);
  const [parkingPageDisplay, setParkingPageDisplay] = useState({
    xs: "flex",
    sm: "flex",
    md: "none",
    alignContent: "flex-start",
  });
  const [parkingPageHideBig, setParkingPageHideBig] = useState({
    xs: "none",
    sm: "none",
    md: "flex",
  });

  let location = useLocation();

  const handleCarOpen = () => {
    setOpen(!open);
  };

  let token = localStorage.getItem("ctoken");
  let auth = `Token ${token}`;
  let permanentDrawer = "permanent";
  useEffect(() => {
    if (location.pathname === "/ParkingPage") {
      setIsParkingPage(true);
      permanentDrawer = "temporary";
      setParkingPageDisplay({ md: "flex" });
      setParkingPageHideBig({ md: "none" });
    } else {
      setIsParkingPage(false);
    }
  }, []);
  useEffect(() => {
    /////////////////////////////// data fetch///
    /////////////////////////////// User Info
    axios
      .get(`${BaseUrl}/users/rest-auth/user/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        // console.log("ressj", res);
        setEmail(res.data.email);

        if (res.data.profilePhoto != null)
          setProfilePhoto(res.data.profilePhoto);
      });

    ///////////
    axios
      .get(`${BaseUrl}/carowner/carlist/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        //console.log(res.data.results);
        setCars(res.data.results);
        setCarList(res.data.results);
        //console.log(cars);
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, [profilePhoto, email, cars]);
  useEffect(() => {
    if (location.pathname == "/UserPannel") {
      setIsHome(true);
      setIsCars(false);
      setIsProfile(false);
      setIsReserve(false);
      setIsMap(false);
    } else if (location.pathname == "/PanelCarOwner") {
      setIsHome(false);
      setIsCars(false);
      setIsPanel(true);
      setIsProfile(false);
      setIsReserve(false);
      setIsMap(false);
    } else if (location.pathname == "/EditInfo") {
      setIsHome(false);
      setIsCars(false);
      setIsProfile(true);
      setIsReserve(false);
      setIsMap(false);
    } else if (location.pathname == "/CarOwnerReserves") {
      setIsReserve(true);
      setIsHome(false);
      setIsCars(false);
      setIsProfile(false);
      setIsMap(false);
    } else if (location.pathname == "/ParkingsOverview") {
      setIsReserve(false);
      setIsHome(false);
      setIsCars(false);
      setIsProfile(false);
      setIsMap(true);
    } else if (location.pathname == "/EditCar") {
      setIsHome(false);
      setIsCars(true);
      setIsPanel(false);
      setIsProfile(false);
      setIsReserve(false);
      setIsMap(false);
    }
  }, [location]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let headerCenter;
  const handleQueryChange = (e) => {
    props.setSearch(e.target.value);
    props.setIsSearching(true);
  };
  const handleFilter = () => {
    setSearchFilter(true);
    props.filterSearch(true);
  };
  if (location.pathname === "/UserPannel") {
    headerCenter = (
      <div
        className="wrap-input100 validate-input mx-auto w-50 m-t-100 m-b-20"
        style={{ backgroundColor: "transparent", borderColor: "black" }}
      >
        <input
          onClickCapture={() => handleFilter()}
          value={props.search}
          onChange={(e) => handleQueryChange(e)}
          className="input100 letssearch"
          type="text"
          name="username"
          data-testid="input"
          placeholder="جستجو..."
          style={{
            height: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        />
        <span className="focus-input100"></span>
      </div>
    );
  } else {
    headerCenter = (
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography>
    );
  }

  const drawer = (
    <div className="h-100 border-left-0">
      <div className="headergradient border-left-0" style={{ height: "89px" }}>
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
            histo.push("/UserPannel");
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
      <List className={`${isCars ? "activetab" : ""}`}>
        <ListItem button onClick={handleCarOpen}>
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <Typography className="ms-2">ماشین های من</Typography>
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
          className={`${isCars ? "activetab" : ""}`}
        >
          <List component="div" disablePadding>
            {cars.map(function (car) {
              return (
                <ListItem
                  className={`${
                    currentCar && car && car.carName == currentCar && isCars
                      ? "activenestedtab"
                      : ""
                  }`}
                  button
                  key={car.id}
                  onClick={() => {
                    localStorage.removeItem("carId");
                    localStorage.removeItem("carName");
                    localStorage.removeItem("carColor");
                    localStorage.removeItem("carPelak");
                    localStorage.setItem("carId", car.id);
                    localStorage.setItem("carName", car.carName);
                    localStorage.setItem("carColor", car.color);
                    localStorage.setItem("carPelak", car.pelak);
                    setCurrentCar(car.carName);
                    histo.push("/PanelCarOwner");
                  }}
                >
                  <ListItemIcon>
                    <DirectionsCarIcon />
                  </ListItemIcon>
                  <Typography>{car.carName}</Typography>
                </ListItem>
              );
            })}
            <ListItem
              button
              onClick={() => {
                histo.push("/RegisterCar");
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
            histo.push("/EditInfo");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Typography>پروفایل</Typography>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem
          className={`${isReserve ? "activetab" : ""}`}
          button
          onClick={() => {
            histo.push("/CarOwnerReserves");
          }}
        >
          <ListItemIcon>
            <CreditScoreIcon />
          </ListItemIcon>
          <Typography>رزروهای من</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          className={`${isMap ? "activetab" : ""}`}
          button
          onClick={() => {
            histo.push("/ParkingsOverview");
          }}
        >
          <ListItemIcon>
            <HiOutlineLocationMarker size={25} />
          </ListItemIcon>
          <Typography>نقشه پارکینگ‌ها</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          className={`${isPanel ? "activetab" : ""}`}
          button
          onClick={() => {
            histo.push("/PanelCarOwner");
          }}
        >
          <ListItemIcon>
            <FolderOpenTwoToneIcon />
          </ListItemIcon>
          <Typography>پنل کاربری</Typography>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  //////////////////////////////////////////////////////////////////////////////////////////

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
          {headerCenter}
          <div
            className="d-flex justify-content-around"
            style={{ marginLeft: "20px" }}
          >
            <div
              // data-testid="email"
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
              <Content style={{ paddingTop: "15px", marginBottom: "4px" }}>
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
                        </MenuItem>
                        <MenuItem onClick={() => histo.push("/EditInfo")}>
                          <Typography
                            fontSize={14}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            کیف پول{" "}
                          </Typography>
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
        {isParkingPage ? (
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
              display: parkingPageDisplay,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </SwipeableDrawer>
        ) : (
          <>
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
                display: parkingPageDisplay,
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
                display: parkingPageHideBig,
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AppHeader;

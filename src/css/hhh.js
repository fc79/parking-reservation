import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";

//All the svg files
import logo from "../assets/logo.svg";
import Home from "../assets/home-solid.svg";
import PowerOff from "../assets/power-off-solid.svg";
import styled from "styled-components";
import parking from "../assets/parking.svg";
import { NavLink } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import { array } from "yup";
import { useHistory } from "react-router";
import { BaseUrl } from "../Url";

// const Container = styled.div`
//   position: fixed;

//   .active {
//     border-right: 4px solid var(--white);

//     img {
//       filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
//         brightness(103%) contrast(103%);
//     }
//   }
// `;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 7px 0 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

// const SidebarContainer = styled.div`
//   background-color: var(--black);
//   width: 3.5rem;
//   height: 80vh;
//   margin-top: 1rem;
//   border-radius: 30px 0 0 30px;
//   padding: 1rem 0;

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;

//   position: absolute;
//   right: 0;
// `;

// const Logo = styled.div`
//   width: 2rem;

//   img {
//     width: 100%;
//     height: auto;
//   }
// `;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5d6d7e;
  // direction: rtl;

  padding: 2rem 0;

  position: absolute;
  top: 6rem;
  right: 0;

  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  // right: ${(props) => (props.clicked ? "0" : "-100%")};
  transition: all 0.5s ease;
  border-radius: 30px 0 0 30px;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1.05rem 0;
  padding-right: 1rem;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Item2 = styled.button`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1.05rem 0;
  padding-right: 1rem;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  direction: rtl;
  // width: ${(props) => (props.clicked ? "100%" : "0")};
  width: 200px;
  overflow: hidden;
  margin-right: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "-14rem" : "3rem")};
  height: 3rem;

  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;
  margin: 0 7px 0 0.7rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};

  background-color: var(--black);
  color: var(--white);

  transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`;

// const Logout = styled.button`
//   border: none;
//   width: 2rem;
//   height: 2rem;
//   background-color: transparent;
//   // padding-left: 3 px;
//   margin: 0 7px 0 0.7rem;
//   img {
//     width: 100%;
//     height: auto;
//     filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
//       brightness(100%) contrast(126%);
//     transition: all 0.3s ease;
//     &:hover {
//       border: none;
//       padding: 0;
//       opacity: 0.5;
//     }
//   }
// `;

const SidebarParkingOwner = () => {
  const history = useHistory();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [ParkingDropdown, setParkingDropdown] = useState(false);
  const handleParkingDropDown = (e) => {
    if (ParkingDropdown === false) {
      setParkingDropdown(true);
    } else {
      setParkingDropdown(false);
    }
  };

  const [HomeTab, setHomeTab] = useState(false);
  const handleSetHomeTab = (e) => {
    if (HomeTab === false) {
      setHomeTab(true);
    } else {
      setHomeTab(false);
    }
  };

  const [profileClick, setprofileClick] = useState(false);
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
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
        console.log("myInfo:", response.data.results);
        setParkingsbtn(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <SlickBar
        className="d-flex justify-content-center flex-column py-5"
        clicked={click}
      >
        <Item
          onClick={() => setClick(false)}
          exact
          activeClassName="active"
          to="/Home"
          className="mb-5"
        >
          <img src={Home} alt="Home" />
          {click ? <Text clicked={handleSetHomeTab}>خانه</Text> : null}
        </Item>

        <Item2
          className="d-flex mb-2"
          activeClassName="active d-flex justify-content-center align-items-center"
          onClick={handleParkingDropDown}
          style={{ justifySelf: "center", alignSelf: "center" }}
        >
          <img src={parking} alt="Car" />
          {click ? (
            <div
              className="justify-content-center align-items-center d-flex"
              style={{ paddingRight: "65px" }}
            >
              <button
                // onClick={handleParkingDropDown}
                style={{ zIndex: "500", color: "white" }}
              >
                <div className="mx-auto">
                  پارکینگ
                  <RiIcons.RiArrowDownSFill style={{ marginRight: "15px" }} />
                </div>
              </button>
              {ParkingDropdown ? (
                <div className="d-flex flex-column justify-content-center">
                  <tbody>
                    {parkingsbtn.map(function (parking) {
                      return (
                        <Item to="/Panel">
                          <button
                            className="div text-light"
                            key={parking.id}
                            onClick={() => {
                              localStorage.setItem("pID", parking.id);
                              localStorage.setItem(
                                "pValidationStatus",
                                parking.validationStatus
                              );

                              localStorage.setItem(
                                "pAddress",
                                parking.location
                              );
                              localStorage.setItem(
                                "pName",
                                parking.parkingName
                              );
                              localStorage.setItem(
                                "pPhoneNum",
                                parking.parkingPhoneNumber
                              );
                              localStorage.setItem(
                                "pCapacity",
                                parking.capacity
                              );
                              localStorage.setItem(
                                "pImage",
                                parking.parkingPicture
                              );
                              localStorage.setItem(
                                "pCheckbox",
                                parking.isPrivate
                              );
                            }}
                            style={{ paddingTop: "15px" }}
                          >
                            {parking.parkingName}
                          </button>
                        </Item>
                      );
                    })}
                  </tbody>
                  <Item
                    onClick={() => setClick(false)}
                    // exact
                    // activeClassName="active"
                    to="/RegisterParking"
                  >
                    <button
                      className="addBtn"
                      style={{
                        paddingTop: "15px",
                        color: "white",
                      }}
                    >
                      اضافه کردن
                    </button>
                  </Item>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })} */}
        </Item2>
      </SlickBar>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

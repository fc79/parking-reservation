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
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
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
import { BaseUrl } from "../Url";
import styled, { ThemeProvider } from "styled-components";

const drawerWidth = 240;
const homeString = "خانه";
const Content = styled.div`
  margin: auto;
  max-width: 500px;
`;
const AppHeaderSupportPanel = (props) => {
  const [openmenue, setOpenMenue] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  let location = useLocation();

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

  let headerCenter;
  const handleQueryChange = (e) => {
    setSearch(e.target.value);
    console.log("searchhh", search);
    setIsSearching(true);
  };
  const handleFilter = () => {
    // setSearchFilter(true);
    // props.filterSearch(true);
  };
  if (location.pathname === "/SupportPanelParkingsPage") {
    headerCenter = (
      <div
        className="wrap-input100 validate-input mx-auto w-50 m-t-100 m-b-20"
        style={{ backgroundColor: "transparent", borderColor: "black", right:'30%', display:'flex' }}
      >
        <input
          // onClickCapture={() => handleFilter()}
          value={search}
          onChange={(e) => handleQueryChange(e)}
          className="input100 letssearch"
          type="text"
          name="username"
          data-testid="input"
          placeholder="جستجو..."
          style={{ height: "50px", color: "white" }}
        />
        <span className="focus-input100"></span>
      </div>
    );
  } else {
    headerCenter = (
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1}}
      ></Typography>
    );
  }

  const histo = useHistory();
  const [profilePhoto, setProfilePhoto] = useState(defpro);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  let token = localStorage.getItem("stoken");
  let auth = `Token ${token}`;

  useEffect(() => {
    axios
      .get(`${BaseUrl}/support/support_detail/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((res) => {
        if (res.data.profilePhoto != null)
          setProfilePhoto(res.data.profilePhoto);
          console.log("ressss");

        setEmail(res.data.email);
      });
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
          پنل پشتیبان
        </Typography>
      </div>
      <Divider />
      <List className={`${isHome ? "activetab" : ""}`}>
        <ListItem
          button
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography>خانه</Typography>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#706bec",
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          
          <div style={{ marginLeft: "20px" }}>
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
            keepMounted: true,
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

export default AppHeaderSupportPanel;

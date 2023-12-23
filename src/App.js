import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPannel from "./pages/UserPannel";
import RegisterCar from "./pages/RegisterCar";
import RegisterParking from "./pages/RegisterParking";
import HomaPO from "./pages/HomePO";
import CommentParkingOwner from "./pages/CommentParkingOwner";
import EditInfoPage2 from "./pages/EditInfoPage2";
import EditCar from "./pages/EditCar";
import EditParking from "./pages/EditParking";
import Panel from "./pages/Panel";
import PanelCarOwner from "./pages/PanelCarOwner";
import Validation2 from "./pages/ValidationPage2";
import ReserveParkingTime from "./pages/ReserveParkingTime";
import ManualEnterExit from "./pages/ManualEnterExit";
import Charts from "./pages/Charts";
import AppHeader from "./components/AppHeader";
import { ThemeProvider } from "@mui/material";
import CustomTheme from "./assets/CustomTheme";
import PrkingReserve from "./pages/ParkingReserve";
import AppHeaderParkingOwner from "./components/AppHeaderParkingOwner";
import ReserveTableCarOwner from "./pages/CarOwnerReserves";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import Reservation from "./pages/Reservation";
import ParkingsOverview from "./pages/ParkingsOverview";

//contexts
import { CarOwnerProvider } from "./CarOwnerContext";
import { ParkingOwnerProvider } from "./ParkingOwnerContext";
import AppHeaderSupportPanel from "./components/AppHeaderSupportPanel";
import SupportPanel from "./pages/SupportPanel";
import SupportPanelParkingsPage from "./pages/SupportPanelParkingsPage";
import SupportPanelReservesPage from "./pages/SupportPanelReservesPage";
import AllReserveSupport from "./pages/AllReserveSupport";
import SupportChat from "./pages/chat/support/SupportChat";
import EditInfoParkingOwner from "./pages/EditinfoParkingOwner";
//contexts

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <StylesProvider jss={jss}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <Route exact path="/Signup">
                <SignupPage />
              </Route>
              {/* ///////////////////////////// */}
              {/* parking owner pages */}
              <ParkingOwnerProvider>
                <CarOwnerProvider>
                  {/* support panel */}
                  <Route exact path="/HomeSupportPanel">
                    <AppHeaderSupportPanel />
                    <SupportPanel />
                  </Route>
                  <Route exact path="/SupportChat">
                    <SupportChat />
                  </Route>

                  <Route exact path="/SupportPanelParkingsPage">
                    <AppHeaderSupportPanel />
                    <SupportPanelParkingsPage />
                  </Route>

                  <Route exact path="/SupportPanelReservesPage">
                    <AppHeaderSupportPanel />
                    <SupportPanelReservesPage />
                  </Route>
                  <Route exact path="/SupportPanelAllReservesPage">
                    <AppHeaderSupportPanel />
                    <AllReserveSupport />
                  </Route>
                  <Route exact path="/HomeParkingOwner">
                    <AppHeaderParkingOwner />
                    <HomaPO />
                  </Route>
                  <Route exact path="/EditInfoPO">
                    <AppHeaderParkingOwner />
                    <EditInfoParkingOwner />
                  </Route>
                  <Route exact path="/EditParking">
                    <AppHeaderParkingOwner />
                    <EditParking />
                  </Route>
                  <Route exact path="/Panel">
                    <AppHeaderParkingOwner />
                    <Panel />
                  </Route>
                  <Route exact path="/ValidationPage">
                    <AppHeaderParkingOwner />
                    <Validation2 />
                  </Route>
                  <Route exact path="/RegisterParking">
                    <AppHeaderParkingOwner />
                    <RegisterParking />
                  </Route>
                  <Route exact path="/PrkingReserve">
                    <AppHeaderParkingOwner />
                    {/* <ManageCapacity /> */}
                    <PrkingReserve />
                  </Route>
                  <Route exact path="/CommentParkingOwner">
                    <AppHeaderParkingOwner />
                    <CommentParkingOwner />
                  </Route>
                  <Route exact path="/ReserveTime">
                    <AppHeaderParkingOwner />
                    {/* <ManageCapacity /> */}
                    <ReserveParkingTime />
                  </Route>
                  <Route exact path="/ManualEnterExit">
                    <AppHeaderParkingOwner />
                    <ManualEnterExit />
                  </Route>
                  <Route exact path="/Statistic">
                    <AppHeaderParkingOwner />
                    <Charts />
                  </Route>

                  {/* /////////////////////////////// */}
                  {/* carowner pages */}

                  <Route exact path="/EditInfo">
                    <AppHeader />
                    <EditInfoPage2 />
                  </Route>
                  <Route exact path="/UserPannel">
                    <AppHeader />
                    <UserPannel />
                  </Route>
                  <Route exact path="/PanelCarOwner">
                    <AppHeader />
                    <PanelCarOwner />
                  </Route>
                  <Route exact path="/EditCar">
                    <AppHeader />
                    <EditCar />
                  </Route>
                  <Route exact path="/RegisterCar">
                    <AppHeader />
                    <RegisterCar />
                  </Route>
                  <Route exact path="/ParkingPage">
                    <AppHeader />
                    <Reservation />
                    {/* <AppHeader />
                <Comments /> */}
                  </Route>
                  <Route exact path="/CarOwnerReserves">
                    <AppHeader />
                    <ReserveTableCarOwner />
                  </Route>
                  <Route exact path="/ParkingsOverview">
                    <AppHeader />
                    <ParkingsOverview />
                  </Route>
                </CarOwnerProvider>
              </ParkingOwnerProvider>
            </Switch>
          </div>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

import "../css/HomePO.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Panel from "./Panel";
import CarComponent from "./Car";
import { BaseUrl } from "../Url";
import SupportPanel from "./SupportPanel";

const HomePO = () => {
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;

  const [len, setLen] = useState(0);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/parkingowner/parkinglist`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((response) => {
        console.log("myInfo:", response.data.results);
        setLen(response.data.count);
        console.log("len: ", len);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [0]);

  return (
    // <div>
    //   <div>{/* <p style={{ height: "250px" }}>Base</p> */}</div>
    //   {/* {len != 0 ? (
    //     <Panel />
    //   ) : (
    //     //<h1 className="Home-PO">Home Page (comming soon...)</h1>
    //     <div
    //       style={{
    //         filter: "blur(3px)",
    //         pointerEvents: "none",
    //       }}
    //     >
    //       <Panel />
    //     </div>
    //   )} */}

    // </div>
    <div
      // style={{
      //   // filter: "blur(3px)",
      //   pointerEvents: "none",
      //   opacity: "0.4",
      // }}
    >
      <Panel />
    </div>
  );
};

export default HomePO;

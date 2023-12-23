import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BaseUrl } from "../Url";
import useFetchParking from "../hooks/useFetchParking";

const SupportPanelParkingsPage = (props) => {
  const history = useHistory();
  const [parkingsList, setParkingsList] = useState([]);

  const handleMoveToReserveList = (parkingId) => {
    console.log("iddddddddddd", parkingId);
    history.push("/SupportPanelReservesPage", {
      id: parkingId,
    });
  };

  // const [parkings, hasMore, count] = useFetchParking()
  // // if (parkings.length === 0) {
  // //   props.setIsEmpty(true);
  // // } else {
  // //   props.setIsEmpty(false);
  // // }

  useEffect(() => {
    let token = localStorage.getItem("stoken");
    let auth = `Token ${token}`;
    axios
      .get(`${BaseUrl}/support/parkinglist/`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        setParkingsList(response.data.results);
        console.log("rrrrrrrrrrr", response.data);
      });
  }, []);

  const renderParkingsTable = () => {
    return parkingsList.map((parking, index) => {
      return (
        <tr
          className="cur-point"
          onClick={() => {
            handleMoveToReserveList(parking.id);
          }}
        >
          <td>{index}</td>
          <td>{parking.parkingName}</td>
          {parking.location.split("").length <= 25 ? (
            <td>{parking.location}</td>
          ) : (
            <td
              data-toggle="tooltip"
              data-placement="bottom"
              title={parking.location}
            >{`${parking.location}...`}</td>
          )}
          <td>{parking.parkingPhoneNumber}</td>
          <td>{parking.capacity}</td>
          <td>{parking.rating}</td>
          <td>{parking.pricePerHour}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="table-mmd">
        <Table responsive className="table-hover">
          <thead className="soheil-table-head">
            <tr>
              <th>ردیف</th>
              <th> نام</th>
              <th>مکان</th>
              <th>شماره تلفن</th>
              <th>ظرفیت</th>
              <th>امتیاز</th>
              <th>قیمت</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderParkingsTable()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default SupportPanelParkingsPage;

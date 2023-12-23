import { useState, useEffect } from "react";
import useFetchParking from "../../hooks/useFetchParking";
import ParkingCard from "./ParkingCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiParkingList } from "../../api/apiList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ParkingList = (props) => {
  const [link, setLink] = useState(apiParkingList);
  const [page, setPage] = useState(1);

  const [parkings, hasMore, count] = useFetchParking(
    page,
    props.search,
    props.min,
    props.max,
    props.filter,
    props.setFilter,
    props.haveOff,
    props.haveSpace,
    props.ordering,
    props.isSearching,
    props.setIsSearching
  );
  if (parkings.length === 0) {
    props.setIsEmpty(true);
  } else {
    props.setIsEmpty(false);
  }

  return (
    // <InfiniteScroll
    //   dataLength={page * 6} // deghat inja manzooresh ine ke be ezaye har chand page i ke load mishe kollan chandta
    //   //data bayad namayesh dade beshe
    //   next={() => {
    //     setPage(page + 1);
    //   }}
    //   // hasMore={hasMore}
    //   loader={
    //     <Loader
    //       type="Oval"
    //       color="#bd59d4"
    //       height={50}
    //       width={50}
    //       timeout={3000}
    //     />
    //   }
    //   style={{ zIndex: "-2", marginTop: "10px" }}
    // >
    <div>
      <ParkingCard parkings={parkings} />
      {count / 6 > page ? (
        <button onClick={() => setPage(page + 1)}>بیشتر</button>
      ) : (
        ""
      )}
    </div>

    // {/* </InfiniteScroll> */}
  );
};

export default ParkingList;

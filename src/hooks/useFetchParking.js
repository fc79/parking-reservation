import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../Url";

export default function useFetchParking(
  page,
  search,
  min,
  max,
  filter,
  setFilter,
  haveOff,
  haveSpace,
  ordering,
  isSearching,
  setIsSearching
) {
  const [parkings, setParkings] = useState([]);
  const [count, setCount] = useState(1);
  const [data, setData] = useState({});
  const [hasMore, setHasMore] = useState(true);

  let token = localStorage.getItem("ctoken");
  let auth = `Token ${token}`;

  // console.log("offfffff", haveOff);
  console.log("spaceeee", haveSpace);
  // console.log("orderingggggg", ordering);

  useEffect(() => {
    if (max === undefined) {
      max = 100 * 1000;
    }
    if (isSearching) {
      setParkings([]);
    }
    if (filter) {
      setParkings([]);
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", filter);
    }

    axios
      .get(`${BaseUrl}/carowner/parkingsearch/`, {
        headers: { "Content-Type": "application/json", Authorization: auth },
        params: {
          page: page,
          search: search,
          min_price: min * 1000,
          max_price: max * 1000,
          has_capacity: haveSpace,
          ordering: ordering,
        },
      })
      .then((res) => {
        console.log("ressssssss", res);
        setParkings((prevState) => [...prevState, ...res.data.results]);
        setIsSearching(false);
        setFilter(false);
        setCount(res.data.count);
        if (res.data.next === null) setHasMore(false);
      })
      .catch((e) => {
        console.log("error occured in fetch");
      });
  }, [page, search, min, max]);

  return [parkings, hasMore, count];
}

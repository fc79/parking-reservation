import {
  screen,
  cleanup,
  getByTestId,
  getByRole,
} from "@testing-library/react";
import EditInfoPage2 from "../EditInfoPage2";
import { getByText, getByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react-hooks";
import expect from "expect";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Router } from "react-router-dom";

import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { BaseUrl } from "../../Url";
import axios from "axios";
import RegisterParking from "../RegisterParking";
import { createMemoryHistory } from "history";
let token = localStorage.getItem("ptoken");
let auth = `Token ${token}`;

describe("Register parking component test", () => {
  const history = createMemoryHistory();
  it("render router", async () => {
    render(
      <Router history={history}>
        <RegisterParking />
      </Router>
    );
  });

  it("render title", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <h2>افزودن پارکینگ</h2>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("افزودن پارکینگ")).toBeTruthy();
  });
  it("render details name", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>نام پارکینگ</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("نام پارکینگ")).toBeTruthy();
  });
  it("render details capacity", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>ظرفیت</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("ظرفیت")).toBeTruthy();
  });
  it("render details address", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>آدرس</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("آدرس")).toBeTruthy();
  });
  it("render details phone", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>شماره تماس</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("شماره تماس")).toBeTruthy();
  });
  it("render details price", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>قیمت</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("قیمت")).toBeTruthy();
  });
  it("render details private", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>پارکینگ خصوصی</label>
        </RegisterParking>
      </Router>
    );
    // Assert
    expect(getByText("پارکینگ خصوصی")).toBeTruthy();
  });
  it("render details pic", async () => {
    // Act
    const { getByText } = render(
      <Router history={history}>
        <RegisterParking>
          <label>افزودن عکس</label>
        </RegisterParking>
      </Router>
    );
    expect(getByText("افزودن عکس")).toBeTruthy();
  });
});

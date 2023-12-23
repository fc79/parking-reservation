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
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import UserPannel from "../UserPannel";
import parkingsOverview from "../ParkingsOverview";
import { BaseUrl } from "../../Url";
import axios from "axios";
let token = localStorage.getItem("ptoken");
let auth = `Token ${token}`;
describe("Map overview component test", () => {
  it("render title of page", async () => {
    const { getByText } = render(
      <parkingsOverview>
        <h5>
          در این بخش شما می‌توانید مکان تمام پارکینگ‌ها را در سطح کشور ببینید.
        </h5>
      </parkingsOverview>
    );
    // Assert
    expect(
      getByText(
        "در این بخش شما می‌توانید مکان تمام پارکینگ‌ها را در سطح کشور ببینید."
      )
    ).toBeTruthy();
  });
  it("render subtitle", async () => {
    // Act
    const { getByText } = render(
      <parkingsOverview>
        <h6>برای دیدن جزییات بیشتر روی پارکینگ کلیک کنید.</h6>
      </parkingsOverview>
    );
    // Assert
    expect(
      getByText("برای دیدن جزییات بیشتر روی پارکینگ کلیک کنید.")
    ).toBeTruthy();
  });
});

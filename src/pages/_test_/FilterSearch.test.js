import {
  screen,
  cleanup,
  getByTestId,
  getByRole,
} from "@testing-library/react";
import { getByText, getByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react-hooks";
import expect from "expect";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import UserPannel from "../UserPannel";
import FilterSearch from "../../components/FilterSearch";
import { BaseUrl } from "../../Url";
import axios from "axios";
let token = localStorage.getItem("ptoken");
let auth = `Token ${token}`;

describe("filtersearch component test", () => {
  it("render title", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <h3>فیلترها</h3>
      </FilterSearch>
    );
    // Assert
    expect(getByText("فیلترها")).toBeTruthy();
  });
  it("render last search", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <div>آخرین جستجوهای شما</div>
      </FilterSearch>
    );
    // Assert
    expect(getByText("آخرین جستجوهای شما")).toBeTruthy();
  });
  it("render popular", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <div>جستجوهای پرطرفدار</div>
      </FilterSearch>
    );
    // Assert
    expect(getByText("جستجوهای پرطرفدار")).toBeTruthy();
  });
  it("render ordering", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <div>مرتب سازی بر اساس ...</div>
      </FilterSearch>
    );
    // Assert
    expect(getByText("مرتب سازی بر اساس ...")).toBeTruthy();
  });
  it("render sale", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <div>پارکینگ‌های تخفیف دار</div>
      </FilterSearch>
    );
    // Assert
    expect(getByText("پارکینگ‌های تخفیف دار")).toBeTruthy();
  });
  it("render space", async () => {
    // Act
    const { getByText } = render(
      <FilterSearch>
        <div>ظرفیت خالی</div>
      </FilterSearch>
    );
    // Assert
    expect(getByText("ظرفیت خالی")).toBeTruthy();
  });
  it("render range price", async () => {
    // Act
    const min = 2000;
    const max = 4000;
    const { getByTestId } = render(
      <FilterSearch>
        <div>
          قیمت از {min} تا {max}تومان
        </div>
      </FilterSearch>
    );
    // Assert
    expect(getByTestId("range")).toBeTruthy();
  });
});

import {
    screen,
    cleanup,
    getByTestId,
    getByRole,
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
  import expect from "expect";
  import React, { useEffect } from "react";
  import { Router } from "react-router-dom";
  import { render, fireEvent } from "@testing-library/react";
  import { createMemoryHistory } from "history";
import RegisterCar from "../RegisterCar";
  let token = localStorage.getItem("ptoken");
  let auth = `Token ${token}`;
  
  describe("Register car component test", () => {
    const history = createMemoryHistory();
    it("render router", async () => {
      render(
        <Router history={history}>
          <RegisterCar />
        </Router>
      );
    });
  
    it("render title", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <h2>افزودن خودرو</h2>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("افزودن خودرو")).toBeTruthy();
    });
    it("render details name", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <label> خودرو</label>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("نوع خودرو")).toBeTruthy();
    });
    it("render details color", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <label>رنگ</label>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("رنگ")).toBeTruthy();
    });
    it("render details pelak", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <label>مشخصات پلاک</label>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("مشخصات پلاک")).toBeTruthy();
    });
    it("render details 3numbers of pelak", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <label>سه رقم راست</label>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("سه رقم راست")).toBeTruthy();
    });
    it("render details 2numbers of pelak", async () => {
        // Act
        const { getByText } = render(
          <Router history={history}>
            <RegisterCar>
              <label>دو رقم چپ</label>
            </RegisterCar>
          </Router>
        );
        // Assert
        expect(getByText("دو رقم چپ")).toBeTruthy();
      });
      it("render details shenase", async () => {
        // Act
        const { getByText } = render(
          <Router history={history}>
            <RegisterCar>
              <label>شناسه(دورقم)</label>
            </RegisterCar>
          </Router>
        );
        // Assert
        expect(getByText("شناسه(دورقم)")).toBeTruthy();
      });
    it("render details alphabet", async () => {
      // Act
      const { getByText } = render(
        <Router history={history}>
          <RegisterCar>
            <label>حرف پلاک</label>
          </RegisterCar>
        </Router>
      );
      // Assert
      expect(getByText("حرف پلاک")).toBeTruthy();
    });
    it("render add registerCar button", async () => {
        // render your component
        let count = 10;
        render(<RegisterCar />);
        const button = screen.getByTestId("registerCarButton");
        // expect(button).toBeInTheDocument();
        expect(button.textContent).toBe("ثبت خودرو");
    
        fireEvent.click(button);
        expect(count).toBe(10);
      });
  });
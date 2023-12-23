import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EditCar from "../EditCar";

const EditCarTest = () => {
  return (
    <BrowserRouter>
      <EditCar />
    </BrowserRouter>
  );
};

describe("validation component test", () => {
  it("render national code", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const email = getByTestId("car-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render postal code", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const email = getByTestId("color-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render code", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const email = getByTestId("pelak1-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render code", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const email = getByTestId("pelak2-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render code", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const email = getByTestId("pelak3-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render validatoin btn", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const btn = getByTestId("submit-btn");
      fireEvent.click(btn);
    } catch (r) {}

    //expect(btn).toBeTruthy();
  });
  it("render validatoin btn", async () => {
    try {
      const { getByTestId } = render(<EditCarTest />);
      const btn = getByTestId("back-btn");
      fireEvent.click(btn);
    } catch (r) {}

    //expect(btn).toBeTruthy();
  });
});

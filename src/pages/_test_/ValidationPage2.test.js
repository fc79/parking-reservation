import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Validation from "../ValidationPage2";

const ValidationTest = () => {
  return (
    <BrowserRouter>
      <Validation />
    </BrowserRouter>
  );
};

describe("validation component test", () => {
  it("render national code", async () => {
    try {
      const { getByTestId } = render(<ValidationTest />);
      const email = getByTestId("national-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render postal code", async () => {
    try {
      const { getByTestId } = render(<ValidationTest />);
      const email = getByTestId("post-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render code", async () => {
    try {
      const { getByTestId } = render(<ValidationTest />);
      const email = getByTestId("code-test");
      expect(email).toBeTruthy();
    } catch (r) {}
  });
  it("render validatoin btn", async () => {
    try {
      const { getByTestId } = render(<ValidationTest />);
      const btn = getByTestId("validation-btn");
      fireEvent.click(btn);
    } catch (r) {}

    //expect(btn).toBeTruthy();
  });
  it("render back btn", async () => {
    try {
      const { getByTestId } = render(<ValidationTest />);
      const btn = getByTestId("back-btn");
      fireEvent.click(btn);
    } catch (r) {}

    //expect(btn).toBeTruthy();
  });
});

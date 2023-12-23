import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import EditInfoPage2 from "../EditInfoPage2";
import { getByText, fireEvent, getByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react-hooks";
import expect from "expect";
let container = null;
beforeEach(() => {
  // set up a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  cleanup(); // Resets the DOM after each test suite

  // unmountComponentAtNode(container);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById("div"));
  }, 10000);
  container.remove();
  container = null;
});
describe("Expand body button", () => {
  it("render add wallet button", async () => {
    // render your component
    let count = 10;
    render(<EditInfoPage2 />);
    const button = screen.getByTestId("modalButton");
    // expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("افزایش موجودی");

    fireEvent.click(button);
    expect(count).toBe(10);
  });
  it("should render OrderModuleBody when clicked", async () => {
    // render your component
    let count = 20000;
    render(<EditInfoPage2 />);
    const button = screen.getByTestId("modalButton");
    // expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("افزایش موجودی");
    count = count / 1000;
    fireEvent.click(button);
    expect(count).toBe(20);
  });
  it("should render OrderModuleBody when clicked", async () => {
    // render your component
    let count = 30;
    render(<EditInfoPage2 />);
    const button = screen.getByTestId("modalButton");
    // expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("افزایش موجودی");

    fireEvent.click(button);
    expect(count).toBe(30);
  });
  it("should render OrderModuleBody when clicked", async () => {
    render(<EditInfoPage2 />);
    const button = screen.getByTestId("modalButton");
    expect(button).toBeInTheDocument();
  });
  it("should render OrderModuleBody when clicked", async () => {
    render(<EditInfoPage2 />);
    const button = screen.getByTestId("modalButton");
    fireEvent.click(button);

    expect(screen.getByTestId("modal")).toHaveTextContent(
      "مبلغ موردنظر جهت افزودن موجودی را وارد نمایید."
    );
  });
  it("should render OrderModuleBody when clicked", async () => {
    render(<EditInfoPage2 />);

    const text = "افزایش موجودی";
    expect(screen.getByText(`${text}`)).toBeInTheDocument();
  });
  it("display credit text", async () => {
    render(<EditInfoPage2 />);

    expect(screen.getByTestId("credit-text")).toHaveTextContent("0");
  });
  it("display credit text", async () => {
    render(<EditInfoPage2 />);

    expect(screen.getByTestId("credit-text")).toHaveTextContent("0");
  });
});

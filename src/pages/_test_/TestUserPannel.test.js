import { screen, cleanup } from "@testing-library/react";
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

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  });

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

test("modal shows the children and a close button", () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  const { getByText } = render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>
  );
  // Assert
  expect(getByText("test")).toBeTruthy();

  // Act
  fireEvent.click(getByText(/close/i));

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
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
// it("should render the Notification component if state.error is true", () => {
//   const loginComponent = render(<UserPannel />);
//   loginComponent.setOpen(true);
//   expect(loginComponent.getElementById("closeBonus")).toBeTruthy();

it("render modal", async () => {
  // Act
  const { getByText } = render(
    <EditInfoPage2>
      <div>ویرایش</div>
    </EditInfoPage2>
  );
  // Assert
  expect(getByText("ویرایش")).toBeTruthy();
});
it("render modal", async () => {
  // Act
  const { getByText } = render(
    <EditInfoPage2>
      <h3>پروفایل</h3>
    </EditInfoPage2>
  );
  // Assert
  expect(getByText("پروفایل")).toBeTruthy();
});
it("render modal", async () => {
  // Act
  const { getByText } = render(
    <EditInfoPage2>
      <button>انتخاب عکس جدید</button>
    </EditInfoPage2>
  );
  // Assert
  expect(getByText("انتخاب عکس جدید")).toBeTruthy();
});

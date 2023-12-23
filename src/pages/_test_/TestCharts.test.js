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
import Charts from "../Charts";
import { BaseUrl } from "../../Url";
import axios from "axios";
let token = localStorage.getItem("ptoken");
let auth = `Token ${token}`;
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

// describe("modal shows the children and a close button", () => {
//   // Arrange
//   const handleClose = jest.fn();

//   // Act
//   const { getByText } = render(
//     <Modal onClose={handleClose}>
//       <div>test</div>
//     </Modal>
//   );
//   // Assert
//   expect(getByText("test")).toBeTruthy();

//   // Act
//   fireEvent.click(getByText(/close/i));

//   // Assert
//   expect(handleClose).toHaveBeenCalledTimes(1);
// });
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
describe("Chart component test", () => {
  it("render title", async () => {
    // Act
    const { getByText } = render(
      <Charts>
        <div>آمارها</div>
      </Charts>
    );
    // Assert
    expect(getByText("آمارها")).toBeTruthy();
  });
  it("render daily", async () => {
    // Act
    const { getByText } = render(
      <Charts>
        <div>روزانه</div>
      </Charts>
    );
    // Assert
    expect(getByText("روزانه")).toBeTruthy();
  });
  it("render weekly", async () => {
    // Act
    const { getByText } = render(
      <Charts>
        <div>هفتگی</div>
      </Charts>
    );
    // Assert
    expect(getByText("هفتگی")).toBeTruthy();
  });
  it("render monthly", async () => {
    // Act
    const { getByText } = render(
      <Charts>
        <div>ماهانه</div>
      </Charts>
    );
    // Assert
    expect(getByText("ماهانه")).toBeTruthy();
  });
  it("render yearly", async () => {
    // Act
    const { getByText } = render(
      <Charts>
        <div>سالانه</div>
      </Charts>
    );
    // Assert
    expect(getByText("سالانه")).toBeTruthy();
  });
  //   it("axios spy and rendering test id 1", async () => {
  //     const spyAxios = jest.spyOn(axios, "get");
  //     render(<Charts />);
  //     let parkingId = 1;
  //     expect(spyAxios).toHaveBeenNthCalledWith(
  //       11,
  //       `${BaseUrl}/carowner/cancel/?`,
  //       {
  //         headers: { Authorization: auth, "Content-Type": "application/json" },
  //         params: { interval: "day", parkingId: parkingId },
  //       }
  //     );
  //   });
});

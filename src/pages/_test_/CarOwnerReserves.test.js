import { render, fireEvent, queryByAttribute } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReserveTableCarOwner from "../CarOwnerReserves";

const LoginTest = () => {
  return (
    <BrowserRouter>
      <ReserveTableCarOwner />
    </BrowserRouter>
  );
};

describe("Reserve cancellation test", () => {
  it("render main btn", async () => {
    const getByTestId = render(<LoginTest />);
    const getById = queryByAttribute.bind(null, "id");
    const table = getById(getByTestId.container, "cancell-btn-test");
  });
  it("cancell modal btn", async () => {
    const getByTestId = render(<LoginTest />);
    const getById = queryByAttribute.bind(null, "id");
    const table = getById(getByTestId.container, "cancell-modal-btn-test");
  });
  it("reserve cancellation btn", async () => {
    const getByTestId = render(<LoginTest />);
    const getById = queryByAttribute.bind(null, "id");
    const table = getById(getByTestId.container, "cancell-reserve-btn-test");
  });
});

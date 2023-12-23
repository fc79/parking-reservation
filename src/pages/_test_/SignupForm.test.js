import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../../components/SignupForm";

const SignupTest = () => {
  return (
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
};

describe("Login component test", () => {
  it("render email", async () => {
    const { getByTestId } = render(<SignupTest />);
    const email = getByTestId("email-test");
    expect(email).toBeTruthy();
  });
  it("render password", async () => {
    const { getByTestId } = render(<SignupTest />);
    const password = getByTestId("password-test");
    expect(password).toBeTruthy();
  });
  it("render password2", async () => {
    const { getByTestId } = render(<SignupTest />);
    const password = getByTestId("password-test2");
    expect(password).toBeTruthy();
  });
  it("render btn", async () => {
    const { getByTestId } = render(<SignupTest />);
    const btn = getByTestId("signup-btn");
    fireEvent.click(btn);
    //expect(btn).toBeTruthy();
  });
});

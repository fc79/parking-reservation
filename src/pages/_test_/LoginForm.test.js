import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const LoginTest = () => {
  return (
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

describe("Login component test", () => {
  it("render email", async () => {
    const { getByTestId } = render(<LoginTest />);
    const email = getByTestId("email-test");
    expect(email).toBeTruthy();
  });
  it("render password", async () => {
    const { getByTestId } = render(<LoginTest />);
    const password = getByTestId("password-test");
    expect(password).toBeTruthy();
  });
  it("render btn", async () => {
    const { getByTestId } = render(<LoginTest />);
    const btn = getByTestId("login-btn");
    fireEvent.click(btn);
    //expect(btn).toBeTruthy();
  });
});

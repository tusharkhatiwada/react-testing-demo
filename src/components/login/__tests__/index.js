import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import axiosMock from "axios";
import Login from "../index";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// jest.mock("axios");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test("allows the user to login sucessfully", async () => {
  axiosMock.post.mockResolvedValueOnce({
    status: 200,
  });
  const url = "/login_check";
  render(<Login />);

  fireEvent.change(screen.getByTestId("username"), {
    target: { value: "test1" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "123q45" },
  });
  fireEvent.click(screen.getByTestId("login"));

  expect(axiosMock.post).toHaveBeenCalledTimes(1);

  // expect(axiosMock.post).toHaveBeenCalledWith(url);
  // expect(getByTestId("login")).toHaveAttribute("disabled");
});

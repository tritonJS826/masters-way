import React from "react";
import {render} from "@testing-library/react";
import {Input} from "./Input";

test("renders Input component", () => {
  const {getByPlaceholderText} = render(<Input placeholder="Test Placeholder" />);
  const inputElement = getByPlaceholderText("Test Placeholder");
  expect(inputElement).toBeInTheDocument();
});


test("renders Input component with default props", () => {
  const {getByPlaceholderText} = render(<Input />);
  const inputElement = getByPlaceholderText("");
  expect(inputElement).toBeInTheDocument();
});

test("renders Input component with custom class name", () => {
  const {container} = render(<Input className="custom-class" />);
  const inputElement = container.querySelector(".custom-class");
  expect(inputElement).toBeInTheDocument();
});

test("renders Input component as disabled", () => {
  const {getByPlaceholderText} = render(<Input placeholder="Test Placeholder"
    disabled
  />);
  const inputElement = getByPlaceholderText("Test Placeholder");
  expect(inputElement).toBeDisabled();
});


test("renders Input component as required", () => {
  const {getByPlaceholderText} = render(<Input placeholder="Test Placeholder"
    required
  />);
  const inputElement = getByPlaceholderText("Test Placeholder");
  expect(inputElement).toBeRequired();
});

import {render, screen} from "@testing-library/react";
import {App} from "src/App";
import {expect, it} from "vitest";

it("renders App", () => {
  render(<App />);
  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

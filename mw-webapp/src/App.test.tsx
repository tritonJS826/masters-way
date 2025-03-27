import {render, screen} from "@testing-library/react";
import {App} from "src/App";
import {expect, it} from "vitest";

it("renders App", async () => {
  try {
    await render(<App />);
  } finally {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  }
});

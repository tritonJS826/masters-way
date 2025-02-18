import {render, screen} from "@testing-library/react";
import {Loader} from "src/component/loader/Loader";
import {Theme} from "src/globalStore/ThemeStore";

const LOADER_TEST_ID = "loader";
const ALT_TEXT = "Master's way";

describe("Loader component", () => {
  beforeEach(() => {
    render(
      <Loader
        theme={Theme.DARK}
        dataCy={LOADER_TEST_ID}
        isAbsolute
      />,
    );
  });

  test("should render loader component correctly", () => {
    const loader = screen.getByTestId(LOADER_TEST_ID);
    expect(loader).toBeInTheDocument();
  });

  test("should display the loader image", () => {
    const image = screen.getByRole("img", {name: ALT_TEXT});
    expect(image).toBeInTheDocument();
  });

  test("loader component should be visible", () => {
    const loader = screen.getByTestId(LOADER_TEST_ID);
    expect(loader).toBeVisible();
  });

  test("should have the alt text", () => {
    const image = screen.getByRole("img", {name: ALT_TEXT});
    expect(image).toHaveAttribute("alt", ALT_TEXT);
  });
});

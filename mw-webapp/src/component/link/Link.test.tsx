import {BrowserRouter} from "react-router-dom";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Link} from "src/component/link/Link";

const LINK_PATH = "/home";
const LINK_VALUE = "Home";

describe("Link component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Link path={LINK_PATH}>
          {LINK_VALUE}
        </Link>
      </BrowserRouter>,
    );
  });

  test("should render value correctly", () => {
    const link = screen.getByRole("link", {name: LINK_VALUE});
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(LINK_VALUE);
  });

  test("should navigate to the correct URL on click", async () => {
    const initialUrl = window.location.href;
    const link = screen.getByRole("link", {name: LINK_VALUE});
    expect(link.getAttribute("href")).toContain(LINK_PATH);

    await act(async () => await userEvent.click(link));
    const secondUrl = window.location.href;
    expect(initialUrl).not.toEqual(secondUrl);
    expect(secondUrl).toContain(LINK_PATH);
  });
});

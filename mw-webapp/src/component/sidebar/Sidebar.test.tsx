import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button, ButtonType} from "src/component/button/Button";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";

const SIDEBAR_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {dataCyClose: "close"},
};

const SIDEBAR_LINKS: MenuItemLink[] = [
  {
    path: "/",
    value: "",
    icon: (
      <img
        width="5px"
        height="5px"
      />
    ),
  },
  {
    path: "/",
    value: "Home",
  },
  {
    path: "/users",
    value: "Users",
  },
];

describe("Sidebar component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Sidebar
          cy={SIDEBAR_CY}
          trigger={<div />}
          linkList={SIDEBAR_LINKS}
          onOpenStatusChanged={() => {}}
          bottomChildren={
            <Button
              onClick={() => {}}
              value="Bottom button"
              buttonType={ButtonType.SECONDARY}
            />
          }
        />
      </BrowserRouter>,
    );
  });

  it("should render sidebar trigger and should not render sidebar content by default", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should open sidebar on trigger click", async () => {
    await act(async () => await userEvent.click(screen.getByRole("button")));
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
  });

  it("should close sidebar when clicking the close button", async () => {
    await act(async () => await userEvent.click(screen.getByRole("button")));

    const buttonClose = screen.getByRole("button", {name: /close/i});
    await act(async () => await userEvent.click(buttonClose));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should sidebar be closed when click background", async () => {
    await act(async () => await userEvent.click(screen.getByRole("button")));

    const overlay = screen.getByRole("overlay", {hidden: true});
    await act(async () => await userEvent.click(overlay));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close sidebar when clicking the logo", async () => {
    await act(async () => await userEvent.click(screen.getByRole("button")));

    const logo = screen.getByRole("img");
    // Await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyContent.dataCyLogo)));
    await act(async () => await userEvent.click(logo));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

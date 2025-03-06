import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button, ButtonType} from "src/component/button/Button";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";

const SIDEBAR_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {
    dataCyOverlay: "overlay",
    dataCyClose: "close",
    dataCyContent: "content",
    dataCyLogo: "logo",
  },
};

const VALUE_TRIGGER = "Sidebar trigger";

const SIDEBAR_TRIGGER = (
  <Button
    value={VALUE_TRIGGER}
    onClick={() => {}}
  />
);

const SIDEBAR_LINKS: MenuItemLink[] = [
  {
    path: "/",
    value: "",
    icon: (
      <img
        width="5px"
        height="5px"
        data-cy={SIDEBAR_CY.dataCyContent.dataCyLogo}
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
          trigger={SIDEBAR_TRIGGER}
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
    expect(screen.getByTestId(SIDEBAR_CY.dataCyTrigger)).toBeInTheDocument();
    expect(screen.queryByTestId(SIDEBAR_CY.dataCyContent.dataCyContent)).not.toBeInTheDocument();
  });

  it("should open sidebar on trigger click", async () => {
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyTrigger)));
    expect(screen.queryByTestId(SIDEBAR_CY.dataCyContent.dataCyContent)).toBeInTheDocument();
  });

  it("should close sidebar when clicking the close button", async () => {
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyTrigger)));
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyContent.dataCyClose)));
    expect(screen.queryByTestId(SIDEBAR_CY.dataCyContent.dataCyContent)).not.toBeInTheDocument();
  });

  it("should sidebar be closed when click background", async () => {
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyTrigger)));
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyContent.dataCyOverlay)));
    expect(screen.queryByTestId(SIDEBAR_CY.dataCyContent.dataCyContent)).not.toBeInTheDocument();
  });

  it("should close sidebar when clicking the logo", async () => {
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyTrigger)));
    await act(async () => await userEvent.click(screen.getByTestId(SIDEBAR_CY.dataCyContent.dataCyLogo)));
    expect(screen.queryByTestId(SIDEBAR_CY.dataCyContent.dataCyContent)).not.toBeInTheDocument();
  });

});

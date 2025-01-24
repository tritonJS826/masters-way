import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ViewOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {View} from "src/utils/LocalStorageWorker";
import {expect, vi} from "vitest";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

const VIEW_SWITCHER = "viewSwitcher";
const CARD_ICON_BUTTON = "CardViewButton";
const TABLE_ICON_BUTTON = "TableViewButton";

const options: ViewOption[] = [
  {
    view: View.Card,
    tooltipContent: "Grid View",
    iconName: "GridViewIcon",
    dataCy: CARD_ICON_BUTTON,
  },
  {
    view: View.Table,
    tooltipContent: "Table View",
    iconName: "TableViewIcon",
    dataCy: TABLE_ICON_BUTTON,
  },
];

/**
 * Render View Switcher component
 */
const renderViewSwitcher = (clickCallback = vi.fn()) => {
  return render(
    <ViewSwitcher
      view={View.Card}
      setView={clickCallback}
      options={options}
      dataCy={VIEW_SWITCHER}
    />,
  );
};

describe("ViewSwitcher component", () => {
  it("should render with the correct default view", () => {
    renderViewSwitcher();

    const activeButton = screen.getByTestId(CARD_ICON_BUTTON);
    expect(activeButton).toHaveClass(styles.activeView);
  });

  it("should change view when a different option is clicked", async () => {
    const user = userEvent.setup();
    const clickCallback = vi.fn();

    renderViewSwitcher(clickCallback);

    const cardButton = screen.getByTestId(CARD_ICON_BUTTON);
    await user.click(cardButton);

    expect(clickCallback).toHaveBeenCalled();
    expect(clickCallback).toHaveBeenCalledWith(View.Card);
  });
});

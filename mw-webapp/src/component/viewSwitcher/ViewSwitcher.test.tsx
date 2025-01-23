import {fireEvent, render, screen} from "@testing-library/react";
import {ViewOption, ViewSwitcher, ViewSwitcherProps} from "src/component/viewSwitcher/ViewSwitcher";
import {View} from "src/utils/LocalStorageWorker";
import {expect, test, vi} from "vitest";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

const VIEW_SWITCHER = "viewSwitcher";
const CARD_ICON_BUTTON = "CardViewButton";
const TABLE_ICON_BUTTON = "TableViewButton";
const EXPECTED_CALL_COUNT = 1;

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
const renderViewSwitcher = (props?: Partial<ViewSwitcherProps>) => {
  const handleClick = vi.fn();

  render (
    <ViewSwitcher
      view={props?.view ?? View.Card}
      setView={handleClick}
      options={props?.options ?? options}
      className={props?.className}
      dataCy={props?.dataCy ?? VIEW_SWITCHER}
    />,
  );

  return {handleClick};
};

describe("ViewSwitcher component", () => {
  test("should render with the correct default view", () => {
    renderViewSwitcher();

    const activeButton = screen.getByTestId(CARD_ICON_BUTTON);
    expect(activeButton).toHaveClass(styles.activeView);
  });

  test("should change view when a different option is clicked", () => {
    const {handleClick} = renderViewSwitcher();

    const button = screen.getByTestId(CARD_ICON_BUTTON);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(View.Card);
    expect(handleClick).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
  });
});

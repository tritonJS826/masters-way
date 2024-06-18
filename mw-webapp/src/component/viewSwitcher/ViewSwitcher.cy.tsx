import Sinon from "cypress/types/sinon";
import {ViewOption, ViewSwitcher, ViewSwitcherProps} from "src/component/viewSwitcher/ViewSwitcher";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

const VIEW_SWITCHER_CY = "viewSwitcher";
const CARD_ICON_CY = "cardView";
const TABLE_ICON_CY = "tableView";

let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

const options: ViewOption[] = [
  {
    view: View.Card,
    tooltipContent: "Grid View",
    iconName: "GridViewIcon",
    dataCy: CARD_ICON_CY,
  },
  {
    view: View.Table,
    tooltipContent: "Table View",
    iconName: "TableViewIcon",
    dataCy: TABLE_ICON_CY,
  },
];

/**
 * Create View Switcher component
 */
const createTestViewSwitcher = (props?: Partial<ViewSwitcherProps>) => {
  STUB_FUNCTION = cy.spy();

  return (
    <ViewSwitcher
      view={props?.view ?? View.Card}
      setView={STUB_FUNCTION}
      options={props?.options ?? options}
      className={props?.className}
      dataCy={props?.dataCy ?? VIEW_SWITCHER_CY}
    />
  );
};

describe("ViewSwitcher component", () => {
  it("should render with the correct default view", () => {
    cy.mount(createTestViewSwitcher());
    cy.get(getDataCy(VIEW_SWITCHER_CY)).find("button").should("have.class", styles.activeView);
  });

  it("should change view when a different option is clicked", () => {
    STUB_FUNCTION = cy.spy();
    cy.mount(createTestViewSwitcher());
    cy.get(getDataCy(VIEW_SWITCHER_CY)).children().first().click();
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });
});

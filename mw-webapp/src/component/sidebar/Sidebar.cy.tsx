import {BrowserRouter} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SIDEBAR_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: "content",
};

const SIDEBAR_TRIGGER = (
  <Button
    value="Sidebar trigger"
    onClick={() => { }}
  />);

const SIDEBAR_LINKS: NavigationLink[] = [
  {
    path: "/",
    value: "Home",
  },
  {
    path: "/users",
    value: "Users",
  },
];

const SIDEBAR_CLOSE_BUTTON = "[class*=\"closeButton\"]";
const SIDEBAR_OVERLAY = "[class*=\"dialogOverlay\"]";

describe("Sidebar component", () => {

  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Sidebar
          cy={SIDEBAR_CY}
          trigger={SIDEBAR_TRIGGER}
          linkList={SIDEBAR_LINKS}
        />
      </BrowserRouter>
      ,
    );
  });

  it("should render sidebar trigger and should not render sidebar content by default", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .should("exist");
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent))
      .should("not.exist");
  });

  it("should sidebar be opened when click trigger", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent))
      .should("exist");
  });

  it("should sidebar be closed when click cross", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent))
      .find(SIDEBAR_CLOSE_BUTTON).click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent))
      .should("not.exist");
  });

  it("should sidebar be closed when click background", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(SIDEBAR_OVERLAY)
      .click({force: true});
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent))
      .should("not.exist");
  });

});

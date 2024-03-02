import {BrowserRouter} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SIDEBAR_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {
    dataCyOverlay: "overlay",
    dataCyClose: "close",
    dataCyContent: "content",
  },
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
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should open sidebar on trigger click", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyContent))
      .should("exist");
  });

  it("should sidebar be closed when click cross", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyClose))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should sidebar be closed when click background", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyOverlay))
      .click({force: true});
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

});

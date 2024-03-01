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

describe("Sidebar component", () => {

  /**
   * Beginning of the test for the Sidebar component.
   */
  const mountSidebar = () => {
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
  };

  it("should render sidebar trigger", () => {
    mountSidebar();
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger)).should("exist");
  });

  it("should not render sidebar content by default", () => {
    mountSidebar();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("not.exist");
  });

  it("should sidebar be opened when click trigger", () => {
    mountSidebar();
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("exist");
  });

  it("should sidebar be closed when click cross", () => {
    mountSidebar();
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("exist");
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).children().last().children("button").click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("not.exist");
  });

  it("should sidebar be closed when click background", () => {
    mountSidebar();
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("exist");
    cy.get("[class*=\"dialogOverlay\"]").click({force: true});
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent)).should("not.exist");
  });

});

import {BrowserRouter} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SIDEBAR_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {
    dataCyOverlay: "overlay",
    dataCyClose: "close",
    dataCyContent: "content",
    dataCyLogo: "logo",
  },
};

const SIDEBAR_TRIGGER = (
  <Button
    value="Sidebar trigger"
    onClick={() => { }}
  />);

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
    cy.mount(
      <BrowserRouter>
        <Sidebar
          cy={SIDEBAR_CY}
          trigger={SIDEBAR_TRIGGER}
          linkList={SIDEBAR_LINKS}
          onOpenStatusChanged={() => {}}
          bottomChildren={<>
            <Button
              onClick={() => {}}
              value="Bottom button"
              buttonType={ButtonType.SECONDARY}
            />
          </>}
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

  it("should sidebar be closed when click logo", () => {
    cy.get(getDataCy(SIDEBAR_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyLogo))
      .click();
    cy.get(getDataCy(SIDEBAR_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });
});

import {Button} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const DROPDOWN_CY = {
  dataCyTrigger: "trigger",
  dataCyOverlay: "overlay",
  dataCyContent: "content",
  dataCyContentList: "list",
};

const DROPDOWN_LENGHTH = 2;

describe("Dropdown component", () => {

  beforeEach(() => {
    cy.mount(
      <Dropdown
        cy={DROPDOWN_CY}
        trigger={
          <Button
            value="DROPDOWN"
            onClick={() => {}}
            dataCy={DROPDOWN_CY.dataCyTrigger}
          />
        }
        dropdownMenuItems={[
          {
            id: "#1",
            value: "test#1",

            /**
             * Click action
             */
            onClick: () => {},
          },
          {
            id: "#2",
            value: "test#2",

            /**
             * Click action
             */
            onClick: () => {},
          },
        ]}
      />,
    );
  });

  it("should not exist by default", () => {
    cy.get(getDataCy(DROPDOWN_CY.dataCyContent))
      .should("not.exist");
  });
  it("should close by clicking on background", () => {
    cy.get(getDataCy(DROPDOWN_CY.dataCyTrigger))
      .click();
    cy.get("body")
      .click({force: true});
    cy.get(getDataCy(DROPDOWN_CY.dataCyContent))
      .should("not.exist");
  });

  it("should render content", () => {
    cy.get(getDataCy(DROPDOWN_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(DROPDOWN_CY.dataCyContent))
      .should("exist");
  });

  it("should length dropdown", () => {
    cy.get(getDataCy(DROPDOWN_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(DROPDOWN_CY.dataCyContentList)).children().should("have.length", DROPDOWN_LENGHTH);
  });

  it("should select right option after click on value", () => {
    cy.get(getDataCy(DROPDOWN_CY.dataCyTrigger)).click();
    cy.contains(getDataCy(DROPDOWN_CY.dataCyContentList), "test#1").click();
    cy.contains(getDataCy(DROPDOWN_CY.dataCyContentList), "test#2").click();
  });
});

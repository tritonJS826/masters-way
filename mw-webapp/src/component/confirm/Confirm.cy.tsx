import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CONFIRM_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {
    dataCyOverlay: "overlay",
    dataCyClose: "close",
    dataCyContent: "content",
    dataCyOK: "confirm",
  },
};

describe("Confirm component", () => {

  beforeEach(() => {
    cy.mount(
      <Confirm
        cy={CONFIRM_CY}
        trigger={
          <Button
            value="trigger"
            onClick={() => {}}
          />
        }
        content={
          <div>
            Confirm content
          </div>
        }
        onOk={() => {}}
        okText="Test confirm"
      />
      ,
    );
  });

  it("should not exist by default", () => {
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should open on trigger click and close by clicking on close button", () => {
    cy.get(getDataCy(CONFIRM_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .should("exist");
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyClose))
      .click();
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should render content", () => {
    cy.get(getDataCy(CONFIRM_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .should("exist");
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyClose))
      .click();
  });

  it("should close by clicking on background", () => {
    cy.get(getDataCy(CONFIRM_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyOverlay))
      .click({force: true});
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should not close by clicking on content", () => {
    cy.get(getDataCy(CONFIRM_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyContent))
      .click().should("exist");
    cy.get(getDataCy(CONFIRM_CY.dataCyContent.dataCyClose))
      .click();
  });

});

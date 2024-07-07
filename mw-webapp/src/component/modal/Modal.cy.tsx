import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const MODAL_CY = {
  dataCyTrigger: "trigger",
  dataCyContent: {
    dataCyOverlay: "overlay",
    dataCyClose: "close",
    dataCyContent: "content",
  },
};

describe("Modal component", () => {

  beforeEach(() => {
    cy.mount(
      <Modal
        cy={MODAL_CY}
        trigger={
          <Button
            value="Modal trigger"
            onClick={() => {}}
          />
        }
        content={
          <div>
            Modal content
          </div>
        }
      />
      ,
    );
  });

  it("should not exist by default", () => {
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should open on trigger click and close by clicking on close button", () => {
    cy.get(getDataCy(MODAL_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .should("exist");
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyClose))
      .click();
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should render content", () => {
    cy.get(getDataCy(MODAL_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .should("exist");
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyClose))
      .click();
  });

  it("should close by clicking on background", () => {
    cy.get(getDataCy(MODAL_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyOverlay))
      .click({force: true});
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .should("not.exist");
  });

  it("should not close by clicking on content", () => {
    cy.get(getDataCy(MODAL_CY.dataCyTrigger))
      .click();
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyContent))
      .click().should("exist");
    cy.get(getDataCy(MODAL_CY.dataCyContent.dataCyClose))
      .click();
  });

});

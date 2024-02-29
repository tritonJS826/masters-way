import {Button} from "src/component/button/Button";
import {displayNotification} from "src/component/notification/displayNotification";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const NOTIFICATION_TEXT = "Notification text";
const NOTIFICATION_TYPE = "info";
const NOTIFICATION_TRIGGER_CY = "button";

/**
 * Notification test
 */
const NotificationTest = () => {
  return (
    <Button
      value="Notification trigger"
      onClick={() => displayNotification({text: NOTIFICATION_TEXT, type: NOTIFICATION_TYPE})}
      dataCy={NOTIFICATION_TRIGGER_CY}
    />
  );
};

describe("Notification component", () => {

  beforeEach(() => {
    cy.mount(
      <NotificationTest />
      ,
    );
  });

  it("should render on trigger", () => {
    cy.get(".toastify").should("not.exist");
    cy.get(getDataCy(NOTIFICATION_TRIGGER_CY)).click();
    cy.get(".toastify").should("exist");
  });

  it("should render right content", () => {
    cy.get(".toastify").should("contain.text", NOTIFICATION_TEXT);
  });

  it("should close button exist", () => {
    cy.get(".toastify").children().last().invoke("prop", "tagName")
      .then($tag => $tag.toLowerCase())
      .should("eq", "button");
  });

  it("should notification hide by clicking on close button", () => {
    cy.get(".toastify").children().last().click();
    cy.get(".toastify").should("not.exist");
  });

});

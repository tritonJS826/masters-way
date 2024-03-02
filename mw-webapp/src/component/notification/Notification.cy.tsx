import {Button} from "src/component/button/Button";
import {displayNotification} from "src/component/notification/displayNotification";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

// We using className for get notification because we can't add dataCy to element created by toastify
const NOTIFICATION = ".toastify";
const NOTIFICATION_CLOSE_BUTTON = ".toast-close";
const NOTIFICATION_DURATION = 1000;
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
      onClick={() => displayNotification({text: NOTIFICATION_TEXT, type: NOTIFICATION_TYPE, duration: NOTIFICATION_DURATION})}
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

  it(`should render on trigger and automatically hide after ${NOTIFICATION_DURATION} ms`, () => {
    cy.get(NOTIFICATION)
      .should("not.exist");
    cy.get(getDataCy(NOTIFICATION_TRIGGER_CY))
      .click();
    cy.get(NOTIFICATION)
      .should("exist");
    cy.get(NOTIFICATION)
      .should("not.exist", {timeout: NOTIFICATION_DURATION});
  });

  it("should ршву notification by clicking on close button", () => {
    cy.get(getDataCy(NOTIFICATION_TRIGGER_CY))
      .click();
    cy.get(NOTIFICATION)
      .find(NOTIFICATION_CLOSE_BUTTON)
      .should("exist")
      .click();
    cy.get(NOTIFICATION)
      .should("not.exist");
  });

  it("should render right content", () => {
    cy.get(getDataCy(NOTIFICATION_TRIGGER_CY))
      .click();
    cy.get(NOTIFICATION)
      .should("contain.text", NOTIFICATION_TEXT);
    cy.get(NOTIFICATION)
      .find(NOTIFICATION_CLOSE_BUTTON)
      .click();
  });

});

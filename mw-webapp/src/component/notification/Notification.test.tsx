import {act, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "src/component/button/Button";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";

const NOTIFICATION_TEXT = "Notification text";
const NOTIFICATION_TYPE = NotificationType.INFO;
const NOTIFICATION_DURATION = 1000;
const NOTIFICATION_DELAY = 500;
const NOTIFICATION_TRIGGER_CY = "button";

/**
 * Notification test
 */
const NotificationTest = () => (
  <Button
    value="Notification trigger"
    onClick={() => displayNotification({
      text: NOTIFICATION_TEXT,
      type: NOTIFICATION_TYPE,
      duration: NOTIFICATION_DURATION,
    })}
    dataCy={NOTIFICATION_TRIGGER_CY}
  />
);

describe("Notification component", () => {
  beforeEach(() => {
    render(
      <NotificationTest />,
    );
  });

  it(`should render on trigger and automatically hide after ${NOTIFICATION_DURATION} ms`, async () => {
    const triggerButton = screen.getByTestId(NOTIFICATION_TRIGGER_CY);
    await act(async () => await userEvent.click(triggerButton));
    const notification = screen.getByRole("button", {name: /close/i}).closest("div");
    expect(notification).toBeInTheDocument();
    await waitFor(() => {
      expect(notification).not.toBeInTheDocument();
    }, {timeout: NOTIFICATION_DURATION + NOTIFICATION_DELAY});
  });

  it("should close notification when clicking the close button", async () => {
    const triggerButton = screen.getByTestId(NOTIFICATION_TRIGGER_CY);
    await act(async () => await userEvent.click(triggerButton));
    const closeButton = screen.getByRole("button", {name: /close/i});
    expect(closeButton).toBeInTheDocument();
    await act(async () => await userEvent.click(closeButton));
    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  //TODO Add test "should render right content" or change "toastify-js" with another library (such "react-toastify" );

});

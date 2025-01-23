import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Confirm} from "src/component/confirm/Confirm";
import {vi} from "vitest";

const CONFIRM_CONTENT = "Confirm content";

/**
 * Begin test for Confirm component
 */
const renderConfirm = (onOk = vi.fn(), onCancel = vi.fn(), onEnter = vi.fn()) => {
  render(
    <Confirm
      trigger={
        <div>
          Confirm trigger
        </div>
      }
      content={
        <div>
          {CONFIRM_CONTENT}
        </div>
      }
      onOk={onOk}
      onCancel={onCancel}
      okText="Test confirm"
      cancelText="Cancel"
    />,
  );

  return {onOk, onCancel, onEnter};
};

describe("Confirm component", () => {
  it("should not exist by default", () => {
    renderConfirm();
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should open on trigger click and close by clicking on close button", () => {
    renderConfirm();

    const buttonTrigger = screen.getByRole("button", {name: /Confirm trigger.*/i});
    fireEvent.click(buttonTrigger);
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: /cancel/i}));
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should open on trigger click and close by clicking onCancel button", () => {
    const {onCancel} = renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: /cancel/i}));
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalled();
  });

  it("should open on trigger click and close by clicking onOk button", () => {
    const {onOk} = renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: /test confirm/i}));
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
    expect(onOk).toHaveBeenCalled();
  });

  it("should open on trigger click and close by keydown enter", async () => {
    const user = userEvent.setup();
    renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should render content", () => {
    renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();
  });

  it("should close by clicking on background", () => {
    renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: /cancel/i}));
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should not close by clicking on content", () => {
    renderConfirm();

    fireEvent.click(screen.getByRole("button", {name: /confirm trigger/i}));
    const content = screen.getByText(CONFIRM_CONTENT);
    expect(content).toBeInTheDocument();

    fireEvent.click(content);
    expect(content).toBeInTheDocument();
  });
});

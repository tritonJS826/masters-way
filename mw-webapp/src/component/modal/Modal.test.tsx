import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";

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
    render(
      <Modal
        cy={MODAL_CY}
        trigger={
          <Button
            value="Modal trigger"
            onClick={() => {}}
          />
        }
        content={<div>
          Modal content
        </div>}
      />,
    );
  });

  it("should not exist by default", () => {
    expect(
      screen.queryByTestId(MODAL_CY.dataCyContent.dataCyContent),
    ).not.toBeInTheDocument();
  });

  it("should open on trigger click and close by clicking on close button", async () => {
    const openModalTrigger = screen.getByTestId(MODAL_CY.dataCyTrigger);
    fireEvent.click(openModalTrigger);
    await screen.findByText("Modal content");
    const closeModalTrigger = screen.getByTestId(
      MODAL_CY.dataCyContent.dataCyClose,
    );
    fireEvent.click(closeModalTrigger);
    expect(
      screen.queryByTestId(MODAL_CY.dataCyContent.dataCyContent),
    ).not.toBeInTheDocument();
  });

  it("should render content", async () => {
    fireEvent.click(screen.getByTestId(MODAL_CY.dataCyTrigger));
    await screen.findByTestId(MODAL_CY.dataCyContent.dataCyContent);
  });

  it("should close by clicking on background", async () => {
    const user = userEvent.setup();
    fireEvent.click(screen.getByTestId(MODAL_CY.dataCyTrigger));
    await screen.findByTestId(MODAL_CY.dataCyContent.dataCyContent);
    await act(async () => {
      await user.click(
        screen.getByTestId(MODAL_CY.dataCyContent.dataCyOverlay),
      );
    });
    expect(
      screen.queryByTestId(MODAL_CY.dataCyContent.dataCyContent),
    ).not.toBeInTheDocument();
  });

  it("should not close by clicking on content", () => {
    fireEvent.click(screen.getByTestId(MODAL_CY.dataCyTrigger));
    const modalContent = screen.getByTestId(
      MODAL_CY.dataCyContent.dataCyContent,
    );
    fireEvent.click(modalContent);
    expect(modalContent).toBeInTheDocument();
  });
});

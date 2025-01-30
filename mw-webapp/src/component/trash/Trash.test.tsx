import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Trash} from "src/component/trash/Trash";
import {vi} from "vitest";

const TOOLTIP_CONTENT = "Delete item";
const CONFIRM_CONTENT = "Confirm content";
const OK_TEXT = "Yes";
const CANCEL_TEXT = "No";
const TRASH_ICON = "trash-icon";
const OK_BUTTON = "confirm-ok-button";
const CANCEL_BUTTON = "confirm-cancel-button";

const CY = {
  dataCyIcon: TRASH_ICON,
  dataCyOk: OK_BUTTON,
  dataCyCancel: CANCEL_BUTTON,
};

/**
 * Renders Trash component
 */
const renderTrash = (
  onOk?: () => void,
) => {
  return render(
    <Trash
      tooltipContent={TOOLTIP_CONTENT}
      tooltipPosition={PositionTooltip.TOP}
      confirmContent={CONFIRM_CONTENT}
      onOk={onOk ?? (() => {})}
      okText={OK_TEXT}
      cancelText={CANCEL_TEXT}
      cy={CY}
    />,
  );
};

describe("Trash component", () => {
  it("should render the Trash icon", () => {
    renderTrash();
    const trashIcon = screen.getByTestId(TRASH_ICON);

    expect(trashIcon).toBeInTheDocument();
  });

  it("should not exist confirm content by default ", () => {
    renderTrash();
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should open the confirm dialog by clicking the trash icon", async () => {
    const user = userEvent.setup();
    renderTrash();

    const trashIcon = screen.getByTestId(TRASH_ICON);
    await act(async () => {
      await user.click(trashIcon);
    });

    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();
  });

  it("should call onOk and close the confirm dialog by clicking onOk button", async () => {
    const user = userEvent.setup();
    const onOkSpy = vi.fn();

    renderTrash(onOkSpy);

    const trashIcon = screen.getByTestId(TRASH_ICON);
    await act(async () => {
      await user.click(trashIcon);
    });
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    const okButton = screen.getByTestId(OK_BUTTON);
    await act(async () => {
      await user.click(okButton);
    });
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();

    expect(onOkSpy).toHaveBeenCalled();
  });

  it("should close the confirm dialog when keydown enter is clicked", async () => {
    const user = userEvent.setup();
    const onOkSpy = vi.fn();

    renderTrash(onOkSpy);

    const trashIcon = screen.getByTestId(TRASH_ICON);
    await act(async () => {
      await user.click(trashIcon);
    });
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    await act(async () => {
      await user.keyboard("{Enter}");
    });
    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should close the confirm dialog when cancel button is clicked", async () => {
    const user = userEvent.setup();
    renderTrash();

    const trashIcon = screen.getByTestId(TRASH_ICON);
    await act(async () => {
      await user.click(trashIcon);
    });
    expect(screen.getByText(CONFIRM_CONTENT)).toBeInTheDocument();

    const cancelButton = screen.getByTestId(CANCEL_BUTTON);
    await act(async () => {
      await user.click(cancelButton);
    });

    expect(screen.queryByText(CONFIRM_CONTENT)).not.toBeInTheDocument();
  });

  it("should not close the confirm dialog when content is clicked", async () => {
    const user = userEvent.setup();
    renderTrash();

    const trashIcon = screen.getByTestId(TRASH_ICON);
    await act(async () => {
      await user.click(trashIcon);
    });

    const content = screen.getByText(CONFIRM_CONTENT);
    expect(content).toBeInTheDocument();

    await act(async () => {
      await user.click(content);
    });
    expect(content).toBeInTheDocument();
  });
});

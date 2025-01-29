import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {vi} from "vitest";

const DROPDOWN_LENGHTH = 2;
const TEST_CONTENT1 = "test#1";
const TEST_CONTENT2 = "test#2";

/**
 * Begin test for Dropdown component
 */
const renderDropdown = (onClickItem1 = vi.fn(), onClickItem2 = vi.fn()) => {
  render(
    <Dropdown
      trigger={
        <div>
          DROPDOWN
        </div>
      }
      dropdownMenuItems={[
        {
          dropdownSubMenuItems: [
            {
              id: "#1",
              isPreventDefaultUsed: false,
              value: TEST_CONTENT1,
              onClick: onClickItem1,
            },
            {
              id: "#2",
              isPreventDefaultUsed: false,
              value: TEST_CONTENT2,
              onClick: onClickItem2,
            },
          ],
        },
      ]}
    />,
  );

  return {onClickItem1, onClickItem2};
};

describe("Dropdown component", () => {
  it("should not exist by default", () => {
    renderDropdown();
    expect(screen.queryByText(TEST_CONTENT1)).not.toBeInTheDocument();
    expect(screen.queryByText(TEST_CONTENT2)).not.toBeInTheDocument();
  });

  it("should render content", async () => {
    renderDropdown();
    await act(async () => {
      await userEvent.click(screen.getByRole("button", {name: /dropdown/i}));
    });
    expect(screen.getByText(TEST_CONTENT1)).toBeVisible();
    expect(screen.getByText(TEST_CONTENT2)).toBeVisible();
  });

  it("should close by clicking on background", async () => {
    renderDropdown();
    await act(async () => {
      await userEvent.click(screen.getByRole("button", {name: /dropdown/i}));
    });
    await act(async () => {
      await userEvent.click(document.body);
    });
    expect(screen.queryByText(TEST_CONTENT1)).not.toBeInTheDocument();
    expect(screen.queryByText(TEST_CONTENT2)).not.toBeInTheDocument();
  });

  it("should length dropdown", async () => {
    renderDropdown();
    await act(async () => {
      await userEvent.click(screen.getByRole("button", {name: /dropdown/i}));
    });
    const list = screen.getByRole("menu");
    expect(list.children).toHaveLength(DROPDOWN_LENGHTH);
  });

  it("should select right option after click on value", async () => {
    const {onClickItem1, onClickItem2} = renderDropdown();
    const trigger = screen.getByRole("button", {name: /dropdown/i});

    await act(async () => {
      await userEvent.click(trigger);
    });
    const option1 = screen.getByText(TEST_CONTENT1);
    expect(option1).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(option1);
    });
    expect(onClickItem1).toHaveBeenCalled();
    expect(onClickItem2).not.toHaveBeenCalled();

    await act(async () => {
      await userEvent.click(trigger);
    });
    const option2 = screen.getByText(TEST_CONTENT2);
    expect(option2).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(option2);
    });
    expect(onClickItem2).toHaveBeenCalled();
  });
});

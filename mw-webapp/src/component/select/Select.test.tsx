import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Select} from "src/component/select/Select";
import {withMockPointerEvents} from "src/utils/mockPointerEvents";
import {vi} from "vitest";

const SELECT_CY = {
  dataCyTrigger: "trigger",
  dataCyOverlay: "overlay",
  dataCyContent: "content",
  dataCyContentList: "list",
  dataCyValue: "value",
};

const FIRST_OPTION_INDEX = 0;
const SECOND_OPTION_INDEX = 1;

const SELECT_OPTIONS = [
  {id: "1", value: "value 1", text: "Select text 1", dataCy: "item-1"},
  {id: "2", value: "value 2", text: "Select text 2", dataCy: "item-2"},
];

/**
 * SelectTest props
 */
interface SelectTestProps {

  /**
   * SelectTest onChange
   */
  onChange: (value: string) => void;
}

/**
 * Select for test
 */
const SelectTest = (props: SelectTestProps) => {
  return (
    <Select
      cy={SELECT_CY}
      label="Select label"
      defaultValue={SELECT_OPTIONS[FIRST_OPTION_INDEX].value}
      name="selectName"
      options={SELECT_OPTIONS}
      onChange={props.onChange}
    />
  );
};

describe("Select component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <SelectTest onChange={mockOnChange} />
        </BrowserRouter>,
      );
    });
  });

  it("should render select trigger and not render select content by default", () => {
    expect(screen.getByTestId(SELECT_CY.dataCyTrigger)).toBeInTheDocument();
    expect(screen.queryByTestId(SELECT_CY.dataCyContentList)).not.toBeInTheDocument();
  });

  it("should show select list when clicking on select trigger", withMockPointerEvents(async () => {
    await act(async () => await userEvent.click(screen.getByTestId(SELECT_CY.dataCyTrigger)));
    expect(screen.getByTestId(SELECT_CY.dataCyContentList)).toBeInTheDocument();
  }));

  it("should change value inside trigger when an option is selected", withMockPointerEvents(async () => {
    const value = screen.getByTestId(SELECT_CY.dataCyValue);
    expect(value).toHaveTextContent(SELECT_OPTIONS[FIRST_OPTION_INDEX].text);

    const trigger = screen.getByTestId(SELECT_CY.dataCyTrigger);
    await userEvent.click(trigger);
    const secondOption = screen.getByTestId(SELECT_OPTIONS[SECOND_OPTION_INDEX].dataCy);
    await act(async () => await userEvent.click(secondOption));
    expect(value).toHaveTextContent(SELECT_OPTIONS[SECOND_OPTION_INDEX].text);
  }));

  it("should call onChange when a select item is clicked", withMockPointerEvents(async () => {
    const trigger = screen.getByTestId(SELECT_CY.dataCyTrigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const secondOption = screen.getByTestId(SELECT_OPTIONS[SECOND_OPTION_INDEX].dataCy);
    await act(async () => await userEvent.click(secondOption));
    expect(mockOnChange).toHaveBeenCalledWith(SELECT_OPTIONS[SECOND_OPTION_INDEX].value);
  }));

});

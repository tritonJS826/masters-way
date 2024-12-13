import {fireEvent, render, screen} from "@testing-library/react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";

const FIRST_TRIGGER = "trigger1";
const SECOND_TRIGGER = "trigger2";
const FIRST_CONTENT = "content1";
const SECOND_CONTENT = "content2";

const ACCORDION_ITEMS_EXAMPLE = [
  {
    trigger: {child: FIRST_TRIGGER, dataCy: FIRST_TRIGGER},
    content: {child: FIRST_CONTENT, dataCy: FIRST_CONTENT},
  },
  {
    trigger: {child: SECOND_TRIGGER, dataCy: SECOND_TRIGGER},
    content: {child: SECOND_CONTENT, dataCy: SECOND_CONTENT},
  },
];

describe("Accordion component", () => {

  /**
   * Beginning of the test for the Accordion component.
   */
  const renderAccordion = (type: accordionTypes) => {
    render(
      <Accordion
        items={ACCORDION_ITEMS_EXAMPLE}
        type={type}
      />,
    );
  };

  it("should render the accordion with default behavior", () => {
    renderAccordion(accordionTypes.SINGLE);

    expect(screen.getByRole("button", {name: FIRST_TRIGGER})).toBeVisible();
    expect(screen.getByRole("button", {name: SECOND_TRIGGER})).toBeVisible();
    expect(screen.queryByText(FIRST_CONTENT)).not.toBeInTheDocument();
    expect(screen.queryByText(SECOND_CONTENT)).not.toBeInTheDocument();
  });

  it("should accordion option be opened when click trigger", () => {
    renderAccordion(accordionTypes.SINGLE);
    const trigger = screen.getByRole("button", {name: FIRST_TRIGGER});
    fireEvent.click(trigger);
    expect(screen.getByText(FIRST_CONTENT)).toBeVisible();
  });

  it("should all options could be opened and closed one by one", () => {
    renderAccordion(accordionTypes.SINGLE);
    const triggerFirst = screen.getByRole("button", {name: FIRST_TRIGGER});
    const triggerSecond = screen.getByRole("button", {name: SECOND_TRIGGER});

    fireEvent.click(triggerFirst);
    fireEvent.click(triggerSecond);

    expect(screen.queryByText(FIRST_CONTENT)).not.toBeInTheDocument();
    expect(screen.getByText(SECOND_CONTENT)).toBeVisible();
  });

  it("should all options be opened and closed in multiple mode", () => {
    renderAccordion(accordionTypes.MULTIPLE);

    const triggerFirst = screen.getByRole("button", {name: FIRST_TRIGGER});
    const triggerSecond = screen.getByRole("button", {name: SECOND_TRIGGER});

    fireEvent.click(triggerFirst);
    fireEvent.click(triggerSecond);

    expect(screen.getByText(FIRST_CONTENT)).toBeVisible();
    expect(screen.getByText(SECOND_CONTENT)).toBeVisible();
  });

  it("should only one option be opened in not multiple mode", () => {
    renderAccordion(accordionTypes.SINGLE);

    const triggerFirst = screen.getByRole("button", {name: FIRST_TRIGGER});
    const triggerSecond = screen.getByRole("button", {name: SECOND_TRIGGER});

    fireEvent.click(triggerFirst);
    expect(screen.getByText(FIRST_CONTENT)).toBeVisible();
    expect(screen.queryByText(SECOND_CONTENT)).not.toBeInTheDocument();

    fireEvent.click(triggerSecond);
    expect(screen.queryByText(FIRST_CONTENT)).not.toBeInTheDocument();
    expect(screen.getByText(SECOND_CONTENT)).toBeVisible();
  });
});

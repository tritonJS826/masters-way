import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should render the accordion and all options", () => {
    renderAccordion(accordionTypes.SINGLE);

    expect(screen.getByTestId(FIRST_CONTENT)).toBeInTheDocument();
    expect(screen.getByTestId(SECOND_CONTENT)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_TRIGGER)).toBeInTheDocument();
    expect(screen.getByTestId(SECOND_TRIGGER)).toBeInTheDocument();
  });

  it("should accordion option be closed (text hidden)", () => {
    renderAccordion(accordionTypes.SINGLE);

    expect(screen.getByTestId(FIRST_CONTENT)).not.toBeVisible();
  });

  it("should accordion option be opened when click trigger", async () => {
    renderAccordion(accordionTypes.SINGLE);
    const trigger = screen.getByTestId(FIRST_TRIGGER);
    const button = trigger.querySelector("button");

    await userEvent.click(button as HTMLButtonElement);
    expect(screen.getByTestId(FIRST_CONTENT)).toBeVisible();
  });

  it("should all options could be opened and closed one by one", () => {
    renderAccordion(accordionTypes.SINGLE);

    const triggerFirst = screen.getByTestId(FIRST_TRIGGER);
    const buttonFirst = triggerFirst.querySelector("button");
    const triggerSecond = screen.getByTestId(SECOND_TRIGGER);
    const buttonFSecond = triggerSecond.querySelector("button");

    fireEvent.click(buttonFirst as HTMLButtonElement);
    fireEvent.click(buttonFSecond as HTMLButtonElement);

    expect(screen.getByTestId(FIRST_CONTENT)).not.toBeVisible();
    expect(screen.getByTestId(SECOND_CONTENT)).toBeVisible();
  });

  it("should all options be opened and closed in multiple mode", () => {
    renderAccordion(accordionTypes.MULTIPLE);

    const triggerFirst = screen.getByTestId(FIRST_TRIGGER);
    const buttonFirst = triggerFirst.querySelector("button");
    const triggerSecond = screen.getByTestId(SECOND_TRIGGER);
    const buttonFSecond = triggerSecond.querySelector("button");

    fireEvent.click(buttonFirst as HTMLButtonElement);
    fireEvent.click(buttonFSecond as HTMLButtonElement);

    expect(screen.getByTestId(FIRST_CONTENT)).toBeVisible();
    expect(screen.getByTestId(SECOND_CONTENT)).toBeVisible();
  });

  it("should only one option be opened in not multiple mode", () => {
    renderAccordion(accordionTypes.SINGLE);

    const triggerFirst = screen.getByTestId(FIRST_TRIGGER);
    const buttonFirst = triggerFirst.querySelector("button");
    const triggerSecond = screen.getByTestId(SECOND_TRIGGER);
    const buttonFSecond = triggerSecond.querySelector("button");

    fireEvent.click(buttonFirst as HTMLButtonElement);
    expect(screen.getByTestId(FIRST_CONTENT)).toBeVisible();
    expect(screen.getByTestId(SECOND_CONTENT)).not.toBeVisible();

    fireEvent.click(buttonFSecond as HTMLButtonElement);
    expect(screen.getByTestId(FIRST_CONTENT)).not.toBeVisible();
    expect(screen.getByTestId(SECOND_CONTENT)).toBeVisible();
  });
});

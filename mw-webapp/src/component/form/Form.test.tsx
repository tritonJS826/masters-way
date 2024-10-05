import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Form, FormProps} from "src/component/form/Form";
import {vi} from "vitest";

const FORM_TITLE = "Form title";
const FORM_DESCRIPTION = "Please fill out the form";
const FORM_SUBMIT_BUTTON = "Submit";
const FORM_FIELDS = [
  {
    id: 0,
    label: "FormLabel1",
    name: "Form's label",
    value: "",
  },
];
const clickCallback = vi.fn();

/**
 * Renders Form component
 */
const renderForm = (props: FormProps) => {
  return render(
    <Form
      formTitle={props.formTitle}
      formDescription={props.formDescription}
      submitButtonValue={props.submitButtonValue}
      onSubmit={props.onSubmit}
      formFields={props.formFields}
    />,
  );
};

describe("Form component", () => {
  it("renders with title, description, labels and submit button", () => {
    const props: FormProps = {
      formTitle: FORM_TITLE,
      formDescription: FORM_DESCRIPTION,
      formFields: FORM_FIELDS,
      submitButtonValue: FORM_SUBMIT_BUTTON,

      /**
       * Onsubmit callback
       */
      onSubmit: () => {},
    };

    renderForm(props);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
    expect(screen.getByText(FORM_TITLE)).toBeInTheDocument();
    expect(screen.getByText(FORM_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(FORM_SUBMIT_BUTTON)).toBeInTheDocument();

    props.formFields.forEach((field) => {
      expect(screen.getByText(field.name)).toBeInTheDocument();
    });
  });

  it("onClick is triggered when button is clicked", async () => {
    const props: FormProps = {
      formTitle: FORM_TITLE,
      formDescription: FORM_DESCRIPTION,
      formFields: FORM_FIELDS,
      submitButtonValue: FORM_SUBMIT_BUTTON,

      /**
       * Onsubmit callback
       */
      onSubmit: clickCallback,
    };

    renderForm(props);

    const user = userEvent.setup();
    const button = screen.getByRole("button");

    await user.click(button);

    expect(clickCallback).toHaveBeenCalled();
  });
});


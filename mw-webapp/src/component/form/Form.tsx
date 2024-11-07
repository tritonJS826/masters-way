import {Close as DialogClose, Dialog} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {Button} from "src/component/button/Button";
import {Input, InputType} from "src/component/input/Input";
import {InputMode} from "src/component/input/InputMode";
import {HeadingLevel, Title} from "src/component/title/Title";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
import styles from "src/component/form/Form.module.scss";

/**
 * Form field input type
 */
const enum FormFieldType {
  TEXT = "text"
}

/**
 * Form Field props
 */
interface FormField {

  /**
   * Form field ID
   */
  id: number;

  /**
   * Type of input (UI)
   * @default InputType.Line
   */
  typeInput?: InputType;

  /**
   * Form field label
   */
  label: string;

  /**
   * Form field name
   */
  name: string;

  /**
   * Input's value
   */
  value: string;

  /**
   * Input type
   * @default "text"
   */
  type?: FormFieldType;

  /**
   * Input's mode (defines what kind of input mode browser should present to the user)
   * @default: {@link InputMode.text}
   */
  inputMode?: InputMode;

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];

  /**
   * The input must be filled out if true
   * @default false
   */
  required?: boolean;

  /**
   * The input is un-clickable and unusable if true
   * @default false
   */
  disabled?: boolean;

  /**
   * Input's placeholder text
   */
  placeholder?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Props for the Form component
 */
export interface FormProps {

  /**
   * Form fields
   */
  formFields: FormField[];

  /**
   * Callback on Submit button
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: any) => void;

  /**
   * Submit button value
   */
  submitButtonValue: string;

  /**
   * Form fields
   */
  formTitle?: string;

  /**
   * Form fields
   */
  formDescription?: string;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Form component
 */
export const Form = (props: FormProps) => {

  const formData: {[key: string]: string} = {};
  props.formFields.forEach((item) => {
    formData[item.label] = "";
  });

  return (
    <>
      <form
        role="form"
        className={clsx(styles.form, props.className)}
      >
        {props.formTitle &&
        <Title
          level={HeadingLevel.h2}
          text={props.formTitle}
          placeholder=""
          className={styles.formTitle}
        />
        }
        {props.formDescription &&
        <Title
          level={HeadingLevel.h3}
          text={props.formDescription}
          placeholder=""
          className={styles.formDescription}
        />
        }
        {props.formFields.map((field) => (
          <label
            key={field.id}
            className={styles.label}
          >
            {field.name}
            <Input
              type={field.type}
              required={field.required}
              disabled={field.disabled}
              placeholder={field.placeholder}
              value={field.value}
              typeInput={field.typeInput ?? InputType.Line}
              onChange={(value: string) => {
                formData[field.label] = value;
              }}
              inputMode={field.inputMode}
              dataCy={field.dataCy}
            />
          </label>
        ))}
        <Dialog>
          <DialogClose asChild>
            <Button
              onClick={(event) => {
                event.preventDefault();
                props.onSubmit(formData);
              }}
              value={props.submitButtonValue}
              dataCy={props.dataCy}
            />
          </DialogClose>
        </Dialog>
      </form>
    </>
  );
};

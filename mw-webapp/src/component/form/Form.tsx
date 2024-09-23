import {useState} from "react";
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

}

/**
 * Props for the Form component
 */
interface FormProps {

  /**
   * Form fields
   */
  formFields: FormField[];

  /**
   * Callback on Submit button
   */
  onSubmit: () => void;

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
  const [formData, setFormData] = useState<FormField[]>(props.formFields);

  return (
    <>

      <form className={clsx(styles.form, props.className)}>
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
        {formData.map((field) => (
          <label
            key={field.id}
            className={styles.label}
          >
            {field.label}
            <Input
              type={field.type}
              required={field.required}
              disabled={field.disabled}
              placeholder={field.placeholder}
              value={field.value}
              typeInput={field.typeInput ?? InputType.Line}
              onChange={(value: string) => {
                const updatedFormData: FormField[] = formData.map((item: FormField) => {
                  return item.label === field.label
                    ? {...item, value}
                    : item;
                });

                setFormData(updatedFormData);
              }}
              inputMode={field.inputMode}
            />
          </label>
        ))}

        <Button
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line no-console
            console.log(formData);
            props.onSubmit();
          }}
          value={props.submitButtonValue}
        />
      </form>
    </>
  );
};

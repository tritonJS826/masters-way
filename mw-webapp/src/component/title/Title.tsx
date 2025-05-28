import {useEffect, useState} from "react";
import {Heading} from "@radix-ui/themes";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import {updateValueWithValidatorsHandler} from "src/utils/validatorsValue/updateValueWithValidatorsHandler";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
import styles from "src/component/title/Title.module.scss";

/**
 * Enum representing HTML heading levels.
 */
export enum HeadingLevel {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyInput?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTitleContainer?: string;

}

/**
 * Title props
 */
interface TitleProps {

  /**
   * Heading level
   */
  level: HeadingLevel;

  /**
   * Additional custom class name for the component
   */
  classNameHeading?: string;

  /**
   * Additional custom class name for the component wrapper
   */
  className?: string;

  /**
   * Title
   */
  text: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish?: (value: string) => void;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default false
   */
  isEditable?: boolean;

  /**
   * Looks like it used only for logo. If logo does not use Title anymore, we can remove it
   */
  onClick?: () => void;

  /**
   * Data attribute for cypress testing
   */
  cy?: Cy;

  /**
   * Showed if value is an empty string
   */
  placeholder: string;

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];

  /**
   * Max character count
   */
  maxCharacterCount?: number;
}

/**
 * Render Input or heading depend on client actions
 */
export const Title = (props: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(props.text);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    if (!props.onChangeFinish) {
      throw Error("Unavailable edit title");
    }

    const iValidatedValue = updateValueWithValidatorsHandler({
      updatedValue: text.trim(),
      validators: props.validators,
      setValue: setText,
    });

    iValidatedValue && props.onChangeFinish(text.trim());
    iValidatedValue && setIsEditing(false);
  };

  const isEditButtonVisible = props.isEditable && !isEditing;
  const isCharacterCountExceeded = props.maxCharacterCount ? text.length >= props.maxCharacterCount : false;

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      handleChangeFinish();
    }
  };

  /**
   * OnChangeInput
   */
  const onChangeInput = (value: string) => {
    setText(value);
  };

  /**
   * Prevents blur event when interacting with footer buttons to keep editing mode active
   */
  const preventBlurOnFooterInteractionAndHandleChangeFinish = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget?.closest(`.${styles.editableTextAreaFooter}`)) {
      return;
    }
    handleChangeFinish();
  };

  return (
    <div
      onDoubleClick={() => {
        props.isEditable && setIsEditing(true);
      }}
      onBlur={preventBlurOnFooterInteractionAndHandleChangeFinish}
      onKeyDown={handleEnter}
      className={clsx(props.className)}
      data-cy={props.cy?.dataCyTitleContainer}
    >
      <div className={styles.textContainer}>
        {isEditing
          ? (
            <>
              <Input
                type="text"
                value={text}
                autoFocus={true}
                onChange={onChangeInput}
                dataCy={props.cy?.dataCyInput}
                maxLength={props.maxCharacterCount}
              />
              <HorizontalContainer className={styles.editableTextAreaFooter}>
                {props.maxCharacterCount && (
                  <div className={clsx(styles.characterCount, {[styles.characterCountExceeded]: isCharacterCountExceeded})}>
                    {`${props.maxCharacterCount - text.length}`}
                  </div>
                )}
                <Button
                  icon={
                    <Icon
                      size={IconSize.SMALL}
                      name="CheckIcon"
                    />
                  }
                  onClick={handleChangeFinish}
                  buttonType={ButtonType.ICON_BUTTON}
                />
              </HorizontalContainer>
            </>
          )
          : (
            <>
              <div className={styles.clampedText}>
                <Heading
                  onClick={props.onClick}
                  as={props.level}
                  className={clsx(styles.heading, props.classNameHeading)}
                >
                  {text === "" ? props.placeholder : text}
                </Heading>
              </div>
              {isEditButtonVisible && (
                <div className={styles.editButton}>
                  <Button
                    icon={
                      <Icon
                        size={IconSize.SMALL}
                        name="PenToolIcon"
                      />
                    }
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    buttonType={ButtonType.ICON_BUTTON}
                  />
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};

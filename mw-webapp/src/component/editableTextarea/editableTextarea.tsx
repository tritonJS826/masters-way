import {useEffect, useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {Emoji, EmojiPickerPopover} from "src/component/emojiPickerPopover/EmojiPickerPopover";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Text} from "src/component/text/Text";
import {Textarea} from "src/component/textarea/Textarea";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {KeySymbols} from "src/utils/KeySymbols";
import {updateValueWithValidatorsHandler} from "src/utils/validatorsValue/updateValueWithValidatorsHandler";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
import styles from "src/component/editableTextarea/editableTextarea.module.scss";

/**
 * Data attributes for cypress testing
 */
interface CyEditableTextarea {

  /**
   * Data attributes for cypress testing
   */
  textArea: string;

  /**
   * Data attributes for cypress testing
   */
  trigger: string;
}

/**
 * Cell item props
 */
interface EditableTextareaProps {

  /**
   * Cell item's text
   */
  text: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: string) => void;

  /**
   * Class name for the editable input
   */
  className?: string;

  /**
   * Textarea placeholder text
   */
  placeholder: string;

  /**
   * Textarea rows.
   * @default 2
   */
  rows?: number;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default true
   */
  isEditable?: boolean;

  /**
   * Data attributes for cypress testing
   */
  cy?: CyEditableTextarea;

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];

  /**
   * Max text length value
   */
  maxCharacterCount?: number;
}

const MAX_EMOJI_LENGTH = 6;

/**
 * EditableTextarea component
 */
export const EditableTextarea = (props: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const isEmptyText = text.toString().trim() === "";

  const isEditButtonVisible = props.isEditable && !isEditing;
  const isCharacterCountExceeded = props.maxCharacterCount
    ? text.length >= props.maxCharacterCount
    : false;
  const isEmojiPickerDisabled = props.maxCharacterCount
    ? text.length >= props.maxCharacterCount - MAX_EMOJI_LENGTH
    : false;

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(text);
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleCtrlEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if ((event.key === KeySymbols.ENTER && event.ctrlKey) || (event.key === KeySymbols.ENTER && event.shiftKey)) {
      handleChangeFinish();
    }
  };

  /**
   * OnChangeInput
   */
  const onChangeInput = (value: string) => {
    updateValueWithValidatorsHandler({
      updatedValue: value,
      validators: props.validators,
      setValue: setText,
    });
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

  /**
   * Render Textarea
   */
  const renderTextarea = () => (
    <VerticalContainer className={styles.editableTextareaActive}>
      <Textarea
        cy={props.cy?.textArea}
        defaultValue={text}
        onChange={onChangeInput}
        placeholder={props.placeholder}
        rows={props.rows}
        isAutofocus
        maxCharacterCount={props.maxCharacterCount}
      />
      <HorizontalContainer className={styles.editableTextAreaFooter}>
        {props.maxCharacterCount && (
          <div className={clsx(styles.characterCount, {[styles.characterCountExceeded]: isCharacterCountExceeded})}>
            {`${props.maxCharacterCount - text.length}`}
          </div>
        )}

        <EmojiPickerPopover
          onEmojiSelect={(emoji: Emoji) => {
            const newText = text + emoji.native;
            setText(newText);
            props.onChangeFinish(newText);
          }}
          disabled={isEmojiPickerDisabled}
        />

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
    </VerticalContainer>
  );

  /**
   * Render Edit Button
   */
  const renderEditButton = () => (
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
  );

  return (
    <div
      onDoubleClick={() => {
        props.isEditable !== false && setIsEditing(true);
      }}
      onBlur={preventBlurOnFooterInteractionAndHandleChangeFinish}
      onKeyDown={handleCtrlEnter}
      className={clsx(styles.editableTextarea, props.className)}
      role="trigger"
      data-cy={props.cy?.trigger}
    >

      {isEditing
        ? renderTextarea()
        : (
          <Text text={isEmptyText ? props.placeholder : text} />
        )}

      {isEditButtonVisible && (
        renderEditButton()
      )}
    </div>
  );
};


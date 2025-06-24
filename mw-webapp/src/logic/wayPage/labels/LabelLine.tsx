import {observer} from "mobx-react-lite";
import {ColorPicker} from "src/component/colorPicker/ColorPicker";
import {EditableText} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Label} from "src/component/label/Label";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Trash} from "src/component/trash/Trash";
import {LabelDAL} from "src/dataAccessLogic/LabelDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {DEBOUNCE_DELAY_MILLISECONDS} from "src/logic/FilterSettings";
import {Label as LabelModel} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {debounce} from "src/utils/debounce";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/wayPage/labels/LabelLine.module.scss";

const MAX_LENGTH_LABEL = 30;
const MIN_LENGTH_LABEL = 1;

/**
 * Props for LabelLine
 */
interface LabelLineProps {

  /**
   * Label
   */
  label: LabelModel;

  /**
   * Is label editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback triggered on remove label
   */
  onRemoveLabel: (labelUuid: string) => void;

}

/**
 * Line to edit label
 */
export const LabelLine = observer((props: LabelLineProps) => {
  const {language} = languageStore;

  /**
   * Update label
   */
  const updateLabel = async (labelToUpdate: PartialWithUuid<LabelModel>) => {
    await LabelDAL.updateLabel(labelToUpdate);
  };

  const updateLabelDebounced = debounce(updateLabel, DEBOUNCE_DELAY_MILLISECONDS);

  return (
    <HorizontalContainer className={styles.labelLine}>
      <div className={styles.labelContainer}>
        <Label
          label={props.label}
          onChangeValue={(name) => {
            props.label.updateName(name);
            updateLabelDebounced({
              uuid: props.label.uuid,
              name,
            });
          }}
          isEditable={props.isEditable}
          validators={[
            minLengthValidator(MIN_LENGTH_LABEL, LanguageService.way.notifications.labelMinLength[language]),
            maxLengthValidator(MAX_LENGTH_LABEL, LanguageService.way.notifications.labelMaxLength[language]),
          ]}
          className={styles.editableLabel}
        />
      </div>

      <EditableText
        value={props.label.description}
        onChangeFinish={(description) => {
          props.label.updateDescription(description);
          updateLabelDebounced({
            uuid: props.label.uuid,
            description,
          });
        }}
        isEditable={props.isEditable}
        className={styles.labelDescription}
        placeholder={LanguageService.common.emptyMarkdownAction[language]}
      />

      <HorizontalContainer className={styles.actionButtons}>
        <ColorPicker
          color={props.label.color}
          onChange={(updatedColor: string) => {
            props.label.updateColor(updatedColor);
            updateLabelDebounced({
              uuid: props.label.uuid,
              color: updatedColor,
            });
          }}
        />

        {props.isEditable && (
          <Trash
            onOk={() => props.onRemoveLabel(props.label.uuid)}
            okText={LanguageService.modals.confirmModal.deleteButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
            confirmContent={LanguageService.way.filterBlock.deleteLabelQuestion[language]
              .replace("$label", `"${props.label.name}"`)}
            tooltipContent={LanguageService.way.filterBlock.deleteFromLabels[language]}
            tooltipPosition={PositionTooltip.LEFT}
          />
        )}
      </HorizontalContainer>

    </HorizontalContainer>
  );
});

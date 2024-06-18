import {TrashIcon} from "@radix-ui/react-icons";
import {observer} from "mobx-react-lite";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableText} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Label} from "src/component/label/Label";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {LabelDAL} from "src/dataAccessLogic/LabelDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Label as LabelModel} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {debounce} from "src/utils/debounce";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import styles from "src/logic/wayPage/labels/LabelLine.module.scss";

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
  const DEBOUNCE_DELAY_MILLISECONDS = 1000;

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
        <Label label={props.label} />
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

      {/* Move to color picker component */}
      <input
        type="color"
        value={props.label.color}
        onChange={(event) => {
          props.label.updateColor(event.target.value);
          updateLabelDebounced({
            uuid: props.label.uuid,
            color: event.target.value,
          });
        }}
      />

      {/* remove button */}
      {props.isEditable && (
        <Tooltip
          content={LanguageService.way.filterBlock.deleteFromJobTags[language]}
          position={PositionTooltip.LEFT}
        >
          <Confirm
            trigger={<TrashIcon className={styles.icon} />}
            content={<p>
              {LanguageService.way.filterBlock.deleteJobTagQuestion[language].replace("$jobTag", `"${props.label.name}"`)}
            </p>}
            onOk={() => props.onRemoveLabel(props.label.uuid)}
            okText={LanguageService.modals.confirmModal.deleteButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
          />
        </Tooltip>
      )}

    </HorizontalContainer>

  );
});

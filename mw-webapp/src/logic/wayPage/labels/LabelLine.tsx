import {TrashIcon} from "@radix-ui/react-icons";
import {observer} from "mobx-react-lite";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableText} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {Label} from "src/logic/wayPage/labels/label/Label";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
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
  label: JobTag;

  /**
   * Is label editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback triggered on remove label
   */
  onRemoveLabel: (labelUuid: string) => void;

  /**
   * Callback triggered on update label
   */
  onUpdateLabel: (label: JobTag) => void;
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
  const updateLabel = (label: PartialWithUuid<JobTag>) => {
    props.onUpdateLabel({...props.label, ...label});
  };

  const updateLabelDebounced = debounce(updateLabel, DEBOUNCE_DELAY_MILLISECONDS);

  return (
    <HorizontalContainer className={styles.labelLine}>
      <div className={styles.labelContainer}>
        <Label label={props.label} />
      </div>

      <EditableText
        value={props.label.description}
        onChangeFinish={(description) => updateLabelDebounced({...props.label, description})}
        isEditable={props.isEditable}
        className={styles.labelDescription}
      />

      {/* Move to color picker component */}
      <input
        type="color"
        value={props.label.color}
        onChange={(event) => updateLabelDebounced({...props.label, color: event.target.value})}
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

import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Label} from "src/component/label/Label";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {Label as LabelModel} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags.module.scss";

// Const DEFAULT_AMOUNT_TAGS = 1;

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: LabelModel[];

  /**
   * All Job done tags in way
   */
  jobTags: LabelModel[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update job done tags
   */
  updateTags: (newTags: string[]) => Promise<void>;

}

/**
 * Modal content job tags
 */
export const ModalContentJobTags = observer((props: JobDoneTagsProps) => {
  const {language} = languageStore;
  const jobDoneTagUuids = props.jobDoneTags.map(item => item.uuid);
  const [jobTagsUpdated, setJobTagsUpdated] = useState<string[]>(jobDoneTagUuids);

  const filteredJobTags = Array.from(new Set(jobTagsUpdated));

  /**
   * Remove job tag from Job done
   */
  const removeJobTagFromJobDone = (jobTagToRemove: string) => {
    const updatedJobTags = jobTagsUpdated.filter((jobTag) => jobTag !== jobTagToRemove);
    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Add job tag to Job done
   */
  const addJobTagFromJobDone = (jobTagToAdd: LabelModel) => {
    const updatedJobTags = jobTagsUpdated.concat(jobTagToAdd.uuid);
    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.updateTags(filteredJobTags);
    }
  };

  return (
    <div onKeyDown={handleEnter}>
      <div className={styles.jobTagsContainer}>
        {props.jobTags.map((tag) => {
          return (
            <div
              key={tag.uuid}
              className={styles.jobTags}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onClick={() => jobTagsUpdated.includes(tag.uuid) ? removeJobTagFromJobDone(tag.uuid!) : addJobTagFromJobDone(tag)}
            >
              <Tooltip
                content={jobTagsUpdated.includes(tag.uuid)
                  ? LanguageService.way.reportsTable.columnTooltip.deleteLabel[language]
                  : LanguageService.way.reportsTable.columnTooltip.addLabel[language]
                }
                position={PositionTooltip.BOTTOM}
              >
                <HorizontalContainer className={styles.labelWithCheckboxBlock}>
                  <Checkbox
                    isDefaultChecked={jobTagsUpdated.includes(tag.uuid)}
                    onChange={() => { }}
                    className={styles.checkbox}
                  />
                  <LabelItem label={tag} />
                </HorizontalContainer>
              </Tooltip>
            </div>
          );
        })

        }
      </div>
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value={LanguageService.modals.promptModal.cancelButton[language]}
            onClick={() => {}}
          />
        </DialogClose>
        <DialogClose asChild>
          <Button
            value={LanguageService.modals.promptModal.okButton[language]}
            onClick={() => props.updateTags(filteredJobTags)}
            buttonType={ButtonType.PRIMARY}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
});

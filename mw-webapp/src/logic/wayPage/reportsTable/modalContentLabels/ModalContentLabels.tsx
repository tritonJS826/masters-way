import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Label} from "src/component/label/Label";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {Label as LabelModel} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/wayPage/reportsTable/modalContentLabels/ModalContentLabels.module.scss";

/**
 * ModalContentLabelsProps
 */
interface ModalContentLabelsProps {

  /**
   * All labels done in way
   */
  labelsDone: LabelModel[];

  /**
   * All labels in way
   */
  labels: LabelModel[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update labels done
   */
  updateLabels: (newLabel: string[]) => Promise<void>;

}

/**
 * Modal content labels
 */
export const ModalContentLabels = observer((props: ModalContentLabelsProps) => {
  const {language} = languageStore;
  const labelsDoneUuids = props.labelsDone.map(item => item.uuid);

  const [labelsUpdated, setLabelsUpdated] = useState<string[]>(labelsDoneUuids);

  const filteredLabels = Array.from(new Set(labelsUpdated));

  /**
   * Remove label from labels done
   */
  const removeLabelFromLabelsDone = (labelToRemove: string) => {
    const updatedLabels = labelsUpdated.filter((label) => label !== labelToRemove);
    setLabelsUpdated(updatedLabels);
  };

  /**
   * Add label to labels done
   */
  const addLabelFromLabelsDone = (labelToAdd: LabelModel) => {
    const updatedLabels = labelsUpdated.concat(labelToAdd.uuid);
    setLabelsUpdated(updatedLabels);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.updateLabels(filteredLabels);
    }
  };

  return (
    <div onKeyDown={handleEnter}>
      <VerticalContainer className={styles.modalContainer}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.modals.labelsModal.title[language]}
          placeholder=""
        />
        <VerticalContainer className={styles.labelsContainer}>
          {props.labels.map((label) => {
            return (
              <div
                key={label.uuid}
                className={styles.labels}
                onClick={() => labelsUpdated.includes(label.uuid)
                  ? removeLabelFromLabelsDone(label.uuid)
                  : addLabelFromLabelsDone(label)}
              >
                <HorizontalContainer className={styles.labelContent}>
                  <div className={styles.labelContainer}>
                    <Label
                      label={label}
                      isEditable={false}
                    />
                  </div>
                  <Text
                    className={styles.labelDescription}
                    text={label.description || LanguageService.modals.labelsModal.description[language]}
                  />
                  <Checkbox
                    isDefaultChecked={labelsUpdated.includes(label.uuid)}
                    onChange={() => { }}
                    className={styles.checkbox}
                  />
                </HorizontalContainer>
              </div>
            );
          })

          }
        </VerticalContainer>
        <HorizontalContainer className={styles.labelsButtons}>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.promptModal.cancelButton[language]}
              onClick={() => {}}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.promptModal.saveButton[language]}
              onClick={() => props.updateLabels(filteredLabels)}
              buttonType={ButtonType.PRIMARY}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    </div>
  );
});

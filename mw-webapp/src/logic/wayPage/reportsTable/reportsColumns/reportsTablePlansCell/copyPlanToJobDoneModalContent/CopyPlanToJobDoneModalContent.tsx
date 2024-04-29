import {useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {getFormattedValue} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {Textarea} from "src/component/textarea/Textarea";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {getValidatedTime, MAX_TIME} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {Plan} from "src/model/businessModel/Plan";
import {LanguageService} from "src/service/LangauageService";
import {KeySymbols} from "src/utils/KeySymbols";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/\
reportsTablePlansCell/copyPlanToJobDoneModalContent/CopyPlanToJobDoneModalContent.module.scss";

/**
 * CopyPlanToJobDoneModalContent props
 */
interface CopyPlanToJobDoneModalContentProps {

  /**
   * Plan
   */
  plan: Plan;

  /**
   * Update plan
   */
  updatePlan: (plan: Plan) => void;

  /**
   * Copy plan to job in current Day Report
   */
  copyPlanToJobInCurrentDayReport: (plan: Plan) => void;

}

/**
 * Copy plan to jobDone modal content
 */
export const CopyPlanToJobDoneModalContent = (props: CopyPlanToJobDoneModalContentProps) => {
  const {language} = useGlobalContext();
  const [inputPlanJob, setInputPlanJob] = useState<string>(props.plan.description);
  const [inputPlanTime, setInputPLanTime] = useState<number>(props.plan.time);

  const onOkRef = useRef<HTMLButtonElement>(null);

  /**
   * Copy plan to jobDone OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {

      /**
       * Workaround to to close Radix modal onEnter
       */
      onOkRef.current?.click();
    }
  };

  return (
    props.plan.isDone
      ? (
        <div
          onKeyDown={handleEnter}
          className={styles.copyPlanToJobModalContainer}
        >
          {`${LanguageService.way.reportsTable.columnTooltip.planCheckboxUncheckPartOne[language]}
          "${props.plan.description}" ${LanguageService.way.reportsTable.columnTooltip.planCheckboxUncheckPartTwo[language]}?`}
          <HorizontalContainer className={styles.buttons}>
            <DialogClose asChild>
              <Button
                value={LanguageService.modals.confirmModal.cancelButton[language]}
                onClick={() => { }}
              />
            </DialogClose>
            <DialogClose asChild>
              <Button
                ref={onOkRef}
                value={LanguageService.modals.confirmModal.okButton[language]}
                onClick={() => {
                  const toggledPlan: Plan = new Plan({
                    ...props.plan,
                    isDone: !props.plan.isDone,
                  });
                  props.updatePlan(toggledPlan);
                }}
              />
            </DialogClose>
          </HorizontalContainer>
        </div>
      )
      : (
        <div
          onKeyDown={handleEnter}
          className={styles.copyPlanToJobModalContainer}
        >
          {LanguageService.way.reportsTable.modalWindow.copyPlanToJobDoneQuestion[language]}
          <VerticalContainer className={styles.inputPlan}>
            <label className={styles.label}>
              {`${LanguageService.way.reportsTable.modalWindow.descriptionTitle[language]}${Symbols.NO_BREAK_SPACE}`}
            </label>
            <Textarea
              isAutofocus={true}
              defaultValue={inputPlanJob}
              onChange={setInputPlanJob}
              className={styles.input}
            />
          </VerticalContainer>
          <VerticalContainer className={styles.inputPlan}>
            <label className={styles.label}>
              {`${LanguageService.way.reportsTable.modalWindow.timeTitle[language]}${Symbols.NO_BREAK_SPACE}`}
            </label>
            <Input
              formatter={getFormattedValue}
              value={inputPlanTime}
              type="number"
              max={MAX_TIME}
              onChange={(time) => setInputPLanTime(getValidatedTime(Number(time)))}
              typeInput={InputType.Border}
            />
          </VerticalContainer>
          <HorizontalContainer className={styles.buttons}>
            <DialogClose asChild>
              <Button
                value={LanguageService.modals.confirmModal.cancelButton[language]}
                onClick={() => {
                  const toggledPlan: Plan = new Plan({
                    ...props.plan,
                    isDone: !props.plan.isDone,
                  });
                  props.updatePlan(toggledPlan);
                }}

              />
            </DialogClose>
            <DialogClose asChild>
              <Button
                ref={onOkRef}
                value={LanguageService.way.reportsTable.modalWindow.copyToJobsDoneButton[language]}
                onClick={() => {
                  const toggledPlan: Plan = new Plan({
                    ...props.plan,
                    isDone: !props.plan.isDone,
                  });
                  const planForJob: Plan = new Plan({
                    ...props.plan,
                    isDone: !props.plan.isDone,
                    description: inputPlanJob,
                    time: inputPlanTime,
                  });

                  props.updatePlan(toggledPlan);
                  props.copyPlanToJobInCurrentDayReport(planForJob);
                }}
              />
            </DialogClose>
          </HorizontalContainer>
        </div>

      )

  );
};

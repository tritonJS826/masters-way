import {useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {getFormattedValue} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {Textarea} from "src/component/textarea/Textarea";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getValidatedTime, MAX_TIME} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {Plan} from "src/model/businessModel/Plan";
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
          {`Are you sure you want to mark the plan "${props.plan.description}" as unfulfilled?`}
          <HorizontalContainer className={styles.buttons}>
            <DialogClose asChild>
              <Button
                value="Cancel"
                onClick={() => { }}
              />
            </DialogClose>
            <DialogClose asChild>
              <Button
                ref={onOkRef}
                value="Ok"
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
          {"Are you sure you want to copy the plan to jobs done?"}
          <VerticalContainer className={styles.inputPlan}>
            <label className={styles.label}>
              {`Description:${Symbols.NO_BREAK_SPACE}`}
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
              {`Estimation time:${Symbols.NO_BREAK_SPACE}`}
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
                value="Cancel"
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
                value="Copy to jobs done"
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

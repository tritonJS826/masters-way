import {useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {makeAutoObservable} from "mobx";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {PlanDAL} from "src/dataAccessLogic/PlanDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {Metric} from "src/model/businessModel/Metric";
import {Plan} from "src/model/businessModel/Plan";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/reportsTable/generatePlansByMetricAiModal/GeneratePlansByMetricAiModal.module.scss";

/**
 * Decompose issue Ai modal props
 */
interface DecomposeIssueAiModalProps {

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Way's metrics
   */
  metrics: Metric[];

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Owner UUID
   */
  ownerUuid: string;

  /**
   * Callback to add metric
   */
  addPlan: (plan: Plan) => void;
}

/**
 * Params for {@link PlanPreview} constructor
 */
interface PlanPreviewParams {

  /**
   * Plan preview
   */
  description: string;

  /**
   * Is plan checked
   */
  isChecked: boolean;
}

/**
 * Plan preview
 */
class PlanPreview {

  /**
   * PLan's description
   */
  public description: string;

  /**
   * Is plan checked
   */
  public isChecked: boolean;

  constructor(args: PlanPreviewParams) {
    makeAutoObservable(this);
    this.description = args.description;
    this.isChecked = args.isChecked;
  }

  /**
   * Toggle isChecked property
   */
  public toggleIsChecked = () => {
    this.isChecked = !this.isChecked;
  };

}

/**
 * Generate plans by metric Ai modal
 */
export const GeneratePlansByMetricAiModal = (props: DecomposeIssueAiModalProps) => {
  const [chosenMetric, setChosenMetric] = useState<Metric | null>();
  const [generatedPansPreview, setGeneratedPlansPreview] = useState<PlanPreview[]>([]);
  const {theme} = themeStore;
  const {language} = languageStore;

  /**
   * Generate palns by metric using AI
   */
  const generatePlansByMetricAi = async (metric: string) => {
    const plansPreviewRaw = await AIDAL.aiPlansByMetrics({
      goal: props.goalDescription,
      metric,
    });

    const plansPreview = plansPreviewRaw.map(planPreview => new PlanPreview({
      description: planPreview,
      isChecked: false,
    }));

    setGeneratedPlansPreview(plansPreview);
  };

  /**
   * Save all selected plans
   */
  const applyAllSelectedPlansPreview = async () => {
    const checkedGeneratedPlansPreview = generatedPansPreview.filter(planPreview => planPreview.isChecked);

    const updateMetricsPromises = checkedGeneratedPlansPreview.map(async (planPreview) => {
      const newPlan = await PlanDAL.createPlan({
        dayReportUuid: props.dayReportUuid,
        ownerUuid: props.ownerUuid,
        description: `***AI:*** ${planPreview.description}`,
      });

      return newPlan;
    });

    const plans = await Promise.all(updateMetricsPromises);

    plans.forEach(props.addPlan);
  };

  return props.metrics.length === 0
    ? (
      <p>
        You have not metrics for generate plans
      </p>
    )
    : (
      <VerticalContainer className={styles.decomposeIssueAiModal}>
        {props.metrics.map(metric => (
          <HorizontalContainer key={metric.description}>
            <Checkbox
              onChange={() => setChosenMetric(metric)}
              isDefaultChecked={metric.uuid === chosenMetric?.uuid}
            />
            {metric.description}
          </HorizontalContainer>))
        }
        <HorizontalContainer>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.confirmModal.cancelButton[language]}
              onClick={() => {}}
            />
          </DialogClose>
          <Modal
            trigger={
              <DialogClose asChild>
                <Button
                  value={LanguageService.way.reportsTable.generatePlansByAI[language]}
                  onClick={() => {
                    chosenMetric && generatePlansByMetricAi(chosenMetric.description);
                  }}
                  isDisabled={!chosenMetric}
                />
              </DialogClose>
            }
            content={generatedPansPreview.length === 0
              ? (
                <Loader theme={theme} />
              )
              : (
                <VerticalContainer className={styles.decomposeIssueAiModal}>
                  {generatedPansPreview.map(generatedMetric => (
                    <HorizontalContainer key={generatedMetric.description}>
                      <Checkbox onChange={generatedMetric.toggleIsChecked} />
                      {generatedMetric.description}
                    </HorizontalContainer>))}
                  <HorizontalContainer>
                    <DialogClose asChild>
                      <Button
                        value={LanguageService.modals.confirmModal.cancelButton[language]}
                        onClick={() => {}}
                      />
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        value={LanguageService.way.reportsTable.addGeneratedPlansToPlans[language]}
                        onClick={applyAllSelectedPlansPreview}
                      />
                    </DialogClose>
                  </HorizontalContainer>
                </VerticalContainer>
              )
            }
          />
        </HorizontalContainer>
      </VerticalContainer>
    );
};

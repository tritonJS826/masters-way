import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {makeAutoObservable} from "mobx";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock.module.scss";

/**
 * MetricsAiModal props
 */
interface MetricsAiModalProps {

    /**
     * Goal description
     */
    goalDescription: string;

    /**
     * Existent metrics
     */
    goalMetrics: Metric[];

    /**
     * Way name
     */
    wayName: string;

    /**
     * Way uuid
     */
    wayUuid: string;

    /**
     * Callback to add metric
     */
    addMetric: (metric: Metric) => void;
}

/**
 * Params for {@link GoalMetricPreview} constructor
 */
interface GoalMetricPreviewParams {

    /**
     * Goal metric preview
     */
    description: string;

    /**
     * Is metric checked
     */
    isChecked: boolean;
  }

/**
 * Goal metric preview
 */
class GoalMetricPreview {

  /**
   * Metric description
   */
  public description: string;

  /**
   * Is metric checked
   */
  public isChecked: boolean;

  constructor(args: GoalMetricPreviewParams) {
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
 * Content for metrics Ai modal
 */
export const MetricsAiModal = (props: MetricsAiModalProps) => {
  const [generatedMetricsPreview, setGeneratedMetricsPreview] = useState<GoalMetricPreview[]>([]);
  const [isGeneratingMetrics, setIsGeneratingMetrics] = useState<boolean>(true);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);
  const {theme} = themeStore;
  const {language} = languageStore;

  /**
   * Generate AI metrics
   */
  const generateAIMetrics = async () => {
    try {
      const metricsPreviewRaw = await AIDAL.generateMetrics({
        goalDescription: props.goalDescription,
        metrics: props.goalMetrics,
        wayName: props.wayName,
        language,
      });

      const metricsPreview = metricsPreviewRaw.map(metricPreview => new GoalMetricPreview({
        description: metricPreview,
        isChecked: false,
      }));

      setGeneratedMetricsPreview(metricsPreview);
    } catch (error) {
      setIsErrorCatched(true);

      //TODO: need manage error somehow
      throw error;
    } finally {
      setIsGeneratingMetrics(false);
    }

  };

  useEffect(() => {
    generateAIMetrics();
  }, []);

  /**
   * Save all selected metrics
   */
  const applyAllSelectedMetricsPreview = async () => {
    const checkedGeneratedMetricsPreview = generatedMetricsPreview.filter(metricPreview => metricPreview.isChecked);

    const updateMetricsPromises = checkedGeneratedMetricsPreview.map(async (metricPreview) => {
      const newMetric = await MetricDAL.createMetric({
        wayUuid: props.wayUuid,
        description: metricPreview.description,
        parentUuid: null,
      });

      return newMetric;
    });

    const metrics = await Promise.all(updateMetricsPromises);

    metrics.forEach(props.addMetric);
  };

  return (
    <VerticalContainer>
      {isGeneratingMetrics && !isErrorCatched &&
      <Loader theme={theme} />
      }
      {isErrorCatched &&
      <Title
        level={HeadingLevel.h2}
        placeholder=""
        text={LanguageService.error.onClickError[language]}
      />
      }
      {generatedMetricsPreview.length > 0 &&
        (
          <VerticalContainer
            className={styles.generatedMetricsList}
            dataCy={wayMetricsAccessIds.metricsAiGeneratedDialog.dialogWindow}
          >
            {generatedMetricsPreview.map(generatedMetric => (
              <HorizontalContainer
                key={generatedMetric.description}
                dataCy={wayMetricsAccessIds.metricsAiGeneratedDialog.generatedMetric}
              >
                <Checkbox
                  onChange={generatedMetric.toggleIsChecked}
                  dataCy={wayMetricsAccessIds.metricsAiGeneratedDialog.metricCheckbox}
                />
                {generatedMetric.description}
              </HorizontalContainer>))}
            <HorizontalContainer>
              <DialogClose asChild>
                <Button
                  value={LanguageService.modals.confirmModal.cancelButton[language]}
                  onClick={() => { }}
                />
              </DialogClose>
              <DialogClose asChild>
                <Button
                  value={LanguageService.way.metricsBlock.addNewGoalMetricsButton[language]}
                  onClick={applyAllSelectedMetricsPreview}
                  dataCy={wayMetricsAccessIds.metricsAiGeneratedDialog.addSelectedMetricsButton}
                />
              </DialogClose>
            </HorizontalContainer>
          </VerticalContainer>
        )
      }
    </VerticalContainer>
  );
};

import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {makeAutoObservable} from "mobx";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {PlanDAL} from "src/dataAccessLogic/PlanDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {Plan} from "src/model/businessModel/Plan";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/wayPage/reports/aiModal/decomposeIssueAiModal/DecomposeIssueAiModal.module.scss";

/**
 * Decompose issue Ai modal props
 */
interface DecomposeIssueAiModalProps {

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Issue description
   */
  issueDescription: string;

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
 * Content for decompose issue Ai modal
 */
export const DecomposeIssueAiModal = (props: DecomposeIssueAiModalProps) => {
  const [generatedPansPreview, setGeneratedPlansPreview] = useState<PlanPreview[]>([]);
  const {theme} = themeStore;
  const {language} = languageStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Decompose issue by using AI
   */
  const decomposeIssueAi = async () => {
    const plansPreviewRaw = await AIDAL.aiDecomposeIssue({
      goal: props.goalDescription,
      message: props.issueDescription,
      language,
    });

    const plansPreview = plansPreviewRaw.map(planPreview => new PlanPreview({
      description: planPreview,
      isChecked: false,
    }));
    user.profileSetting.decreaseCoins(plansPreview.length);
    setGeneratedPlansPreview(plansPreview);
  };

  useEffect(() => {
    decomposeIssueAi();
  }, []);

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

  return generatedPansPreview.length === 0
    ? (
      <Loader theme={theme} />
    )
    : (
      <VerticalContainer className={styles.decomposeIssueAiModal}>
        {generatedPansPreview.map(generatedMetric => (
          <HorizontalContainer key={generatedMetric.description}>
            <Checkbox onChange={generatedMetric.toggleIsChecked} />
            {renderMarkdown(generatedMetric.description)}
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
    );
};

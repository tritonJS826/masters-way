import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/wayPage/reports/aiModal/estimateIssueAiModal/EstimateIssueAiModal.module.scss";

const DEFAULT_ESTIMATE_AMOUNT_TO_GENERATE = 1;

/**
 * Estimate issue Ai modal props
 */
interface EstimateIssueAiModalProps {

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Issue description
   */
  issueDescription: string;

}

/**
 * Content for estimate issue Ai modal
 */
export const EstimateIssueAiModal = (props: EstimateIssueAiModalProps) => {
  const [generatedEstimateMessage, setGeneratedEstimateMessage] = useState<string>("");
  const {theme} = themeStore;
  const {language} = languageStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Estimate issue by using AI
   */
  const estimateIssueAi = async () => {
    const estimatedMessage = await AIDAL.aiEstimateIssue({
      goal: props.goalDescription,
      issue: props.issueDescription,
      language,
    });
    user.profileSetting.decreaseCoins(DEFAULT_ESTIMATE_AMOUNT_TO_GENERATE);
    setGeneratedEstimateMessage(estimatedMessage);
  };

  useEffect(() => {
    estimateIssueAi();
  }, []);

  return generatedEstimateMessage.length === 0
    ? (
      <Loader theme={theme} />
    )
    : (
      <VerticalContainer className={styles.estimatedMessageModal}>
        {renderMarkdown(generatedEstimateMessage)}
        <HorizontalContainer>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.confirmModal.cancelButton[language]}
              onClick={() => {}}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    );
};

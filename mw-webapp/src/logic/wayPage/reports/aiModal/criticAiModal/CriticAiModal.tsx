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
import styles from "src/logic/wayPage/reports/aiModal/commentIssueAiModal/CommentIssueAiModal.module.scss";

const DEFAULT_COMMENT_AMOUNT_TO_GENERATE = 1;

/**
 * Critic Ai modal props
 */
interface CriticAiModalProps {

  /**
   * Way's goal description
   */
  goalDescription?: string;

  /**
   * Plan, job done or comment description to criticize
   */
  message: string;

  /**
   * Callback to add comment
   */
  addComment: (comment: string) => void;
}

/**
 * Content for critic Ai modal
 */
export const CriticAiModal = (props: CriticAiModalProps) => {
  const [generatedComment, setGeneratedComment] = useState<string>("");
  const {theme} = themeStore;
  const {language} = languageStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Criticize the item by AI
   */
  const criticizeAi = async () => {
    const criticPrompt = props.goalDescription
      ? LanguageService.way.reportsTable.criticPromptWithGoalTemplate[language]
        .replace("{goal}", props.goalDescription)
        .replace("{message}", props.message)
      : LanguageService.way.reportsTable.criticPromptWithoutGoalTemplate[language]
        .replace("{message}", props.message);

    const comment = await AIDAL.aiChat(criticPrompt, language);
    user.profileSetting.decreaseCoins(DEFAULT_COMMENT_AMOUNT_TO_GENERATE);
    setGeneratedComment(comment);
  };

  useEffect(() => {
    criticizeAi();
  }, []);

  return generatedComment.length === 0
    ? (
      <Loader theme={theme} />
    )
    : (
      <VerticalContainer className={styles.commentIssueAiModal}>
        {renderMarkdown(generatedComment)}
        <HorizontalContainer>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.confirmModal.cancelButton[language]}
              onClick={() => {}}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              value={LanguageService.way.reportsTable.addGeneratedMessageToComments[language]}
              onClick={() => props.addComment(generatedComment)}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    );
};

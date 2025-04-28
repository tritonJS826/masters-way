import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/wayPage/reports/aiModal/commentIssueAiModal/CommentIssueAiModal.module.scss";

/**
 * Comment issue Ai modal props
 */
interface CommentIssueAiModalProps {

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Goal description
   */
  problemDescription: string;

  /**
   * Callback to add metric
   */
  addComment: (comment: string) => void;
}

/**
 * Content for comment issue Ai modal
 */
export const CommentIssueAiModal = (props: CommentIssueAiModalProps) => {
  const [generatedComment, setGeneratedComment] = useState<string>("");
  const {theme} = themeStore;
  const {language} = languageStore;

  /**
   * Comment issue by AI
   */
  const commentIssueAi = async () => {
    const comment = await AIDAL.aiCommentIssue({
      goal: props.goalDescription,
      message: props.problemDescription,
      language,
    });

    setGeneratedComment(comment);
  };

  useEffect(() => {
    commentIssueAi();
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

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
import styles from "src/logic/wayPage/reports/aiModal/commentIssueAiModal/CommentIssueAiModal.module.scss";

const DEFAULT_COMMENT_AMOUNT_TO_GENERATE = 1;

/**
 * Chat Ai modal props
 */
interface ChatAiModalProps {

  /**
   * Comment
   */
  message: string;

  /**
   * Callback to add metric
   */
  addComment: (comment: string) => void;
}

/**
 * Content for chat Ai modal
 */
export const ChatAiModal = (props: ChatAiModalProps) => {
  const [generatedComment, setGeneratedComment] = useState<string>("");
  const {theme} = themeStore;
  const {language} = languageStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Comment issue by AI
   */
  const commentMessageAi = async () => {
    const comment = await AIDAL.aiChat(props.message, language);
    user.profileSetting.decreaseCoins(DEFAULT_COMMENT_AMOUNT_TO_GENERATE);
    setGeneratedComment(comment);
  };

  useEffect(() => {
    commentMessageAi();
  }, []);

  return generatedComment.length === 0
    ? (
      <Loader theme={theme} />
    )
    : (
      <VerticalContainer className={styles.commentIssueAiModal}>
        {generatedComment}
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

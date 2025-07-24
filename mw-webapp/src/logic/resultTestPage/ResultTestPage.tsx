import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {downloadResultTestPdf} from "src/logic/resultTestPage/renderResultTestToPdf/downloadResultTest";
import {ResultsTableBlock} from "src/logic/resultTestPage/resultsTestTable/ResultsTableBlock";
import {ResultTestPageStore} from "src/logic/resultTestPage/ResultTestPageStore";
import {TrainingAiModal} from "src/logic/resultTestPage/trainingAiModal/TrainingAiModal";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {ArrayUtils} from "src/utils/ArrayUtils";
import styles from "src/logic/resultTestPage/ResultTestPage.module.scss";

const MAX_PERCENTAGE = 100;
const PRECISION_PERCENTAGE_RESULT = 2;

/**
 * Return percentages value
 */
const getPercentagesFromAmount = (amountToConvert: number, allAmount: number) => {
  return (amountToConvert * MAX_PERCENTAGE / allAmount).toFixed(PRECISION_PERCENTAGE_RESULT);
};

/**
 * Unique participant
 */
interface UniqueParticipant {

  /**
   * User's UUID
   */
  userUuid: string;

  /**
   * User's image url
   */
  userImageUrl: string;

  /**
   * User's name
   */
  userName: string;

  /**
   * Right answers amount
   */
  rightAnswersAmount: number;

  /**
   * Wrong answers amount
   */
  wrongAnswersAmount: number;
}

/**
 * RunningTestPage props
 */
interface ResultTestPageProps {

  /**
   * Test's Uuid
   */
  testUuid: string;

  /**
   * Session's Uuid
   */
  sessionUuid: string;

}

/**
 * Result test page
 */
export const ResultTestPage = observer((props: ResultTestPageProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const navigate = useNavigate();
  const [isOpenGenerateTrainingModal, setIsOpenGenerateTrainingModal] = useState<boolean>(false);

  const resultTestPageStore = useStore<
  new (sessionId: string) => ResultTestPageStore,
  [string], ResultTestPageStore>({
      storeForInitialize: ResultTestPageStore,
      dataForInitialization: [props.sessionUuid],
      dependency: [props.sessionUuid],
    });

  if (!resultTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const rightAnswersAmount = resultTestPageStore.questionResults.filter(result => result.isOk).length;
  const rightAnswersPercentages = (rightAnswersAmount * MAX_PERCENTAGE / resultTestPageStore.questionResults.length)
    .toFixed(PRECISION_PERCENTAGE_RESULT);

  const answersData: UniqueParticipant[] = ArrayUtils
    .removeDuplicatesByField(resultTestPageStore.questionResults, "uuid")
    .map(question =>
      ({
        userUuid: question.userUuid,
        userName: question.userName,
        userImageUrl: question.userImageUrl,
        rightAnswersAmount: resultTestPageStore.questionResults
          .filter(q => q.isOk && q.userUuid === question.userUuid)
          .length,
        wrongAnswersAmount: resultTestPageStore.questionResults
          .filter(q => !q.isOk && q.userUuid === question.userUuid)
          .length,
      }),
    );

  return (
    <VerticalContainer className={styles.resultsContainer}>
      <VerticalContainer className={styles.resultHeaderContainer}>
        <Link path={pages.lobbyTest.getPath({uuid: resultTestPageStore.sessionResult.testUuid})}>
          <Title
            level={HeadingLevel.h2}
            text={LanguageService.resultTest.buttons.returnToLobby[language]}
            placeholder=""
            classNameHeading={styles.headingLevelH2}
          />
        </Link>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.resultTest.sessionTitle[language]}
          placeholder=""
          classNameHeading={styles.headingLevelH2}
        />
        <Text text={LanguageService.resultTest.answersAmount[language]
          .replace("$answersAmount", `${resultTestPageStore.questionResults.length}`)}
        />
        <Text text={LanguageService.resultTest.percentageResult[language]
          .replace("$rightAnswers", `${rightAnswersPercentages}`)}
        />
        <Text text={resultTestPageStore.sessionResult.resultDescription} />

        <VerticalContainer>
          {answersData.map(participant => (
            <HorizontalContainer
              key={participant.userUuid}
              className={styles.participantBlock}
            >
              <Avatar
                alt={participant.userName}
                src={participant.userImageUrl}
              />
              {participant.userName}
              <Text text={`${participant.rightAnswersAmount}
              (${getPercentagesFromAmount(participant.rightAnswersAmount,
              (participant.rightAnswersAmount + participant.wrongAnswersAmount))}%) 
              ${LanguageService.resultTest.rightAnswers[language]}`}
              />
              <Text text={`${participant.wrongAnswersAmount} 
              (${getPercentagesFromAmount(participant.wrongAnswersAmount,
              (participant.rightAnswersAmount + participant.wrongAnswersAmount))}%) 
              ${LanguageService.resultTest.wrongAnswers[language]}`}
              />
            </HorizontalContainer>
          ))}
        </VerticalContainer>

      </VerticalContainer>
      <HorizontalContainer className={styles.buttons}>
        <Button
          value={LanguageService.resultTest.buttons.downloadAsPDF[language]}
          buttonType={ButtonType.PRIMARY}
          onClick={() => downloadResultTestPdf(resultTestPageStore, language)}
        />
      </HorizontalContainer>
      <div className={styles.resultsContent}>
        <ScrollableBlock>
          <ResultsTableBlock questionResults={resultTestPageStore.questionResults} />
        </ScrollableBlock>
      </div>
      <HorizontalContainer className={styles.buttons}>
        {user &&
        <Button
          value={LanguageService.resultTest.buttons.generateTrainingWithAIButton[language]}
          onClick={() => setIsOpenGenerateTrainingModal(true)}
          buttonType={ButtonType.PRIMARY}
        />
        }
        {isOpenGenerateTrainingModal &&
        <Modal
          isOpen={isOpenGenerateTrainingModal}
          close={() => setIsOpenGenerateTrainingModal(false)}
          trigger={<></>}
          content={
            <TrainingAiModal
              onGenerateTraining={(trainingUuid) => navigate(pages.training.getPath({uuid: trainingUuid}))}
              testId={resultTestPageStore.sessionResult.testUuid}
              sessionResultId={resultTestPageStore.sessionResult.uuid}
              testSessionId={resultTestPageStore.sessionResult.sessionUuid}
              onCloseModal={(isSucceed: boolean) => {
                setIsOpenGenerateTrainingModal(false);
                displayNotification({
                  text: isSucceed
                    ? LanguageService.resultTest.notification.successGeneratedTraining[language]
                    : LanguageService.error.onClickError[language],
                  type: NotificationType.INFO,
                });
              }
              }
            />
          }
          isFitContent={false}
        />
        }
      </HorizontalContainer>

    </VerticalContainer>
  );
});

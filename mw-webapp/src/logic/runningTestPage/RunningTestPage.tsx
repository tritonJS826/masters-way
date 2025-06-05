import {useState} from "react";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {ErrorPromiseModal} from "src/component/errorPromiseModal/ErrorPromiseModal";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {QuestionDAL} from "src/dataAccessLogic/QuestionDAL";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {QuestionItem} from "src/logic/runningTestPage/questionItem/QuestionItem";
import {RunningTestPageStore} from "src/logic/runningTestPage/RunningTestPageStore";
import {Question, Test} from "src/model/businessModel/Test";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import styles from "src/logic/runningTestPage/RunningTestPage.module.scss";

const DEFAULT_QUESTION_VALUE = 1;

/**
 * Update Question params
 */
interface UpdateQuestionParams {

  /**
   * Question to update
   */
  questionToUpdate: PartialWithUuid<Question>;

  /**
   * Callback to update question
   */
  setQuestion: (question: PartialWithUuid<Question>) => void;
}

/**
 * Update Question
 */
export const updateQuestion = async (params: UpdateQuestionParams) => {
  params.setQuestion(params.questionToUpdate);
  await QuestionDAL.updateQuestion(params.questionToUpdate);
};

/**
 * Update Test params
 */
interface UpdateTestParams {

  /**
   * Test to update
   */
  testToUpdate: PartialWithUuid<Test>;

  /**
   * Callback to update Test
   */
  setTest: (test: PartialWithUuid<Test>) => void;
}

/**
 * Update Test
 */
export const updateTest = async (params: UpdateTestParams) => {
  params.setTest(params.testToUpdate);
  await TestDAL.updateTest(params.testToUpdate);
};

/**
 * RunningTestPage props
 */
interface RunningTestPageProps {

  /**
   * Test's Uuid
   */
  uuid: string;

}

/**
 * Running Test page
 */
export const RunningTestPage = observer((props: RunningTestPageProps) => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  const runningTestPageStore = useStore<
  new (testUuid: string, userUuid: string) => RunningTestPageStore,
  [string, string], RunningTestPageStore>({
      storeForInitialize: RunningTestPageStore,
      dataForInitialization: [props.uuid, user.uuid],
      dependency: [props.uuid, user.uuid],
    });

  if (!runningTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isNextButtonDisabled = runningTestPageStore.activeOrder >=
    runningTestPageStore.test.questions.length - DEFAULT_QUESTION_VALUE;
  const isPrevButtonDisabled = runningTestPageStore.activeOrder <= 0;

  return (
    <VerticalContainer className={styles.container}>
      {isErrorCatched &&
      <ErrorPromiseModal
        errorMessage={LanguageService.error.onClickError[language]}
        isErrorCatched={isErrorCatched}
        okText={LanguageService.modals.confirmModal.okButton[language]}
      />
      }
      <HorizontalGridContainer className={styles.testDashboard}>
        <VerticalContainer className={styles.testDashBoardLeft}>
          <VerticalContainer className={styles.testInfo}>
            <HorizontalContainer className={styles.testTitleBlock}>
              <Title
                level={HeadingLevel.h2}
                text={runningTestPageStore.test.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={() => {}}
                isEditable={false}
                className={styles.testName}
              />
            </HorizontalContainer>

            <VerticalContainer className={styles.descriptionSection}>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.test.testInfo.description[language]}
                placeholder={LanguageService.common.emptyMarkdownAction[language]}
              />
              <Text
                text={runningTestPageStore.test.description}
                className={styles.description}
              />
            </VerticalContainer>

            <Title
              level={HeadingLevel.h3}
              text={LanguageService.test.questionsBlock.questions[language]}
              placeholder=""
            />

            {runningTestPageStore.test.questions.map((question) => (
              <HorizontalContainer
                key={question.questionText}
                className={clsx(
                  styles.questionShortBlock,
                  runningTestPageStore.activeQuestion.uuid === question.uuid && styles.active,
                )}
              >
                {question.questionText.trim() === ""
                  ? LanguageService.common.emptyMarkdown[language]
                  : <Text text={question.questionText} />
                }

              </HorizontalContainer>
            ),
            )}

          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.questions}>
          <VerticalContainer className={styles.theoryMaterials}>
            <QuestionItem
              question={runningTestPageStore.activeQuestion}
              testSessionUuid={runningTestPageStore.testSessionUuid}
              userUuid={user?.uuid ?? "000"}
            />
          </VerticalContainer>

          <HorizontalContainer className={styles.questionButtons}>

            <Button
              value={"Prev"}
              onClick={() => runningTestPageStore.prevQuestion()}
              buttonType={ButtonType.SECONDARY}
              isDisabled={isPrevButtonDisabled}
            />

            <Button
              value={"Next"}
              onClick={() => runningTestPageStore.nextQuestion()}
              buttonType={ButtonType.PRIMARY}
              isDisabled={isNextButtonDisabled}
            />
          </HorizontalContainer>
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

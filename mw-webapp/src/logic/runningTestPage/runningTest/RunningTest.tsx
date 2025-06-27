import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useStore} from "src/hooks/useStore";
import {QuestionItem} from "src/logic/runningTestPage/questionItem/QuestionItem";
import {RunningTestStore} from "src/logic/runningTestPage/runningTest/RunningTestStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/runningTestPage/runningTest/RunningTest.module.scss";

const DEFAULT_QUESTION_VALUE = 1;

/**
 * RunningTest props
 */
interface RunningTestProps {

  /**
   * Test's Uuid
   */
  testUuid: string;

  /**
   * Session's Uuid
   */
  sessionUuid: string;

  /**
   * User's uuid
   */
  userUuid: string;
}

/**
 * Running Test
 */
export const RunningTest = observer((props: RunningTestProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;

  const runningTestStore = useStore<
  new (testUuid: string) => RunningTestStore,
  [string, string], RunningTestStore>({
      storeForInitialize: RunningTestStore,
      dataForInitialization: [props.testUuid],
      dependency: [props.testUuid, props.userUuid],
    });

  if (!runningTestStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isLastQuestion = runningTestStore.activeOrder >=
    runningTestStore.test.questions.length - DEFAULT_QUESTION_VALUE;
  const isFirstQuestion = runningTestStore.activeOrder <= 0;

  const isAllQuestionAnswered = runningTestStore.questionResults.size === runningTestStore.test.questions.length;

  return (
    <HorizontalGridContainer className={styles.testDashboard}>
      <VerticalContainer className={styles.testDashBoardLeft}>
        <VerticalContainer className={styles.testInfo}>
          <HorizontalContainer className={styles.testTitleBlock}>
            <Title
              level={HeadingLevel.h2}
              text={runningTestStore.test.name}
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
              text={runningTestStore.test.description}
              className={styles.description}
            />
          </VerticalContainer>

          <Title
            level={HeadingLevel.h3}
            text={LanguageService.test.questionsBlock.questions[language]}
            placeholder=""
          />

          <ol className={styles.questionsShortList}>
            {runningTestStore.test.questions.map((question) => (
              <HorizontalContainer
                key={question.uuid}
                className={clsx(
                  styles.questionShortBlock,
                  runningTestStore.activeQuestion.uuid === question.uuid && styles.active,
                )}
                onClick={() => {
                  runningTestStore.setActiveQuestionOrder(question.order);
                  runningTestStore.setActiveQuestion(question.uuid);
                }}
              >
                <li className={styles.numberedListItem}>
                  {`${question.order}.`}
                  {question.name.trim() === ""
                    ? LanguageService.common.emptyMarkdown[language]
                    : (
                      <HorizontalContainer className={styles.shortQuestion}>
                        <Text text={question.name} />
                        {runningTestStore.questionResults.get(question.uuid) &&
                          <Icon
                            name="CheckIcon"
                            size={IconSize.SMALL}
                          />
                        }
                      </HorizontalContainer>
                    )
                  }
                </li>
              </HorizontalContainer>
            ))}
          </ol>
        </VerticalContainer>

      </VerticalContainer>

      <VerticalContainer className={styles.questions}>
        <div className={styles.progressContainer}>
          <ProgressBar
            value={runningTestStore.questionResults.size}
            max={runningTestStore.test.questions.length}
            textToLabel={LanguageService.test.questionsBlock.answersAccepted[language]}
          />
        </div>
        <VerticalContainer className={styles.questionBlock}>
          <QuestionItem
            question={runningTestStore.activeQuestion}
            result={runningTestStore.questionResults.get(runningTestStore.activeQuestion.uuid)}
            answer={runningTestStore.questionResults.get(runningTestStore.activeQuestion.uuid)?.userAnswer ?? ""}
            testSessionUuid={props.sessionUuid}
            userUuid={props.userUuid}
            isSavedAnswer={!!runningTestStore.questionResults.get(runningTestStore.activeQuestion.uuid)}
            saveUserAnswer={runningTestStore.saveQuestionResult}
            isNextButtonDisabled={isLastQuestion}
            isPrevButtonDisabled={isFirstQuestion}
            nextQuestion={runningTestStore.nextQuestion}
            prevQuestion={runningTestStore.prevQuestion}
            isCreateSessionResultEnable={isAllQuestionAnswered}
          />
        </VerticalContainer>
      </VerticalContainer>

    </HorizontalGridContainer>
  );
});

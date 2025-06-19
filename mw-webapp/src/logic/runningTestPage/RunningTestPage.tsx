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
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {QuestionItem} from "src/logic/runningTestPage/questionItem/QuestionItem";
import {RunningTestPageStore} from "src/logic/runningTestPage/RunningTestPageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/runningTestPage/RunningTestPage.module.scss";

const DEFAULT_QUESTION_VALUE = 1;

/**
 * RunningTestPage props
 */
interface RunningTestPageProps {

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
 * Running Test page
 */
export const RunningTestPage = observer((props: RunningTestPageProps) => {
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
      dataForInitialization: [props.testUuid, props.sessionUuid],
      dependency: [props.testUuid, user.uuid],
    });

  if (!runningTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isLastQuestion = runningTestPageStore.activeOrder >=
    runningTestPageStore.test.questions.length - DEFAULT_QUESTION_VALUE;
  const isFirstQuestion = runningTestPageStore.activeOrder <= 0;

  const isAllQuestionAnswered = runningTestPageStore.questionResults.size === runningTestPageStore.test.questions.length;

  return (
    <VerticalContainer className={styles.container}>
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
                key={question.uuid}
                className={clsx(
                  styles.questionShortBlock,
                  runningTestPageStore.activeQuestion.uuid === question.uuid && styles.active,
                )}
                onClick={() => {
                  runningTestPageStore.setActiveQuestionOrder(question.order);
                  runningTestPageStore.setActiveQuestion(question.uuid);
                }}
              >
                {question.name.trim() === ""
                  ? LanguageService.common.emptyMarkdown[language]
                  : (
                    <HorizontalContainer className={styles.shortQuestion}>
                      <Text text={`${question.order}. ${question.name}`} />
                      {runningTestPageStore.questionResults.get(question.uuid) &&
                      <Icon
                        name="CheckIcon"
                        size={IconSize.SMALL}
                      />
                      }
                    </HorizontalContainer>
                  )
                }

              </HorizontalContainer>
            ),
            )}

          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.questions}>
          <div className={styles.progressContainer}>
            <ProgressBar
              value={runningTestPageStore.questionResults.size}
              max={runningTestPageStore.test.questions.length}
              textToLabel={LanguageService.test.questionsBlock.answersAccepted[language]}
            />
          </div>
          <VerticalContainer className={styles.questionBlock}>
            <QuestionItem
              question={runningTestPageStore.activeQuestion}
              result={runningTestPageStore.questionResults.get(runningTestPageStore.activeQuestion.uuid)}
              answer={runningTestPageStore.questionResults.get(runningTestPageStore.activeQuestion.uuid)?.userAnswer ?? ""}
              testSessionUuid={props.sessionUuid}
              userUuid={user.uuid}
              isSavedAnswer={!!runningTestPageStore.questionResults.get(runningTestPageStore.activeQuestion.uuid)}
              saveUserAnswer={runningTestPageStore.saveQuestionResult}
              isNextButtonDisabled={isLastQuestion}
              isPrevButtonDisabled={isFirstQuestion}
              nextQuestion={runningTestPageStore.nextQuestion}
              prevQuestion={runningTestPageStore.prevQuestion}
              isCreateSessionResultEnable={isAllQuestionAnswered}
            />
          </VerticalContainer>
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

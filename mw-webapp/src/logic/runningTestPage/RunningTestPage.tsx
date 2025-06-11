import {useState} from "react";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {ErrorPromiseModal} from "src/component/errorPromiseModal/ErrorPromiseModal";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
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
import {pages} from "src/router/pages";
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
  const navigate = useNavigate();

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
                  : <Text text={question.name} />
                }

              </HorizontalContainer>
            ),
            )}

          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.questions}>
          <ProgressBar
            value={runningTestPageStore.questionResults.size}
            max={runningTestPageStore.test.questions.length}
            textToLabel={LanguageService.test.questionsBlock.questions[language]}
          />
          <VerticalContainer className={styles.theoryMaterials}>
            <QuestionItem
              question={runningTestPageStore.activeQuestion}
              answer={runningTestPageStore.questionResults.get(runningTestPageStore.activeQuestion.uuid)?.userAnswer ?? ""}
              testSessionUuid={runningTestPageStore.testSessionUuid}
              userUuid={user.uuid}
              isSavedAnswer={!!runningTestPageStore.questionResults.get(runningTestPageStore.activeQuestion.uuid)}
            />
          </VerticalContainer>

          <HorizontalContainer className={styles.questionButtons}>

            <Button
              value={LanguageService.test.buttons.prevQuestion[language]}
              onClick={() => runningTestPageStore.prevQuestion()}
              buttonType={ButtonType.SECONDARY}
              isDisabled={isPrevButtonDisabled}
            />

            <Button
              value={LanguageService.test.buttons.nextQuestion[language]}
              onClick={() => runningTestPageStore.nextQuestion()}
              buttonType={ButtonType.SECONDARY}
              isDisabled={isNextButtonDisabled}
            />
            <Button
              value={LanguageService.test.buttons.seeResults[language]}
              onClick={() => navigate(pages.resultTest.getPath({
                testUuid: runningTestPageStore.test.uuid,
                sessionUuid: runningTestPageStore.testSessionUuid,
              }))}
              buttonType={ButtonType.PRIMARY}
            />
          </HorizontalContainer>
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

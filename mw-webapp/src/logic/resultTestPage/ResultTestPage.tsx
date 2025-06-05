import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {ResultsTableBlock} from "src/logic/resultTestPage/resultsTestTable/ResultsTableBlock";
import {ResultTestPageStore} from "src/logic/resultTestPage/ResultTestPageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/resultTestPage/ResultTestPage.module.scss";

/**
 * RunningTestPage props
 */
interface ResultTestPageProps {

  /**
   * Test's Uuid
   */
  uuid: string;

}

/**
 * Result test page
 */
export const ResultTestPage = observer((props: ResultTestPageProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;

  if (!user) {
    throw new Error("User is not defined");
  }

  const resultTestPageStore = useStore<
  new (sessionId: string) => ResultTestPageStore,
  [string], ResultTestPageStore>({
      storeForInitialize: ResultTestPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  if (!resultTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  return (
    <VerticalContainer className={styles.resultsContainer}>
      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.test.resultTable.title[language]}
          placeholder=""
          classNameHeading={styles.headingLevelH2}
        />
      </HorizontalContainer>

      <div className={styles.resultsContent}>
        <ScrollableBlock>
          <ResultsTableBlock questionResults={resultTestPageStore.questionResults} />
        </ScrollableBlock>
      </div>

    </VerticalContainer>
    // <VerticalContainer className={styles.container}>
    //   <HorizontalGridContainer className={styles.testDashboard}>
    //     <VerticalContainer className={styles.testDashBoardLeft}>
    //       <VerticalContainer className={styles.testInfo}>
    //         <HorizontalContainer className={styles.testTitleBlock}>
    //           <Title
    //             level={HeadingLevel.h2}
    //             text={resultTestPageStore.test.name}
    //             placeholder={LanguageService.common.emptyMarkdown[language]}
    //             onChangeFinish={() => {}}
    //             isEditable={false}
    //             className={styles.testName}
    //           />
    //         </HorizontalContainer>

  //         <VerticalContainer className={styles.descriptionSection}>
  //           <Title
  //             level={HeadingLevel.h3}
  //             text={LanguageService.test.testInfo.description[language]}
  //             placeholder={LanguageService.common.emptyMarkdownAction[language]}
  //           />
  //           <Text
  //             text={resultTestPageStore.test.description}
  //             className={styles.description}
  //           />
  //         </VerticalContainer>

  //         <Title
  //           level={HeadingLevel.h3}
  //           text={LanguageService.test.questionsBlock.questions[language]}
  //           placeholder=""
  //         />

  //         {resultTestPageStore.test.questions.map((question) => (
  //           <HorizontalContainer
  //             key={question.questionText}
  //             className={clsx(
  //               styles.questionShortBlock,
  //               resultTestPageStore.activeQuestion.uuid === question.uuid && styles.active,
  //             )}
  //           >
  //             {question.questionText.trim() === ""
  //               ? LanguageService.common.emptyMarkdown[language]
  //               : <Text text={question.questionText} />
  //             }

  //           </HorizontalContainer>
  //         ),
  //         )}

  //       </VerticalContainer>

  //     </VerticalContainer>

  //     <VerticalContainer className={styles.questions}>
  //       <VerticalContainer className={styles.theoryMaterials}>
  //         <QuestionItem
  //           question={resultTestPageStore.activeQuestion}
  //           testSessionUuid={resultTestPageStore.testSessionUuid}
  //           userUuid={user?.uuid ?? "000"}
  //         />
  //       </VerticalContainer>

  //       <HorizontalContainer className={styles.questionButtons}>

  //         <Button
  //           value={"Prev"}
  //           onClick={() => resultTestPageStore.prevQuestion()}
  //           buttonType={ButtonType.SECONDARY}
  //           isDisabled={isPrevButtonDisabled}
  //         />

  //         <Button
  //           value={"Next"}
  //           onClick={() => resultTestPageStore.nextQuestion()}
  //           buttonType={ButtonType.PRIMARY}
  //           isDisabled={isNextButtonDisabled}
  //         />
  //       </HorizontalContainer>
  //     </VerticalContainer>

  //   </HorizontalGridContainer>

  // </VerticalContainer>
  );
});

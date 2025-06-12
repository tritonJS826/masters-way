import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {ResultsTableBlock} from "src/logic/resultTestPage/resultsTestTable/ResultsTableBlock";
import {ResultTestPageStore} from "src/logic/resultTestPage/ResultTestPageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/resultTestPage/ResultTestPage.module.scss";

const MAX_PERCENTAGE = 100;

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

  if (!user) {
    throw new Error("User is not defined");
  }

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
  const rightAnswersPercentages = rightAnswersAmount * MAX_PERCENTAGE / resultTestPageStore.questionResults.length;

  return (
    <VerticalContainer className={styles.resultsContainer}>
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

      <Text text={LanguageService.resultTest.percentageResult[language].replace("$rightAnswers", `${rightAnswersPercentages}`)} />
      <Text text={resultTestPageStore.sessionResult.resultDescription} />

      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.resultTest.resultTable.title[language]}
          placeholder=""
          classNameHeading={styles.headingLevelH2}
        />
      </HorizontalContainer>

      <div className={styles.resultsContent}>
        <ScrollableBlock>
          <ResultsTableBlock questionResults={resultTestPageStore.questionResults} />
        </ScrollableBlock>
      </div>

      <HorizontalContainer className={styles.buttons}>
        <Tooltip content={LanguageService.common.comingSoon[language]}>
          <Button
            value={LanguageService.resultTest.buttons.generateTrainingWithAIButton[language]}
            onClick={() => {}}
            buttonType={ButtonType.PRIMARY}
            className={styles.addMaterial}
          />
        </Tooltip>
      </HorizontalContainer>

    </VerticalContainer>
  );
});

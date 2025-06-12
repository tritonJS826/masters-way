import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {SessionDAL} from "src/dataAccessLogic/SessionDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {LobbyTestPageStore} from "src/logic/lobbyTestPage/LobbyTestPageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/lobbyTestPage/LobbyTestPage.module.scss";

const DEFAULT_SUMMARY_TIME = 0;

/**
 * LobbyTestPage props
 */
interface LobbyTestPageProps {

  /**
   * Test's Uuid
   */
  uuid: string;

}

/**
 * Lobby Test page
 */
export const LobbyTestPage = observer((props: LobbyTestPageProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const navigate = useNavigate();

  const lobbyTestPageStore = useStore<
  new (testUuid: string) => LobbyTestPageStore,
  [string], LobbyTestPageStore>({
      storeForInitialize: LobbyTestPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  if (!lobbyTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = user?.uuid === lobbyTestPageStore.test.ownerUuid;

  const timeToTest = DateUtils.getMinutesFromSeconds(lobbyTestPageStore.test.questions
    .reduce((summaryTime, question) => question.timeToAnswer + summaryTime, DEFAULT_SUMMARY_TIME));

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalGridContainer className={styles.lobbyDashboard}>
        <VerticalContainer className={styles.lobbyDashBoardLeft}>
          <VerticalContainer className={styles.testInfo}>
            <HorizontalContainer className={styles.testTitleBlock}>
              <Title
                level={HeadingLevel.h2}
                text={lobbyTestPageStore.test.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={() => {}}
                isEditable={false}
                className={styles.testName}
              />
            </HorizontalContainer>

            <VerticalContainer className={styles.descriptionSection}>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.lobbyTest.testInfo.description[language]}
                placeholder={LanguageService.common.emptyMarkdownAction[language]}
              />
              <Text
                text={lobbyTestPageStore.test.description}
                className={styles.description}
              />
            </VerticalContainer>

            <Title
              level={HeadingLevel.h3}
              text={`${LanguageService.lobbyTest.testInfo.questionsAmount[language]} ${lobbyTestPageStore.test.questions.length}`}
              placeholder=""
            />

            <Title
              level={HeadingLevel.h3}
              text={`${LanguageService.lobbyTest.testInfo.timeToTest[language]} 
                ${timeToTest} ${LanguageService.lobbyTest.testInfo.measurement[language]}`}
              placeholder=""
            />

          </VerticalContainer>

        </VerticalContainer>

        <HorizontalContainer className={styles.lobbyTestButtons}>
          {isOwner &&
            <Button
              value={LanguageService.lobbyTest.buttons.editTest[language]}
              onClick={() => navigate(pages.editTest.getPath({uuid: lobbyTestPageStore.test.uuid}))}
            />
          }

          {user &&
            <Button
              value={LanguageService.lobbyTest.buttons.startTest[language]}
              buttonType={ButtonType.PRIMARY}
              onClick={async () => {
                const testSession = await SessionDAL.createSession({userUuid: user.uuid});
                navigate(pages.runningTest.getPath({testUuid: lobbyTestPageStore.test.uuid, sessionUuid: testSession}));
              }}
            />
          }

        </HorizontalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

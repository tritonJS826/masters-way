import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useStore} from "src/hooks/useStore";
import {LobbyTestPageStore} from "src/logic/lobbyTestPage/LobbyTestPageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/lobbyTestPage/LobbyTestPage.module.scss";

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
                text={LanguageService.test.testInfo.description[language]}
                placeholder={LanguageService.common.emptyMarkdownAction[language]}
              />
              <Text
                text={lobbyTestPageStore.test.description}
                className={styles.description}
              />
            </VerticalContainer>

            <Title
              level={HeadingLevel.h3}
              text={`${LanguageService.test.testInfo.questionsAmount[language]} ${lobbyTestPageStore.test.questions.length}`}
              placeholder=""
            />

          </VerticalContainer>

        </VerticalContainer>

        <HorizontalContainer className={styles.lobbyTestButtons}>
          <Button
            value={LanguageService.test.buttons.editTest[language]}
            onClick={() => navigate(pages.editTest.getPath({uuid: lobbyTestPageStore.test.uuid}))}
          />
          <Button
            value={LanguageService.test.buttons.startTest[language]}
            buttonType={ButtonType.PRIMARY}
            onClick={() => navigate(pages.runningTest.getPath({uuid: lobbyTestPageStore.test.uuid}))}
          />
        </HorizontalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

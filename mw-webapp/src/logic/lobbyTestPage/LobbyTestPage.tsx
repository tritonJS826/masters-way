import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {testsAccessIds} from "cypress/accessIds/testsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {SessionDAL} from "src/dataAccessLogic/SessionDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {DownloadPDFModal} from "src/logic/lobbyTestPage/downloadPdfModal/downloadPDFModal";
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
  const [isOpenDownloadTestModal, setIsOpenDownloadTestModal] = useState<boolean>(false);
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
          <HorizontalContainer className={styles.testInfo}>
            <VerticalContainer>
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
                text={`${LanguageService.lobbyTest.testInfo.questionsAmount[language]} 
                     ${lobbyTestPageStore.test.questions.length}`}
                className={styles.questionsAmount}
                placeholder=""
              />
              <Title
                level={HeadingLevel.h3}
                text={`${LanguageService.lobbyTest.testInfo.timeToTest[language]} 
                  ${timeToTest} ${LanguageService.lobbyTest.testInfo.measurement[language]}`}
                placeholder=""
              />
            </VerticalContainer>
            <VerticalContainer>
              <Dropdown
                isModalBehavior={false}
                contentClassName={styles.testActionMenu}
                trigger={(
                  <Tooltip
                    content={LanguageService.lobbyTest.buttons.downloadAsPDF[language]}
                    position={PositionTooltip.LEFT}
                  >
                    <Button
                      className={styles.userActionsIcon}
                      buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                      onClick={() => {}}
                      icon={
                        <Icon
                          size={IconSize.MEDIUM}
                          name={"MoreVertical"}
                        />
                      }
                      dataCy={testsAccessIds.lobbyTest.downloadAsPDF}
                    />
                  </Tooltip>
                )}

                cy={{
                  dataCyContent: testsAccessIds.lobbyTest.downloadAsPDF,
                  dataCyContentList: testsAccessIds.lobbyTest.menuList,
                  dataCySubContent: testsAccessIds.lobbyTest.downloadAsPDF,
                  dataCySubTrigger: testsAccessIds.lobbyTest.downloadAsPDF,
                }}

                dropdownMenuItems={[
                  {
                    dropdownSubMenuItems: [
                      {
                        id: "Download as PDF",
                        isPreventDefaultUsed: false,
                        value: LanguageService.lobbyTest.buttons.downloadAsPDF[language],

                        /**
                         * Download test as PDF
                         */
                        onClick: () => {
                          setIsOpenDownloadTestModal(true);
                        },
                      },
                    ],
                  },
                ]}
              />
              {isOpenDownloadTestModal &&
                <Modal
                  isOpen={isOpenDownloadTestModal}
                  close={() => setIsOpenDownloadTestModal(false)}
                  trigger={<></>}
                  content={
                    <DownloadPDFModal
                      test={lobbyTestPageStore.test}
                      timeToTest={timeToTest}
                      language={language}
                      onClose={() => setIsOpenDownloadTestModal(false)}
                    />
                  }
                />
              }
            </VerticalContainer>
          </HorizontalContainer>
        </VerticalContainer>
        <HorizontalContainer className={styles.lobbyTestButtons}>
          {isOwner &&
            <Button
              value={LanguageService.lobbyTest.buttons.editTest[language]}
              onClick={() => navigate(pages.editTest.getPath({uuid: lobbyTestPageStore.test.uuid}))}
            />
          }

          {user && <>
            <Button
              value={LanguageService.lobbyTest.buttons.startTest[language]}
              buttonType={ButtonType.PRIMARY}
              onClick={async () => {
                const testSession = await SessionDAL.createSession({userUuid: user.uuid});
                navigate(pages.runningTest.getPath({
                  testUuid: lobbyTestPageStore.test.uuid,
                  sessionUuid: testSession,
                  isGameMode: "false",
                }));
              }}
            />
            <Button
              value={LanguageService.lobbyTest.buttons.startGame[language]}
              buttonType={ButtonType.SECONDARY}
              onClick={async () => {
                const testSession = await SessionDAL.createSession({userUuid: user.uuid});
                navigate(pages.runningTest.getPath({
                  testUuid: lobbyTestPageStore.test.uuid,
                  sessionUuid: testSession,
                  isGameMode: "true",
                }));
              }}
            />
          </>
          }

        </HorizontalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

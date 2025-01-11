import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {homeAccessIds} from "cypress/accessIds/homeAccessIds";
import {observer} from "mobx-react-lite";
import {TrackHomePage} from "src/analytics/homeAnalytics";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {AdvantageItem} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {Tab, TabItemProps} from "src/component/tab/Tab";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Theme, themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {SystemItem} from "src/logic/staticPages/homePage/systemItem/SystemItem";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/staticPages/homePage/HomePage.module.scss";

const VIDEO_FOR_STUDENT_URL = "https://www.youtube.com/embed/WrgBgDZVVMo?si=uXNrv1w6xRJpXMHc";
const VIDEO_FOR_MENTOR_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";

/**
 * GetStarted button click handler
 */
export const getStarted = (navigate: NavigateFunction, userUuid?: string) => {
  return userUuid
    ? navigate(pages.user.getPath({uuid: userUuid}))
    : AuthDAL.authGoogle();
};

/**
 * Home page
 */
export const HomePage = observer(() => {
  const {user} = userStore;
  const {language} = languageStore;
  const {theme} = themeStore;
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState<string>(VIDEO_FOR_STUDENT_URL);

  const tabList: TabItemProps[] = [
    {
      id: "0",
      tabTrigger: {
        id: "0",
        value: LanguageService.home.videoForStudent[language],
      },
      tabContent: {
        id: "0",
        value: (<></>),
      },
      value: "Tab 1",

      /**
       * Show video for student
       */
      onCLick: () => {
        TrackHomePage.studentVideoClicked();
        setVideoUrl(VIDEO_FOR_STUDENT_URL);
      },
    },
    {
      id: "1",
      tabTrigger: {
        id: "1",
        value: LanguageService.home.videoForMentor[language],
      },
      tabContent: {
        id: "1",
        value: (<></>),
      },
      value: "Tab 2",

      /**
       * Show video for mentor
       */
      onCLick: () => {
        TrackHomePage.mentorVideoClicked();
        setVideoUrl(VIDEO_FOR_MENTOR_URL);
      },
    },
  ];

  return (
    <VerticalContainer className={styles.homePageWrapper}>
      <div className={styles.container}>
        <HorizontalGridContainer className={styles.welcomeBlock}>
          <VerticalContainer className={styles.welcomeInfoBlock}>
            <Title
              level={HeadingLevel.h1}
              text={LanguageService.home.title[language]}
              className={styles.title}
              classNameHeading={styles.headingLevelH1}
              placeholder=""
              cy={{dataCyTitleContainer: homeAccessIds.welcomeBlock.title}}
            />
            <p className={styles.titleDescription}>
              {LanguageService.home.description[language]}
            </p>
            <HorizontalContainer className={styles.welcomeBlockButton}>
              <Button
                onClick={() => {
                  TrackHomePage.startForFreeFirstBlockClicked();
                  getStarted(navigate, user?.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.home.startForFreeButton[language]}
                className={styles.getStartedButton}
                dataCy={homeAccessIds.welcomeBlock.startButton}
              />
              <Button
                onClick={() => {
                  TrackHomePage.viewAllWaysClicked();
                  navigate(pages.allWays.getPath({}));
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.home.viewAllWaysButton[language]}
                className={styles.viewAllWaysButton}
                dataCy={homeAccessIds.welcomeBlock.viewExistingWaysButton}
              />
            </HorizontalContainer>
          </VerticalContainer>

          <VerticalContainer className={styles.videosBlock}>
            <Tab tabList={tabList} />
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title="Video onboarding"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={true}
            />
          </VerticalContainer>
        </HorizontalGridContainer>
      </div>

      <VerticalContainer className={styles.advantagesBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.home.advantages.advantagesTitle[language]}
          className={styles.advantagesTitle}
          classNameHeading={styles.headingLevelH2}
          placeholder=""
        />
        <p className={styles.advantagesDescription}>
          {LanguageService.home.advantages.advantagesDescription[language]}
        </p>
        <HorizontalContainer className={styles.advantages}>
          <AdvantageItem
            title={LanguageService.home.advantages.personalizedLearning.title[language]}
            description={LanguageService.home.advantages.personalizedLearning.description[language]}
            iconName="ActivityIcon"
          />
          <AdvantageItem
            title={LanguageService.home.advantages.fastFeedback.title[language]}
            description={LanguageService.home.advantages.fastFeedback.description[language]}
            iconName="ClockIcon"
          />
          <AdvantageItem
            title={LanguageService.home.advantages.aiAssistant.title[language]}
            description={LanguageService.home.advantages.aiAssistant.description[language]}
            iconName="TrendingUpIcon"
          />
        </HorizontalContainer>

        <Button
          onClick={() => {
            TrackHomePage.startForFreeWhoWeAreBlockClicked();
            getStarted(navigate, user?.uuid);
          }}
          buttonType={ButtonType.PRIMARY}
          value={LanguageService.home.getStartedButton[language]}
          className={styles.getStartedButton}
        />
      </VerticalContainer>

      <VerticalContainer className={styles.buildSystemBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.home.systemBlock.title[language]}
          className={styles.systemBlockTitle}
          classNameHeading={styles.headingLevelH2}
          placeholder=""
        />
        <p className={styles.systemBlockDescription}>
          {LanguageService.home.systemBlock.description[language]}
        </p>
        <HorizontalContainer className={styles.systemItems}>
          <SystemItem
            title={LanguageService.home.systemBlock.createWay.title[language]}
            description={LanguageService.home.systemBlock.createWay.description[language]}
            stepNumber="1"
          />
          <SystemItem
            title={LanguageService.home.systemBlock.setGoalAndMetrics.title[language]}
            description={LanguageService.home.systemBlock.setGoalAndMetrics.description[language]}
            stepNumber="2"
          />
          <SystemItem
            title={LanguageService.home.systemBlock.trackProgress.title[language]}
            description={LanguageService.home.systemBlock.trackProgress.description[language]}
            stepNumber="3"
          />

          <Image
            alt="desktopImage"
            src="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
            className={styles.buildSystemImageBlock}
          />
        </HorizontalContainer>

      </VerticalContainer>

      <VerticalContainer className={styles.aboutProjectBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.home.aboutAppBlock.title[language]}
          className={styles.aboutAppBlockTitle}
          classNameHeading={styles.headingLevelH2}
          placeholder=""
        />
        <HorizontalContainer className={styles.aboutProjectItems}>
          <ThemedImage
            className={styles.aboutProjectImage}
            sources={getMapThemeSources({
              [Theme.DARK]: logoLight,
              [Theme.LIGHT]: logo,
              [Theme.OBSIDIAN]: logoLight,
            })}
            theme={theme}
            name={LOGO_TEXT}
          />
          <VerticalContainer className={styles.aboutProjectDescription}>

            <p className={styles.aboutAppBlockDescription}>
              {LanguageService.home.aboutAppBlock.description[language]}
            </p>

            <HorizontalContainer className={styles.aboutAppBlockButtons}>
              <Button
                onClick={() => {
                  TrackHomePage.tryNowClicked();
                  getStarted(navigate, user?.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.home.getStartedButton[language]}
                className={styles.aboutAppGetStartedButton}
              />
              <Link
                path={LanguageService.home.aboutAppBlock.manifestLink[language]}
                className={styles.manifestoLink}
                onClick={TrackHomePage.readManifestClicked}
                isNewTab
              >
                {LanguageService.home.aboutAppBlock.readManifesto[language]}
              </Link>
            </HorizontalContainer>
          </VerticalContainer>
        </HorizontalContainer>

      </VerticalContainer>

      <Footer language={language} />
    </VerticalContainer>
  );

});

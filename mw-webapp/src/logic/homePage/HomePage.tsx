import {homeAccessIds} from "cypress/accessIds/homeAccessIds";
import {observer} from "mobx-react-lite";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {trackUserActivationButton, UserActivationAction, UserActivationLabel} from "src/GoogleAnalytics";
import {GoalItem} from "src/logic/homePage/goalItem/GoalItem";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/homePage/HomePage.module.scss";

/**
 * GetStarted button click handler
 */
const getStarted = (userUuid?: string) => {
  return userUuid
    ? pages.user.getPath({uuid: userUuid})
    : AuthDAL.logIn();
};

/**
 * Home page
 */
export const HomePage = observer(() => {
  const {user} = userStore;
  const {language} = languageStore;

  return (
    <>
      <VerticalContainer className={styles.welcomeBlock}>
        <Title
          level={HeadingLevel.h1}
          text={LanguageService.home.title[language]}
          className={styles.title}
          placeholder=""
          dataCy={homeAccessIds.welcomeBlock.title}
        />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.home.description[language]}
          className={styles.titleDescription}
          placeholder=""
        />
        <Link
          path={getStarted(user?.uuid)}
          className={styles.loginGoogleButton}
        >
          <Button
            onClick={() => trackUserActivationButton({
              action: UserActivationAction.GET_STARTED_CLICKED,
              label: UserActivationLabel.START_FOR_FREE__FIRST_SCREEN_CLICKED,
            })}
            buttonType={ButtonType.SUPER_SPECIAL_BEAUTIFUL_BUTTON}
            value={LanguageService.home.startForFreeButton[language]}
            className={styles.getStartedButton}
            dataCy={homeAccessIds.welcomeBlock.startButton}
          />
        </Link>
      </VerticalContainer>

      <VerticalContainer className={styles.advantagesBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.home.advantages.goalsTitle[language]}
          className={styles.goalsTitle}
          placeholder=""
        />
        <HorizontalContainer className={styles.goals}>
          <GoalItem
            title={LanguageService.home.weAreHelpingBlock.goals.goalOne.title[language]}
            description={LanguageService.home.weAreHelpingBlock.goals.goalOne.description[language]}
          />
          <GoalItem
            title={LanguageService.home.weAreHelpingBlock.goals.goalTwo.title[language]}
            description={LanguageService.home.weAreHelpingBlock.goals.goalTwo.description[language]}
          />
          <GoalItem
            title={LanguageService.home.weAreHelpingBlock.goals.goalThree.title[language]}
            description={LanguageService.home.weAreHelpingBlock.goals.goalThree.description[language]}
          />
        </HorizontalContainer>
      </VerticalContainer>

      <HorizontalContainer className={styles.aboutProjectBlock}>
        <Image
          alt={LOGO_TEXT}
          src={logoLight}
          className={styles.aboutProjectImage}
        />
        <VerticalContainer className={styles.aboutProjectDescription}>
          <Title
            level={HeadingLevel.h2}
            text={LanguageService.home.aboutAppBlock.title[language]}
            className={styles.goalsTitle}
            placeholder=""
          />
          <VerticalContainer className={styles.aboutProjectText}>
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.home.aboutAppBlock.subTitle[language]}
              className={styles.goalsSubTitle}
              placeholder=""
            />
            <div className={styles.aboutProjectDescription}>
              {LanguageService.home.aboutAppBlock.description[language]}
            </div>
            <ul className={styles.aboutProjectDescription}>
              <li>
                {LanguageService.home.aboutAppBlock.reasonOne[language]}
              </li>
              <li>
                {LanguageService.home.aboutAppBlock.reasonTwo[language]}
              </li>
              <li>
                {LanguageService.home.aboutAppBlock.reasonThree[language]}
              </li>
            </ul>
            <div className={styles.aboutProjectDescription}>
              {LanguageService.home.aboutAppBlock.endDescription[language]}
            </div>
          </VerticalContainer>
          <Link
            path={getStarted(user?.uuid)}
            className={styles.loginGoogleButton}
          >
            <Button
              onClick={() => trackUserActivationButton({
                action: UserActivationAction.GET_STARTED_CLICKED,
                label: UserActivationLabel.START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED,
              })}
              buttonType={ButtonType.SUPER_SPECIAL_BEAUTIFUL_BUTTON}
              value={LanguageService.home.startForFreeButton[language]}
              className={styles.aboutProjectGetStartedButton}
            />
          </Link>
        </VerticalContainer>
      </HorizontalContainer>

      <HorizontalContainer className={styles.whatWeAreBlock}>

        <VerticalContainer className={styles.whatWeAreDescription}>
          <Title
            level={HeadingLevel.h2}
            text={LanguageService.home.whatWeAreBlock.title[language]}
            className={styles.goalsTitle}
            placeholder=""
          />
          <VerticalContainer className={styles.whatWeAreList}>
            <HorizontalContainer className={styles.whatWeAreItem}>
              <Icon
                name="WayIcon"
                size={IconSize.MEDIUM}
                className={styles.icon}
              />
              {LanguageService.home.aboutAppBlock.reasonOne[language]}
            </HorizontalContainer>
            <HorizontalContainer className={styles.whatWeAreItem}>
              <Icon
                name="WayIcon"
                size={IconSize.MEDIUM}
                className={styles.icon}
              />
              {LanguageService.home.aboutAppBlock.reasonTwo[language]}
            </HorizontalContainer>
            <HorizontalContainer className={styles.whatWeAreItem}>
              <Icon
                name="WayIcon"
                size={IconSize.MEDIUM}
                className={styles.icon}
              />
              {LanguageService.home.aboutAppBlock.reasonThree[language]}
            </HorizontalContainer>
            <HorizontalContainer className={styles.whatWeAreItem}>
              <Icon
                name="WayIcon"
                size={IconSize.MEDIUM}
                className={styles.icon}
              />
              {LanguageService.home.aboutAppBlock.reasonFour[language]}
            </HorizontalContainer>
          </VerticalContainer>
          <HorizontalContainer className={styles.whatWeAreButtons}>
            <Link
              path={getStarted(user?.uuid)}
              className={styles.loginGoogleButton}
            >
              <Button
                onClick={() => trackUserActivationButton({
                  action: UserActivationAction.GET_STARTED_CLICKED,
                  label: UserActivationLabel.TRY_NOW_CLICKED,
                })}
                buttonType={ButtonType.SUPER_SPECIAL_BEAUTIFUL_BUTTON}
                value={LanguageService.home.tryNowButton[language]}
                className={styles.tryNowButton}
              />
            </Link>
            <Link
              path={LanguageService.home.whatWeAreBlock.manifestLink[language]}
              className={styles.whatWeAreLink}
              isNewTab
            >
              {LanguageService.home.whatWeAreBlock.readManifesto[language]}
            </Link>
          </HorizontalContainer>
        </VerticalContainer>
        <Image
          alt={LOGO_TEXT}
          src="https://drive.google.com/thumbnail?id=1sm7CPUt8LTcx6ZAVIe799rFWa0v9KzST&sz=w1000"
          className={styles.whatWeAreImage}
        />

      </HorizontalContainer>

      <Footer language={language} />
    </>
  );

});

import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {GoalItem} from "src/logic/homePage/goalItem/GoalItem";
import {LanguageService} from "src/service/LangauageService";
import styles from "src/logic/homePage/HomePage.module.scss";

/**
 * Home page
 */
export const HomePage = () => {
  const {language} = useGlobalContext();

  return (
    <VerticalContainer className={styles.homeContainer}>
      <Title
        level={HeadingLevel.h1}
        text={LanguageService.home.title[language]}
        className={styles.title}
      />
      <Title
        level={HeadingLevel.h3}
        text={LanguageService.home.description[language]}
        className={styles.titleDescription}
      />
      <HorizontalContainer className={styles.goals}>
        <GoalItem
          title={LanguageService.home.goals.goalOne.title[language]}
          description={LanguageService.home.goals.goalOne.description[language]}
        />
        <GoalItem
          title={LanguageService.home.goals.goalTwo.title[language]}
          description={LanguageService.home.goals.goalTwo.description[language]}
        />
        <GoalItem
          title={LanguageService.home.goals.goalThree.title[language]}
          description={LanguageService.home.goals.goalThree.description[language]}
        />
      </HorizontalContainer>
      <Button
        onClick={() => {}}
        buttonType={ButtonType.PRIMARY}
        value={LanguageService.home.startForFreeButton[language]}
        className={styles.getStartedButton}
      />
    </VerticalContainer>
  );

};

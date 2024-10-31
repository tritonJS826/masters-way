import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/privateRecourse/PrivateRecourse.module.scss";

/**
 * Private recourse props
 */
interface ErrorComponentProps {

  /**
   * Private recourse's text
   */
  text: string;

  /**
   * Private recourse's description
   */
  description: string;
}

/**
 * Private recourse render info about private pages
 */
export const ErrorComponent = (props: ErrorComponentProps) => {

  const navigate = useNavigate();
  const {language} = languageStore;
  const ButtonBack = -1;

  return (
    <VerticalContainer className={styles.container}>
      <VerticalContainer className={styles.Inner}>
        <Title
          className={styles.Title}
          text={props.text}
          level={HeadingLevel.h1}
          placeholder={""}
        />
        <HorizontalContainer className={styles.ButtonGroup}>
          <Button
            onClick={() => navigate({pathname: "/"})}
            buttonType={ButtonType.PRIMARY}
            value={LanguageService.user.button.home[language]}
            className={styles.Button}
          />
          <Button
            onClick={() => navigate(ButtonBack)}
            buttonType={ButtonType.SECONDARY}
            value={LanguageService.user.button.back[language]}
          />
        </HorizontalContainer>
        <div className={styles.description}>
          {props.description}
        </div>
        <img
          alt="group"
          src={"src/assets/Group.png"}
          className={styles.ImageBackground}
        />
      </VerticalContainer>
    </VerticalContainer>
  );
};

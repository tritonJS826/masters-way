import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AdvantageItem} from "src/logic/landingPages/mentorsLandingPage/advantageItem/AdvantageItem";
import {ProblemItem} from "src/logic/landingPages/mentorsLandingPage/problemItem/ProblemItem";
import styles from "src/logic/landingPages/mentorsLandingPage/MentorsLandingPage.module.scss";

/**
 * Mentors landing page
 */
export const MentorsLandingPage = observer(() => {

  return (
    <>
      <div className={styles.container}>
        <VerticalContainer className={styles.mainBlock}>
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h1}
              text="Заголовок – основная суть приложения для менторов"
              placeholder=""
            />
            <p className={styles.titleDescription}>
              Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки
            </p>
          </VerticalContainer>
          <Button
            value="Кнопка призыва"
            onClick={() => {}}
          />
          <Image
            alt="desktopImage"
            src="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
            className={styles.mainBlockImage}
          />
        </VerticalContainer>

        <VerticalContainer className={styles.advantagesBlock}>
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text="Наши преимущества"
            placeholder=""
          />
          <HorizontalContainer className={styles.advantages}>
            <AdvantageItem
              title="Подзаголовок"
              description="Используйте 1 предложение в 1-3 строчки "
            />
            <AdvantageItem
              title="Подзаголовок"
              description="Используйте 1 предложение в 1-3 строчки "
            />
            <AdvantageItem
              title="Подзаголовок"
              description="Используйте 1 предложение в 1-3 строчки "
            />
            <AdvantageItem
              title="Подзаголовок"
              description="Используйте 1 предложение в 1-3 строчки "
            />
          </HorizontalContainer>
        </VerticalContainer>

        <VerticalContainer className={styles.problemsBlock}>
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text="Проблемы, которые мы можем помочь решить менторам"
              placeholder=""
            />
            <p className={styles.titleDescription}>
              Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки
            </p>
          </VerticalContainer>
          <VerticalContainer className={styles.problems}>

            <ProblemItem
              title="Проблемы, которые мы можем помочь решить менторам"
              description="Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки"
              imageSrc="https://drive.google.com/thumbnail?id=1TSOIZOIg4uvfWeRrE5SUf44CBLanjTUP&sz=w1000"
            />
            <ProblemItem
              title="Проблемы, которые мы можем помочь решить менторам"
              description="Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки"
              imageSrc="https://drive.google.com/thumbnail?id=1ipbye-Gw_KT81T6KDMFpcfKkyxIO9C3g&sz=w1000"
              isReversed
            />
            <ProblemItem
              title="Проблемы, которые мы можем помочь решить менторам"
              description="Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки"
              imageSrc="https://drive.google.com/thumbnail?id=1fKbItiABNCIlHNM87qwTH1L0fezqdiab&sz=w1000"
            />
          </VerticalContainer>
        </VerticalContainer>

        <VerticalContainer className={styles.responseBlock}>
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text="Отзывы менторов, которые используют наше приложение"
            placeholder=""
          />
          <div className={styles.responseContentBlock}>
            Slider
          </div>
        </VerticalContainer>

        <VerticalContainer className={styles.questionsBlock}>
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text="Часто задаваемые вопросы"
              placeholder=""
            />
            <p className={styles.titleDescription}>
              Описание – краткая расшифровка основного предложения. Используйте 1-2 предложения в 1-3 строчки
            </p>
          </VerticalContainer>
          <div className={styles.questionsContentBlock}>
            Acordeon
          </div>
        </VerticalContainer>

        <HorizontalContainer className={styles.triesBlock}>
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text="Вы должны попробовать наше приложение"
            placeholder=""
          />
          <div className={styles.triesContentBlock}>
            ...
          </div>
        </HorizontalContainer>

      </div>
    </>
  );
});

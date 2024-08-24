import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItem} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {HeaderLanding, NavLink} from "src/land/headerLanding/HeaderLanding";
import {ProblemItem} from "src/land/mentorsLandingPage/problemItem/ProblemItem";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/land/mentorsLandingPage/MentorsLandingPage.module.scss";

const navList: NavLink[] = [
  {
    path: "advantages",
    value: "Advantages",
  },
  {
    path: "problems",
    value: "Problems",
  },
  {
    path: "reviews",
    value: "Reviews",
  },
  {
    path: "questions",
    value: "Questions",
  },
];

/**
 * Mentors landing page
 */
export const MentorsLandingPage = observer(() => {
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const accordionItems = LanguageService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <>
      <div className={styles.container}>
        <HeaderLanding
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          navList={navList}
        />
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
            buttonType={ButtonType.PRIMARY}
            value="Кнопка призыва"
            icon={
              <Icon
                size={IconSize.SMALL}
                name="ArrowRightIcon"
                className={styles.icon}
              />
            }
            onClick={() => {}}
          />
          <Image
            alt="desktopImage"
            src="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
            className={styles.mainBlockImage}
          />
        </VerticalContainer>

        {/* Can't use VErticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id="advantages"
        >
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
        </div>

        <div
          className={styles.problemsBlock}
          id="problems"
        >
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
        </div>

        <div
          className={styles.reviewBlock}
          id="reviews"
        >
          <div className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text="Отзывы менторов, которые используют наше приложение"
              placeholder=""
            />
          </div>
          <HorizontalContainer className={styles.reviewList}>
            <ReviewCard
              gradeAmount={5}
              review="Это самый замечательный отзыв о нашем приложении, который может быть"
              reviewerImageUrl="src/assets/storybook-images/kittens.jpg"
              reviewerName="John"
            />
            <ReviewCard
              gradeAmount={5}
              review="Это самый замечательный отзыв о нашем приложении, который может быть"
              reviewerImageUrl="src/assets/storybook-images/kittens.jpg"
              reviewerName="Anna"
            />
            <ReviewCard
              gradeAmount={5}
              review="Это самый замечательный отзыв о нашем приложении, который может быть"
              reviewerImageUrl="src/assets/storybook-images/kittens.jpg"
              reviewerName="Anna"
            />
          </HorizontalContainer>
        </div>

        <div
          className={styles.questionsBlock}
          id="questions"
        >
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
          <Accordion
            items={accordionItems}
            type={accordionTypes.multiple}
            className={styles.accordion}
          />
        </div>

        <HorizontalContainer className={styles.triesBlock}>
          <HorizontalContainer className={styles.triesContainer}>
            <Title
              className={clsx(styles.titleBlock, styles.title, styles.titleYouShouldBlock)}
              level={HeadingLevel.h2}
              text="Вы должны попробовать наше приложение"
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                Попробуйте наше веб-приложение бесплатно и убедитесь, как оно может помочь вам увеличить доход,
                эффективность и удовлетворение от работы
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value="Кнопка призыва"
                icon={
                  <Icon
                    size={IconSize.SMALL}
                    name="ArrowRightIcon"
                    className={styles.icon}
                  />
                }
                onClick={() => { }}
                className={styles.triesActionButton}
              />
            </VerticalContainer>
          </HorizontalContainer>
        </HorizontalContainer>

      </div>
    </>
  );
});

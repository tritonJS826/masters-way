import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {AdvantageItem} from "src/logic/landingPages/mentorsLandingPage/advantageItem/AdvantageItem";
import {ProblemItem} from "src/logic/landingPages/mentorsLandingPage/problemItem/ProblemItem";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/landingPages/mentorsLandingPage/MentorsLandingPage.module.scss";

/**
 * Mentors landing page
 */
export const MentorsLandingPage = observer(() => {
  const {language} = languageStore;

  const accordionItems = LanguageService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

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

        <VerticalContainer className={styles.reviewBlock}>
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
          <Accordion
            items={accordionItems}
            type={accordionTypes.multiple}
            className={styles.accordion}
          />
        </VerticalContainer>

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

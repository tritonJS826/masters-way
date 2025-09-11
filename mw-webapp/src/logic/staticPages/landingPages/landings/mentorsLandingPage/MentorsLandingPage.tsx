import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItem} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Loader} from "src/component/loader/Loader";
import {PricingBlock} from "src/component/pricingBlock/PricingBlock";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {Slider, SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useLazyDictionaries} from "src/hooks/useLazyDictionary";
import {pricePlansList} from "src/logic/pricePlans";
import {getStarted} from "src/logic/staticPages/homePage/HomePage";
import {AmountBlock, AmountItem} from "src/logic/staticPages/landingPages/amountBlock/AmountBlock";
import {FooterLanding} from "src/logic/staticPages/landingPages/footerLanding/FooterLanding";
import {HeaderLanding, NavLink} from "src/logic/staticPages/landingPages/headerLanding/HeaderLanding";
import {ProblemItem} from "src/logic/staticPages/landingPages/problemItem/ProblemItem";
import {DictionaryKey} from "src/service/AsyncLanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/staticPages/landingPages/landings/mentorsLandingPage/MentorsLandingPage.module.scss";

/**
 * Mentors landing page
 */
export const MentorsLandingPage = observer(() => {
  const {user} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;
  const navigate = useNavigate();
  const {dictionaries: [mentorsDictionary], areAllLoaded} =
    useLazyDictionaries(DictionaryKey.MENTORS_LANDING, DictionaryKey.LOREM_LANDING);

  if (!areAllLoaded) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const navList: NavLink[] = [
    {
      path: "advantages",
      value: mentorsDictionary.dictionary.navigation.advantages[language],
    },
    {
      path: "problems",
      value: mentorsDictionary.dictionary.navigation.solutions[language],
    },
    {
      path: "reviews",
      value: mentorsDictionary.dictionary.navigation.reviews[language],
    },
    {
      path: "pricing",
      value: mentorsDictionary.dictionary.navigation.pricing[language],
    },
    {
      path: "questions",
      value: mentorsDictionary.dictionary.navigation.questions[language],
    },
  ];

  const accordionItems = mentorsDictionary.dictionary.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  const amountItems: AmountItem[] = [
    {
      id: "00000000-0000-0000-0000-00000000001",
      amount: 30,
      description: mentorsDictionary.dictionary.amountBlock.mentors[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000002",
      amount: 150,
      description: mentorsDictionary.dictionary.amountBlock.activeWays[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000003",
      amount: 50,
      description: mentorsDictionary.dictionary.amountBlock.students[language],
    },
  ];

  const reviewCards: SliderItem[] = [
    {
      id: 1,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={mentorsDictionary.dictionary.reviews.kirillReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=13WWXNAtUrMrsf1dT5JzPJriTMUP9WJ55&sz=w400"
          reviewerName={mentorsDictionary.dictionary.reviews.kirillReview.mentorName[language]}
          reviewerProfession={mentorsDictionary.dictionary.reviews.kirillReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={mentorsDictionary.dictionary.reviews.viktarReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1mx9_dCHdwlxGw1UK_tkHZjHZKLjuBnhK&sz=w400"
          reviewerName={mentorsDictionary.dictionary.reviews.viktarReview.mentorName[language]}
          reviewerProfession={mentorsDictionary.dictionary.reviews.viktarReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={mentorsDictionary.dictionary.reviews.viktoryiaReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1uEyBTZIon2OFQOOG7pCtkigXYD4YXwc8&sz=w400"
          reviewerName={mentorsDictionary.dictionary.reviews.viktoryiaReview.mentorName[language]}
          reviewerProfession={mentorsDictionary.dictionary.reviews.viktoryiaReview.mentorProfession[language]}
        />
      ),
    },
  ];

  return (
    <>
      <div>
        <HeaderLanding
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          navList={navList}
          userUuid={user?.uuid}
        />
        <VerticalContainer className={styles.mainBlock}>
          <VerticalContainer className={styles.titleBlock}>

            {/* Workaround for colorized part of title */}
            <h1 className={styles.title}>
              {mentorsDictionary.dictionary.main.title[language]}
              <span className={clsx(styles.title, styles.mw)}>
                {mentorsDictionary.dictionary.main.mastersWay[language]}
              </span>
            </h1>
            <p className={styles.titleDescription}>
              {mentorsDictionary.dictionary.main.description[language]}
            </p>
          </VerticalContainer>
          <Button
            buttonType={ButtonType.PRIMARY}
            value={mentorsDictionary.dictionary.callToActionButton[language]}
            icon={
              <Icon
                size={IconSize.SMALL}
                name="ArrowRightIcon"
                className={styles.icon}
              />
            }
            onClick={() => getStarted(navigate, user?.uuid)}
          />
        </VerticalContainer>
        <VerticalContainer className={styles.imageBlock}>
          <Image
            alt="desktopImage"
            src="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w500"
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
            text={mentorsDictionary.dictionary.advantages.title[language]}
            placeholder=""
          />
          <HorizontalContainer className={styles.advantages}>
            <AdvantageItem
              iconName="ClockIcon"
              title={mentorsDictionary.dictionary.advantages.asynchronousInteraction.title[language]}
              description={mentorsDictionary.dictionary.advantages.asynchronousInteraction.description[language]}
            />
            <AdvantageItem
              iconName="TrendingUpIcon"
              title={mentorsDictionary.dictionary.advantages.speedingUpProcesses.title[language]}
              description={mentorsDictionary.dictionary.advantages.speedingUpProcesses.description[language]}
            />
            <AdvantageItem
              iconName="ActivityIcon"
              title={mentorsDictionary.dictionary.advantages.monitoringAchievements.title[language]}
              description={mentorsDictionary.dictionary.advantages.monitoringAchievements.description[language]}
            />
          </HorizontalContainer>
        </div>

        <AmountBlock amountItems={amountItems} />

        <div
          className={styles.problemsBlock}
          id="problems"
        >
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text={mentorsDictionary.dictionary.solutions.title[language]}
              placeholder=""
            />
            <p className={styles.titleDescription}>
              {mentorsDictionary.dictionary.solutions.description[language]}
            </p>
          </VerticalContainer>
          <VerticalContainer className={styles.problems}>
            <ProblemItem
              title={mentorsDictionary.dictionary.solutions.timeSaving.title[language]}
              description={mentorsDictionary.dictionary.solutions.timeSaving.description[language]}
              imageSrc="https://drive.google.com/thumbnail?id=1nTTtnLsX3mCFOKdua6aSlG6WL61vN49o&sz=w500"
            />
            <ProblemItem
              title={mentorsDictionary.dictionary.solutions.progressMonitoring.title[language]}
              description={mentorsDictionary.dictionary.solutions.progressMonitoring.description[language]}
              imageSrc="https://drive.google.com/thumbnail?id=1bZryfMCG_JwdaBPoaGN8KqRDTwP3cda7&sz=w500"
              isReversed
            />
            <ProblemItem
              title={mentorsDictionary.dictionary.solutions.focusOnResults.title[language]}
              description={mentorsDictionary.dictionary.solutions.focusOnResults.description[language]}
              imageSrc="https://drive.google.com/thumbnail?id=1cKQvsA0hlBPSJ3sGRXYKPQsBYzjBsom6&sz=w500"
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
              text={mentorsDictionary.dictionary.reviews.title[language]}
              placeholder=""
            />
          </div>
          <HorizontalContainer className={styles.reviewList}>
            <Slider
              sliderItems={reviewCards}
              settings={{pagination: false}}
            />
          </HorizontalContainer>
          <Button
            buttonType={ButtonType.PRIMARY}
            value={mentorsDictionary.dictionary.callToActionButton[language]}
            icon={
              <Icon
                size={IconSize.SMALL}
                name="ArrowRightIcon"
                className={styles.icon}
              />
            }
            onClick={() => getStarted(navigate, user?.uuid)}
            className={styles.triesActionButton}
          />
        </div>

        <div
          className={styles.pricingBlock}
          id="pricing"
        >
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text={mentorsDictionary.dictionary.pricing.title[language]}
            placeholder=""
          />
          <PricingBlock pricePlans={pricePlansList} />
        </div>

        <div
          className={styles.questionsBlock}
          id="questions"
        >
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text={mentorsDictionary.dictionary.questions.title[language]}
              placeholder=""
            />
          </VerticalContainer>
          <Accordion
            items={accordionItems}
            type={accordionTypes.MULTIPLE}
            className={styles.accordion}
          />
        </div>

        <HorizontalContainer className={styles.triesBlock}>
          <HorizontalContainer className={styles.triesContainer}>
            <Title
              className={clsx(styles.titleBlock, styles.title, styles.titleYouShouldBlock)}
              level={HeadingLevel.h2}
              text={mentorsDictionary.dictionary.aboutApp.title[language]}
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                {mentorsDictionary.dictionary.aboutApp.tryOurApp[language]}
              </p>
              <p>
                {mentorsDictionary.dictionary.aboutApp.ourAppIs[language]}
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value={mentorsDictionary.dictionary.callToActionButton[language]}
                icon={
                  <Icon
                    size={IconSize.SMALL}
                    name="ArrowRightIcon"
                    className={styles.icon}
                  />
                }
                onClick={() => getStarted(navigate, user?.uuid)}
                className={styles.triesActionButton}
              />
            </VerticalContainer>
          </HorizontalContainer>
        </HorizontalContainer>

      </div>
      <FooterLanding language={language} />
    </>
  );
});

import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItemProps} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PricingBlock} from "src/component/pricingBlock/PricingBlock";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {pricePlansList} from "src/logic/pricePlans";
import {getStarted} from "src/logic/staticPages/homePage/HomePage";
import {AdvantagesBlock} from "src/logic/staticPages/landingPages/advantagesBlock/AdvantagesBlock";
import {AmountBlock, AmountItem} from "src/logic/staticPages/landingPages/amountBlock/AmountBlock";
import {FooterLanding} from "src/logic/staticPages/landingPages/footerLanding/FooterLanding";
import {HeaderLanding, NavLink} from "src/logic/staticPages/landingPages/headerLanding/HeaderLanding";
import {MainBlock} from "src/logic/staticPages/landingPages/mainBlock/MainBlock";
import {ProblemItemProps} from "src/logic/staticPages/landingPages/problemItem/ProblemItem";
import {ProblemsBlock} from "src/logic/staticPages/landingPages/problemsBlock/ProblemsBlock";
import {ReviewsBlock} from "src/logic/staticPages/landingPages/reviewsBlock/ReviewsBlock";
import {VideoBlock} from "src/logic/staticPages/landingPages/videoBlock/VideoBlock";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/staticPages/landingPages/landings/loremLandingPage/LoremLandingPage.module.scss";

/**
 * Lorem landing page
 */
export const LoremLandingPage = observer(() => {
  const {user} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const navigate = useNavigate();

  const navList: NavLink[] = [
    {
      path: "video",
      value: LanguageService.loremLanding.navigation.video[language],
    },
    {
      path: "advantages",
      value: LanguageService.loremLanding.navigation.advantages[language],
    },
    {
      path: "problems",
      value: LanguageService.loremLanding.navigation.solutions[language],
    },
    {
      path: "reviews",
      value: LanguageService.loremLanding.navigation.reviews[language],
    },
    {
      path: "pricing",
      value: LanguageService.loremLanding.navigation.pricing[language],
    },
    {
      path: "questions",
      value: LanguageService.loremLanding.navigation.questions[language],
    },
  ];

  const accordionItems = LanguageService.loremLanding.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  const amountItems: AmountItem[] = [
    {
      id: "00000000-0000-0000-0000-00000000001",
      amount: 70,
      description: LanguageService.loremLanding.amountBlock.trainings[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000002",
      amount: 300,
      description: LanguageService.loremLanding.amountBlock.activeStudents[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000003",
      amount: 40,
      description: LanguageService.loremLanding.amountBlock.mentors[language],
    },
  ];

  const advantagesList: AdvantageItemProps[] = [
    {
      title: LanguageService.loremLanding.advantages.saveTime.title[language],
      description: LanguageService.loremLanding.advantages.saveTime.description[language],
      iconName: "ClockIcon",
    },
    {
      title: LanguageService.loremLanding.advantages.adaptability.title[language],
      description: LanguageService.loremLanding.advantages.adaptability.description[language],
      iconName: "TrendingUpIcon",
    },
    {
      title: LanguageService.loremLanding.advantages.structuredPlan.title[language],
      description: LanguageService.loremLanding.advantages.structuredPlan.description[language],
      iconName: "ActivityIcon",
    },
  ];

  const problemsList: ProblemItemProps[] = [
    {
      title: LanguageService.loremLanding.solutions.userInterests.title[language],
      description: LanguageService.loremLanding.solutions.userInterests.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1TSOIZOIg4uvfWeRrE5SUf44CBLanjTUP&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.loremLanding.solutions.userInterests.callToActionButton[language],

      /**
       * Sd
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.loremLanding.solutions.mentoringSupport.title[language],
      description: LanguageService.loremLanding.solutions.mentoringSupport.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1ipbye-Gw_KT81T6KDMFpcfKkyxIO9C3g&sz=w500",
      isReversed: true,
      buttonValue: LanguageService.loremLanding.solutions.mentoringSupport.callToActionButton[language],

      /**
       * Sd
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.loremLanding.solutions.progressMonitoring.title[language],
      description: LanguageService.loremLanding.solutions.progressMonitoring.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1cKQvsA0hlBPSJ3sGRXYKPQsBYzjBsom6&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.loremLanding.solutions.progressMonitoring.callToActionButton[language],

      /**
       * Sd
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
  ];

  const reviewsList: SliderItem[] = [
    {
      id: 1,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.loremLanding.reviews.kirillReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=&sz=w4000"
          reviewerName={LanguageService.loremLanding.reviews.kirillReview.mentorName[language]}
          reviewerProfession={LanguageService.loremLanding.reviews.kirillReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.loremLanding.reviews.viktarReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1mx9_dCHdwlxGw1UK_tkHZjHZKLjuBnhK&sz=w4000"
          reviewerName={LanguageService.loremLanding.reviews.viktarReview.mentorName[language]}
          reviewerProfession={LanguageService.loremLanding.reviews.viktarReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.loremLanding.reviews.viktoryiaReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1uEyBTZIon2OFQOOG7pCtkigXYD4YXwc8&sz=w4000"
          reviewerName={LanguageService.loremLanding.reviews.viktoryiaReview.mentorName[language]}
          reviewerProfession={LanguageService.loremLanding.reviews.viktoryiaReview.mentorProfession[language]}
        />
      ),
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <HeaderLanding
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          navList={navList}
          userUuid={user?.uuid}
        />

        <MainBlock
          staticTitle={LanguageService.loremLanding.main.title[language]}
          animatedTitle={LanguageService.loremLanding.main.grow[language]}
          backgroundImageAlt={LanguageService.loremLanding.main.backgroundImageAlt[language]}
          backgroundImagePath="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
          description={LanguageService.loremLanding.main.description[language]}
          buttonValue={LanguageService.loremLanding.callToActionButton[language]}
          onCLick={() => getStarted(navigate, user?.uuid)}
        />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.videoBlock}
          id="video"
        >
          <VideoBlock
            title={LanguageService.loremLanding.videoBlock.title[language]}
            description={LanguageService.loremLanding.videoBlock.description[language]}
            videoPath={LanguageService.loremLanding.videoBlock.videoPath[language]}
            buttonValue={LanguageService.loremLanding.videoBlock.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div>

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id="advantages"
        >
          <AdvantagesBlock
            title={LanguageService.loremLanding.advantages.title[language]}
            advantageItems={advantagesList}
          />
        </div>

        <AmountBlock amountItems={amountItems} />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.problemsBlock}
          id="problems"
        >
          <ProblemsBlock
            title={LanguageService.loremLanding.solutions.title[language]}
            description={LanguageService.loremLanding.solutions.description[language]}
            problemItems={problemsList}
          />
        </div>

        <div
          className={styles.reviewBlock}
          id="reviews"
        >
          <ReviewsBlock
            title={LanguageService.loremLanding.reviews.title[language]}
            reviewItems={reviewsList}
            buttonValue={LanguageService.loremLanding.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div>

        <div
          className={styles.pricingBlock}
          id="pricing"
        >
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text={LanguageService.loremLanding.pricing.title[language]}
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
              text={LanguageService.loremLanding.questions.title[language]}
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
              text={LanguageService.loremLanding.aboutApp.title[language]}
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                {LanguageService.loremLanding.aboutApp.tryOurApp[language]}
              </p>
              <p>
                {LanguageService.loremLanding.aboutApp.ourAppIs[language]}
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.loremLanding.callToActionButton[language]}
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

import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItemProps} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PricePlanType} from "src/component/pricingBlock/pricePlan/PricePlan";
import {PricingBlock} from "src/component/pricingBlock/PricingBlock";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
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
import styles from "src/logic/staticPages/landingPages/landings/trainingWithAiLandingPage/TrainingWithAILandingPage.module.scss";

/**
 * Training with AI landing page
 */
export const TrainingWithAILandingPage = observer(() => {
  const {user} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const navigate = useNavigate();

  const navList: NavLink[] = [
    {
      path: "video",
      value: LanguageService.trainingWithAiLanding.navigation.video[language],
    },
    {
      path: "advantages",
      value: LanguageService.trainingWithAiLanding.navigation.advantages[language],
    },
    {
      path: "problems",
      value: LanguageService.trainingWithAiLanding.navigation.solutions[language],
    },
    {
      path: "reviews",
      value: LanguageService.trainingWithAiLanding.navigation.reviews[language],
    },
    {
      path: "pricing",
      value: LanguageService.trainingWithAiLanding.navigation.pricing[language],
    },
    {
      path: "questions",
      value: LanguageService.trainingWithAiLanding.navigation.questions[language],
    },
  ];

  const accordionItems = LanguageService.trainingWithAiLanding.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  const amountItems: AmountItem[] = [
    {
      id: "00000000-0000-0000-0000-00000000001",
      amount: 70,
      description: LanguageService.trainingWithAiLanding.amountBlock.trainings[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000002",
      amount: 300,
      description: LanguageService.trainingWithAiLanding.amountBlock.activeStudents[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000003",
      amount: 40,
      description: LanguageService.trainingWithAiLanding.amountBlock.mentors[language],
    },
  ];

  const advantagesList: AdvantageItemProps[] = [
    {
      title: LanguageService.trainingWithAiLanding.advantages.saveTime.title[language],
      description: LanguageService.trainingWithAiLanding.advantages.saveTime.description[language],
      iconName: "ClockIcon",
    },
    {
      title: LanguageService.trainingWithAiLanding.advantages.adaptability.title[language],
      description: LanguageService.trainingWithAiLanding.advantages.adaptability.description[language],
      iconName: "TrendingUpIcon",
    },
    {
      title: LanguageService.trainingWithAiLanding.advantages.structuredPlan.title[language],
      description: LanguageService.trainingWithAiLanding.advantages.structuredPlan.description[language],
      iconName: "ActivityIcon",
    },
  ];

  const problemsList: ProblemItemProps[] = [
    {
      title: LanguageService.trainingWithAiLanding.solutions.userInterests.title[language],
      description: LanguageService.trainingWithAiLanding.solutions.userInterests.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1TSOIZOIg4uvfWeRrE5SUf44CBLanjTUP&sz=w1000",
      isReversed: false,
      buttonValue: LanguageService.trainingWithAiLanding.solutions.userInterests.callToActionButton[language],

      /**
       * Sd
       */
      onCLick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.trainingWithAiLanding.solutions.mentoringSupport.title[language],
      description: LanguageService.trainingWithAiLanding.solutions.mentoringSupport.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1ipbye-Gw_KT81T6KDMFpcfKkyxIO9C3g&sz=w1000",
      isReversed: true,
      buttonValue: LanguageService.trainingWithAiLanding.solutions.mentoringSupport.callToActionButton[language],

      /**
       * Sd
       */
      onCLick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.trainingWithAiLanding.solutions.progressMonitoring.title[language],
      description: LanguageService.trainingWithAiLanding.solutions.progressMonitoring.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1fKbItiABNCIlHNM87qwTH1L0fezqdiab&sz=w1000",
      isReversed: false,
      buttonValue: LanguageService.trainingWithAiLanding.solutions.progressMonitoring.callToActionButton[language],

      /**
       * Sd
       */
      onCLick: () => getStarted(navigate, user?.uuid),
    },
  ];

  const reviewsList: SliderItem[] = [
    {
      id: 1,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.trainingWithAiLanding.reviews.kirillReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1T4XtkEjC7KKgqnox7yE9JttbWdxfzlr4&sz=w1000"
          reviewerName={LanguageService.trainingWithAiLanding.reviews.kirillReview.mentorName[language]}
          reviewerProfession={LanguageService.trainingWithAiLanding.reviews.kirillReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.trainingWithAiLanding.reviews.viktarReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=18oHI9KoiaYvd_UowHyqsJbDLLhmuxPxr&sz=w1000"
          reviewerName={LanguageService.trainingWithAiLanding.reviews.viktarReview.mentorName[language]}
          reviewerProfession={LanguageService.trainingWithAiLanding.reviews.viktarReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.trainingWithAiLanding.reviews.viktoryiaReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1uEyBTZIon2OFQOOG7pCtkigXYD4YXwc8&sz=w1000"
          reviewerName={LanguageService.trainingWithAiLanding.reviews.viktoryiaReview.mentorName[language]}
          reviewerProfession={LanguageService.trainingWithAiLanding.reviews.viktoryiaReview.mentorProfession[language]}
        />
      ),
    },
  ];

  const pricePlansList: PricePlanType[] = [
    {
      id: 0,
      theme: "light",
      name: "Start",
      price: 0,
      period: "free",
      capabilities: {
        ownTrainings: null,
        aiSupport: null,
        trackProgress: null,
        chat: null,
        notifications: null,
        mobileSupport: null,
      },
      buttonValue: "start",

      /**
       * Sd
       */
      onCLick: () => {},
    },
    {
      id: 1,
      theme: "dark",
      name: "Grow",
      price: 50,
      period: "month",
      capabilities: {
        allInStart: null,
        consultation: null,
        mentorSupport: null,
        secondMeeting: null,
      },
      buttonValue: "grow",

      /**
       * Sd
       */
      onCLick: () => {},
    },
    {
      id: 2,
      theme: "light",
      name: "Scale",
      price: 0,
      period: "individually",
      capabilities: {
        allInGrow: null,
        prioritySupport: null,
        featureRequest: null,
        onboarding: null,
      },
      buttonValue: "scale",

      /**
       * Sd
       */
      onCLick: () => {},
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
          staticTitle={LanguageService.trainingWithAiLanding.main.title[language]}
          animatedTitle={LanguageService.trainingWithAiLanding.main.grow[language]}
          backgroundImageAlt={LanguageService.trainingWithAiLanding.main.backgroundImageAlt[language]}
          backgroundImagePath="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
          description={LanguageService.trainingWithAiLanding.main.description[language]}
          buttonValue={LanguageService.trainingWithAiLanding.callToActionButton[language]}
          onCLick={() => getStarted(navigate, user?.uuid)}
        />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.videoBlock}
          id="video"
        >
          <VideoBlock
            title={LanguageService.trainingWithAiLanding.videoBlock.title[language]}
            description={LanguageService.trainingWithAiLanding.videoBlock.description[language]}
            videoPath={LanguageService.trainingWithAiLanding.videoBlock.videoPath[language]}
            buttonValue={LanguageService.trainingWithAiLanding.videoBlock.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div>

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id="advantages"
        >
          <AdvantagesBlock
            title={LanguageService.trainingWithAiLanding.advantages.title[language]}
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
            title={LanguageService.trainingWithAiLanding.solutions.title[language]}
            description={LanguageService.trainingWithAiLanding.solutions.description[language]}
            problemItems={problemsList}
          />
        </div>

        <div
          className={styles.reviewBlock}
          id="reviews"
        >
          <ReviewsBlock
            title={LanguageService.trainingWithAiLanding.reviews.title[language]}
            reviewItems={reviewsList}
            buttonValue={LanguageService.trainingWithAiLanding.callToActionButton[language]}
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
            text={LanguageService.trainingWithAiLanding.pricing.title[language]}
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
              text={LanguageService.trainingWithAiLanding.questions.title[language]}
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
              text={LanguageService.trainingWithAiLanding.aboutApp.title[language]}
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                {LanguageService.trainingWithAiLanding.aboutApp.tryOurApp[language]}
              </p>
              <p>
                {LanguageService.trainingWithAiLanding.aboutApp.ourAppIs[language]}
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.trainingWithAiLanding.callToActionButton[language]}
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

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
import styles from "src/logic/staticPages/landingPages/landings/gameLandingPage/GameLandingPage.module.scss";

const VIDEO_BLOCK_ID = "abd4z738-01d2-444d-b83d-0ee97c02329a";
const ADVANTAGES_BLOCK_ID = "8bh273ef-6477-450c-89fc-e3a763e69899";
const PROBLEMS_BLOCK_ID = "3c716293-1460-4037-af44-85bc3148fe93";
const REVIEWS_BLOCK_ID = "2e482b1a-9b98-4c46-a276-dc0d7bf02275";
const PRICING_BLOCK_ID = "f3ad75b9-dda3-4bff-8f54-6e012d833b68";
const QUESTIONS_BLOCK_ID = "08b1650b-6e42-4361-87b8-e029a36e8f1a";

/**
 * Game SOL landing page
 */
export const GameLandingPage = observer(() => {
  const {user} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const navigate = useNavigate();

  const navList: NavLink[] = [
    {
      path: VIDEO_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.video[language],
    },
    {
      path: ADVANTAGES_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.advantages[language],
    },
    {
      path: PROBLEMS_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.solutions[language],
    },
    {
      path: REVIEWS_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.reviews[language],
    },
    {
      path: PRICING_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.pricing[language],
    },
    {
      path: QUESTIONS_BLOCK_ID,
      value: LanguageService.gameLanding.navigation.questions[language],
    },
  ];

  const accordionItems = LanguageService.gameLanding.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  const amountItems: AmountItem[] = [
    {
      id: "00000000-0000-0000-0000-00000000001",
      amount: 70,
      description: LanguageService.gameLanding.amountBlock.trainings[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000002",
      amount: 300,
      description: LanguageService.gameLanding.amountBlock.activeStudents[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000003",
      amount: 40,
      description: LanguageService.gameLanding.amountBlock.mentors[language],
    },
  ];

  const advantagesList: AdvantageItemProps[] = [
    {
      title: LanguageService.gameLanding.advantages.saveTime.title[language],
      description: LanguageService.gameLanding.advantages.saveTime.description[language],
      iconName: "ClockIcon",
    },
    {
      title: LanguageService.gameLanding.advantages.noStress.title[language],
      description: LanguageService.gameLanding.advantages.noStress.description[language],
      iconName: "ActivityIcon",
    },
    {
      title: LanguageService.gameLanding.advantages.multiplayer.title[language],
      description: LanguageService.gameLanding.advantages.multiplayer.description[language],
      iconName: "TrendingUpIcon",
    },
  ];

  const problemsList: ProblemItemProps[] = [
    {
      title: LanguageService.gameLanding.solutions.motivation.title[language],
      description: LanguageService.gameLanding.solutions.motivation.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1nTTtnLsX3mCFOKdua6aSlG6WL61vN49o&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.gameLanding.solutions.motivation.callToActionButton[language],

      /**
       * Sd
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.gameLanding.solutions.relax.title[language],
      description: LanguageService.gameLanding.solutions.relax.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1bZryfMCG_JwdaBPoaGN8KqRDTwP3cda7&sz=w500",
      isReversed: true,
      buttonValue: LanguageService.gameLanding.solutions.relax.callToActionButton[language],

      /**
       * Sd
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.gameLanding.solutions.multiplayer.title[language],
      description: LanguageService.gameLanding.solutions.multiplayer.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1cKQvsA0hlBPSJ3sGRXYKPQsBYzjBsom6&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.gameLanding.solutions.multiplayer.callToActionButton[language],

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
          review={LanguageService.gameLanding.reviews.kirillReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1Y7dC3TG5cuNaWza9Xf0-07cGAJEtUYQ2"
          reviewerName={LanguageService.gameLanding.reviews.kirillReview.mentorName[language]}
          reviewerProfession={LanguageService.gameLanding.reviews.kirillReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.gameLanding.reviews.viktarReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=18PdMfcNQs8Cy_u3VzDhwSM3V18nTIXQh"
          reviewerName={LanguageService.gameLanding.reviews.viktarReview.mentorName[language]}
          reviewerProfession={LanguageService.gameLanding.reviews.viktarReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.gameLanding.reviews.viktoryiaReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1-6Vtr_t5td4RSjXLnoj5fZxJ1nPrf7KE"
          reviewerName={LanguageService.gameLanding.reviews.viktoryiaReview.mentorName[language]}
          reviewerProfession={LanguageService.gameLanding.reviews.viktoryiaReview.mentorProfession[language]}
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
          staticTitle={LanguageService.gameLanding.main.title[language]}
          animatedTitle={LanguageService.gameLanding.main.grow[language]}
          backgroundImageAlt={LanguageService.gameLanding.main.backgroundImageAlt[language]}
          backgroundImagePath="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w500"
          description={LanguageService.gameLanding.main.description[language]}
          buttonValue={LanguageService.gameLanding.callToActionButton[language]}
          onCLick={() => getStarted(navigate, user?.uuid)}
        />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.videoBlock}
          id={VIDEO_BLOCK_ID}
        >
          <VideoBlock
            title={LanguageService.gameLanding.videoBlock.title[language]}
            description={LanguageService.gameLanding.videoBlock.description[language]}
            videoPath={LanguageService.gameLanding.videoBlock.videoPath[language]}
            buttonValue={LanguageService.gameLanding.videoBlock.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div>

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id={ADVANTAGES_BLOCK_ID}
        >
          <AdvantagesBlock
            title={LanguageService.gameLanding.advantages.title[language]}
            advantageItems={advantagesList}
          />
        </div>

        <AmountBlock amountItems={amountItems} />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.problemsBlock}
          id={PROBLEMS_BLOCK_ID}
        >
          <ProblemsBlock
            title={LanguageService.gameLanding.solutions.title[language]}
            description={LanguageService.gameLanding.solutions.description[language]}
            problemItems={problemsList}
          />
        </div>

        <div
          className={styles.reviewBlock}
          id={REVIEWS_BLOCK_ID}
        >
          <ReviewsBlock
            title={LanguageService.gameLanding.reviews.title[language]}
            reviewItems={reviewsList}
            buttonValue={LanguageService.gameLanding.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div>

        <div
          className={styles.pricingBlock}
          id={PRICING_BLOCK_ID}
        >
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text={LanguageService.gameLanding.pricing.title[language]}
            placeholder=""
          />
          <PricingBlock pricePlans={pricePlansList} />
        </div>

        <div
          className={styles.questionsBlock}
          id={QUESTIONS_BLOCK_ID}
        >
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text={LanguageService.gameLanding.questions.title[language]}
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
              text={LanguageService.gameLanding.aboutApp.title[language]}
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                {LanguageService.gameLanding.aboutApp.tryOurApp[language]}
              </p>
              <p>
                {LanguageService.gameLanding.aboutApp.ourAppIs[language]}
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.gameLanding.callToActionButton[language]}
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

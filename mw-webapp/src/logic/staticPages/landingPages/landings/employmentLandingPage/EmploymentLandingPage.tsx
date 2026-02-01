import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItemProps} from "src/component/advantageItem/AdvantageItem";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
// Import {PricingBlock} from "src/component/pricingBlock/PricingBlock";
// import {ReviewCard} from "src/component/reviewCard/ReviewCard";
// import {SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
// Import {pricePlansList} from "src/logic/pricePlans";
import {getStarted} from "src/logic/staticPages/homePage/HomePage";
import {AdvantagesBlock} from "src/logic/staticPages/landingPages/advantagesBlock/AdvantagesBlock";
import {AmountBlock, AmountItem} from "src/logic/staticPages/landingPages/amountBlock/AmountBlock";
import {FooterLanding} from "src/logic/staticPages/landingPages/footerLanding/FooterLanding";
import {HeaderLanding, NavLink} from "src/logic/staticPages/landingPages/headerLanding/HeaderLanding";
import {MainBlock} from "src/logic/staticPages/landingPages/mainBlock/MainBlock";
import {ProblemItemProps} from "src/logic/staticPages/landingPages/problemItem/ProblemItem";
import {ProblemsBlock} from "src/logic/staticPages/landingPages/problemsBlock/ProblemsBlock";
// Import {ReviewsBlock} from "src/logic/staticPages/landingPages/reviewsBlock/ReviewsBlock";
// Import {VideoBlock} from "src/logic/staticPages/landingPages/videoBlock/VideoBlock";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/staticPages/landingPages/landings/employmentLandingPage/EmploymentLandingPage.module.scss";

/**
 * Masters Way - Employment landing page
 */
export const EmploymentLandingPage = observer(() => {
  const {user} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const navigate = useNavigate();

  const navList: NavLink[] = [
    {
      path: "problem",
      value: LanguageService.employmentLanding.navigation.problem[language],
    },
    {
      path: "solution",
      value: LanguageService.employmentLanding.navigation.solution[language],
    },
    {
      path: "advantages",
      value: LanguageService.employmentLanding.navigation.advantages[language],
    },
    {
      path: "pricing",
      value: LanguageService.employmentLanding.navigation.pricing[language],
    },
    {
      path: "questions",
      value: LanguageService.employmentLanding.navigation.questions[language],
    },
  ];

  const accordionItems = LanguageService.employmentLanding.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  const amountItems: AmountItem[] = [
    {
      id: "00000000-0000-0000-0000-00000000001",
      amount: 95,
      description: LanguageService.employmentLanding.amountBlock.employmentRate[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000002",
      amount: 3,
      description: LanguageService.employmentLanding.amountBlock.referralInvitations[language],
    },
    {
      id: "00000000-0000-0000-0000-00000000003",
      amount: 40,
      description: LanguageService.employmentLanding.amountBlock.mentors[language],
    },
  ];

  const advantagesList: AdvantageItemProps[] = [
    {
      title: LanguageService.employmentLanding.advantages.honestSystem.title[language],
      description: LanguageService.employmentLanding.advantages.honestSystem.description[language],
      iconName: "EyeOpenedIcon",
    },
    {
      title: LanguageService.employmentLanding.advantages.realSkills.title[language],
      description: LanguageService.employmentLanding.advantages.realSkills.description[language],
      iconName: "TrendingUpIcon",
    },
    {
      title: LanguageService.employmentLanding.advantages.individualPath.title[language],
      description: LanguageService.employmentLanding.advantages.individualPath.description[language],
      iconName: "UserIcon",
    },
    {
      title: LanguageService.employmentLanding.advantages.clearUnderstanding.title[language],
      description: LanguageService.employmentLanding.advantages.clearUnderstanding.description[language],
      iconName: "ActivityIcon",
    },
    {
      title: LanguageService.employmentLanding.advantages.referralInvitations.title[language],
      description: LanguageService.employmentLanding.advantages.referralInvitations.description[language],
      iconName: "UsersIcon",
    },
    {
      title: LanguageService.employmentLanding.advantages.focusOnSkills.title[language],
      description: LanguageService.employmentLanding.advantages.focusOnSkills.description[language],
      iconName: "TargetIcon",
    },
  ];

  const problemsList: ProblemItemProps[] = [
    {
      title: LanguageService.employmentLanding.problems.problem1.title[language],
      description: LanguageService.employmentLanding.problems.problem1.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1TSOIZOIg4uvfWeRrE5SUf44CBLanjTUP&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.employmentLanding.problems.problem1.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.employmentLanding.problems.problem2.title[language],
      description: LanguageService.employmentLanding.problems.problem2.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1ipbye-Gw_KT81T6KDMFpcfKkyxIO9C3g&sz=w500",
      isReversed: true,
      buttonValue: LanguageService.employmentLanding.problems.problem2.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
  ];

  const solutionSteps = [
    {
      title: LanguageService.employmentLanding.solution.step1.title[language],
      description: LanguageService.employmentLanding.solution.step1.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1cKQvsA0hlBPSJ3sGRXYKPQsBYzjBsom6&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.employmentLanding.solution.step1.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.employmentLanding.solution.step2.title[language],
      description: LanguageService.employmentLanding.solution.step2.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w500",
      isReversed: true,
      buttonValue: LanguageService.employmentLanding.solution.step2.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.employmentLanding.solution.step3.title[language],
      description: LanguageService.employmentLanding.solution.step3.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1mx9_dCHdwlxGw1UK_tkHZjHZKLjuBnhK&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.employmentLanding.solution.step3.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.employmentLanding.solution.step4.title[language],
      description: LanguageService.employmentLanding.solution.step4.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1uEyBTZIon2OFQOOG7pCtkigXYD4YXwc8&sz=w500",
      isReversed: true,
      buttonValue: LanguageService.employmentLanding.solution.step4.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
    {
      title: LanguageService.employmentLanding.solution.step5.title[language],
      description: LanguageService.employmentLanding.solution.step5.description[language],
      imageSrc: "https://drive.google.com/thumbnail?id=1TSOIZOIg4uvfWeRrE5SUf44CBLanjTUP&sz=w500",
      isReversed: false,
      buttonValue: LanguageService.employmentLanding.solution.step5.callToActionButton[language],

      /**
       * Get started
       */
      onClick: () => getStarted(navigate, user?.uuid),
    },
  ];

  // Const reviewsList: SliderItem[] = [
  //   {
  //     id: 1,
  //     content: (
  //       <ReviewCard
  //         gradeAmount={5}
  //         review={LanguageService.employmentLanding.reviews.alexander.review[language]}
  //         reviewerImageUrl="https://drive.google.com/thumbnail?id=&sz=w4000"
  //         reviewerName={LanguageService.employmentLanding.reviews.alexander.reviewerName[language]}
  //         reviewerProfession={LanguageService.employmentLanding.reviews.alexander.reviewerProfession[language]}
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     content: (
  //       <ReviewCard
  //         gradeAmount={5}
  //         review={LanguageService.employmentLanding.reviews.maria.review[language]}
  //         reviewerImageUrl="https://drive.google.com/thumbnail?id=1mx9_dCHdwlxGw1UK_tkHZjHZKLjuBnhK&sz=w4000"
  //         reviewerName={LanguageService.employmentLanding.reviews.maria.reviewerName[language]}
  //         reviewerProfession={LanguageService.employmentLanding.reviews.maria.reviewerProfession[language]}
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     content: (
  //       <ReviewCard
  //         gradeAmount={5}
  //         review={LanguageService.employmentLanding.reviews.dmitry.review[language]}
  //         reviewerImageUrl="https://drive.google.com/thumbnail?id=1uEyBTZIon2OFQOOG7pCtkigXYD4YXwc8&sz=w4000"
  //         reviewerName={LanguageService.employmentLanding.reviews.dmitry.reviewerName[language]}
  //         reviewerProfession={LanguageService.employmentLanding.reviews.dmitry.reviewerProfession[language]}
  //       />
  //     ),
  //   },
  // ];

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
          staticTitle={LanguageService.employmentLanding.main.title[language]}
          animatedTitle={LanguageService.employmentLanding.main.grow[language]}
          backgroundImageAlt={LanguageService.employmentLanding.main.backgroundImageAlt[language]}
          backgroundImagePath="https://drive.google.com/thumbnail?id=1Y9Xu3b73odKV7VtuLi3RjWM8H7WKiWoA&sz=w1000"
          description={LanguageService.employmentLanding.main.description[language]}
          buttonValue={LanguageService.employmentLanding.callToActionButton[language]}
          onCLick={() => getStarted(navigate, user?.uuid)}
        />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.problemsBlock}
          id="problem"
        >
          <ProblemsBlock
            title={LanguageService.employmentLanding.problems.title[language]}
            description={LanguageService.employmentLanding.problems.description[language]}
            problemItems={problemsList}
          />
        </div>

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id="solution"
        >
          <ProblemsBlock
            title={LanguageService.employmentLanding.solution.title[language]}
            description={LanguageService.employmentLanding.solution.description[language]}
            problemItems={solutionSteps}
          />
        </div>

        <AmountBlock amountItems={amountItems} />

        {/* Can't use VerticalContainer because anchor links don't works */}
        <div
          className={styles.advantagesBlock}
          id="advantages"
        >
          <AdvantagesBlock
            title={LanguageService.employmentLanding.advantages.title[language]}
            advantageItems={advantagesList}
          />
        </div>

        <div
          className={styles.pricingBlock}
          id="pricing"
        >
          <Title
            className={styles.title}
            level={HeadingLevel.h2}
            text={LanguageService.employmentLanding.pricing.title[language]}
            placeholder=""
          />
          <div className={styles.pricingContent}>
            <p>
              <strong>
                {LanguageService.employmentLanding.pricing.mainStatement[language]}
              </strong>
            </p>
            <div className={styles.pricingGrid}>
              <div>
                <h4>
                  {LanguageService.employmentLanding.pricing.duringTraining.title[language]}
                </h4>
                <p>
                  {LanguageService.employmentLanding.pricing.duringTraining.description[language]}
                </p>
                <ul>
                  <li>
                    {LanguageService.employmentLanding.pricing.duringTraining.items.mentoring[language]}
                  </li>
                  <li>
                    {LanguageService.employmentLanding.pricing.duringTraining.items.materials[language]}
                  </li>
                  <li>
                    {LanguageService.employmentLanding.pricing.duringTraining.items.progress[language]}
                  </li>
                  <li>
                    {LanguageService.employmentLanding.pricing.duringTraining.items.case[language]}
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  {LanguageService.employmentLanding.pricing.mainPayment.title[language]}
                </h4>
                <p>
                  {LanguageService.employmentLanding.pricing.mainPayment.description[language]}
                </p>
                <p>
                  <em>
                    {LanguageService.employmentLanding.pricing.mainPayment.disclaimer[language]}
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.questionsBlock}
          id="questions"
        >
          <VerticalContainer className={styles.titleBlock}>
            <Title
              className={styles.title}
              level={HeadingLevel.h2}
              text={LanguageService.employmentLanding.questions.title[language]}
              placeholder=""
            />
          </VerticalContainer>
          <Accordion
            items={accordionItems}
            type={accordionTypes.MULTIPLE}
            className={styles.accordion}
          />
        </div>

        {/* <div
          className={styles.reviewBlock}
          id="reviews"
        >
          <ReviewsBlock
            title={LanguageService.employmentLanding.reviews.title[language]}
            reviewItems={reviewsList}
            buttonValue={LanguageService.employmentLanding.callToActionButton[language]}
            onCLick={() => getStarted(navigate, user?.uuid)}
          />
        </div> */}

        <HorizontalContainer className={styles.triesBlock}>
          <HorizontalContainer className={styles.triesContainer}>
            <Title
              className={clsx(styles.titleBlock, styles.title, styles.titleYouShouldBlock)}
              level={HeadingLevel.h2}
              text={LanguageService.employmentLanding.callToAction.title[language]}
              placeholder=""
            />
            <VerticalContainer className={styles.triesContentBlock}>
              <p>
                {LanguageService.employmentLanding.callToAction.description1[language]}
              </p>
              <p>
                {LanguageService.employmentLanding.callToAction.description2[language]}
              </p>
              <Button
                buttonType={ButtonType.PRIMARY}
                value={LanguageService.employmentLanding.callToAction.button[language]}
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

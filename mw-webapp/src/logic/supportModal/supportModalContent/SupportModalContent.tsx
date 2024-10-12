import {useState} from "react";
import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tab, TabItemProps} from "src/component/tab/Tab";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {SupportTopicsItem} from "src/logic/supportModal/supportModalContent/supportTopicsItem/SupportTopicsItem";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/supportModal/supportModalContent/SupportModalContent.module.scss";

const DEFAULT_SUPPORT_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const SELF_LEARNING_WITH_AI_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const HOW_TO_FIND_MENTOR_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const HOW_TO_LEAD_WAY_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const HOW_TO_MANAGE_STUDENTS_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const HOW_TO_MANAGE_TEAM_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const PROJECT_MANAGEMENT_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const HOW_TO_MANAGE_TEAM_BUSINESS_VIDEO_URL = "https://www.youtube.com/embed/F84cw01AjNo?si=zVUS9mFiC1A3gPaX";
const PROJECT_MANAGEMENT_BUSINESS_VIDEO_URL = "https://www.youtube.com/embed/WrgBgDZVVMo?si=uXNrv1w6xRJpXMHc";

/**
 * Support tab item params
 */
interface SupportTabItem {

  /**
   * Item's ID
   */
  id: string;

  /**
   * Item's title
   */
  title: string;

  /**
   * Item's url to the video
   */
  url: string;
}

/**
 * Support modal content shown on the page when supportModal is open
 */
export const SupportModalContent = () => {
  const {language} = languageStore;
  const [videoUrl, setVideoUrl] = useState<string>(DEFAULT_SUPPORT_VIDEO_URL);

  const studentsTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.students.selfLearningWithAI[language],
      url: SELF_LEARNING_WITH_AI_VIDEO_URL,
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.students.howToFindMentor[language],
      url: HOW_TO_FIND_MENTOR_VIDEO_URL,
    },
    {
      id: "2",
      title: LanguageService.modals.supportModal.students.howToLeadWay[language],
      url: HOW_TO_LEAD_WAY_VIDEO_URL,
    },
  ];

  const mentorsTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.mentors.howToManageStudents[language],
      url: HOW_TO_MANAGE_STUDENTS_VIDEO_URL,
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.mentors.howToManageTeam[language],
      url: HOW_TO_MANAGE_TEAM_VIDEO_URL,
    },
    {
      id: "2",
      title: LanguageService.modals.supportModal.mentors.projectsManagement[language],
      url: PROJECT_MANAGEMENT_VIDEO_URL,
    },
  ];

  const businessTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.business.howToManageTeam[language],
      url: HOW_TO_MANAGE_TEAM_BUSINESS_VIDEO_URL,
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.business.projectsManagement[language],
      url: PROJECT_MANAGEMENT_BUSINESS_VIDEO_URL,
    },
  ];

  /**
   * Sdf
   */
  const renderSupportTabContent = (tabList: SupportTabItem[]) => {
    return (
      <HorizontalContainer className={styles.tabContent}>
        <VerticalContainer className={styles.supportList}>
          {tabList.map((tabItem) => (
            <SupportTopicsItem
              key={tabItem.id}
              title={tabItem.title}
              onClick={() => setVideoUrl(tabItem.url)}
              className={clsx(videoUrl === tabItem.url && styles.active)}
            />
          ))}
        </VerticalContainer>
        <iframe
          width="100%"
          height="400"
          src={videoUrl}
          title="Video onboarding"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        />
      </HorizontalContainer>
    );
  };

  const tabList: TabItemProps[] = [
    {
      id: "0",
      tabTrigger: {
        id: "0",
        value: LanguageService.modals.supportModal.students.title[language],
      },
      tabContent: {
        id: "0",
        value: renderSupportTabContent(studentsTabList),
      },
      value: "Tab 1",

      /**
       * Callback triggered on tab click
       */
      onCLick: () => setVideoUrl(HOW_TO_MANAGE_STUDENTS_VIDEO_URL),
    },
    {
      id: "1",
      tabTrigger: {
        id: "1",
        value: LanguageService.modals.supportModal.mentors.title[language],
      },
      tabContent: {
        id: "1",
        value: renderSupportTabContent(mentorsTabList),
      },
      value: "Tab 2",

      /**
       * Callback triggered on tab click
       */
      onCLick: () => setVideoUrl(HOW_TO_MANAGE_TEAM_BUSINESS_VIDEO_URL),
    },
    {
      id: "2",
      tabTrigger: {
        id: "2",
        value: LanguageService.modals.supportModal.business.title[language],
      },
      tabContent: {
        id: "2",
        value: renderSupportTabContent(businessTabList),
      },
      value: "Tab 3",

      /**
       * Callback triggered on tab click
       */
      onCLick: () => setVideoUrl(HOW_TO_MANAGE_TEAM_BUSINESS_VIDEO_URL),
    },
  ];

  return (
    <Tab tabList={tabList} />
  );
};

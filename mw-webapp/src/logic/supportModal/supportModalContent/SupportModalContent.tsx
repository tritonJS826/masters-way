import {useState} from "react";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tab, TabItemProps} from "src/component/tab/Tab";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {SupportTopicsItem} from "src/logic/supportModal/supportModalContent/supportTopicsItem/SupportTopicsItem";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/supportModal/supportModalContent/SupportModalContent.module.scss";

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
  const studentsTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.students.selfLearningWithAI.title[language],
      url: LanguageService.modals.supportModal.students.selfLearningWithAI.videoUrl[language],
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.students.howToFindMentor.title[language],
      url: LanguageService.modals.supportModal.students.howToFindMentor.videoUrl[language],
    },
    {
      id: "2",
      title: LanguageService.modals.supportModal.students.howToLeadWay.title[language],
      url: LanguageService.modals.supportModal.students.howToLeadWay.videoUrl[language],
    },
  ];

  const mentorsTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.mentors.howToManageStudents.title[language],
      url: LanguageService.modals.supportModal.mentors.howToManageStudents.videoUrl[language],
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.mentors.howToManageTeam.title[language],
      url: LanguageService.modals.supportModal.mentors.howToManageTeam.videoUrl[language],
    },
    {
      id: "2",
      title: LanguageService.modals.supportModal.mentors.projectsManagement.title[language],
      url: LanguageService.modals.supportModal.mentors.projectsManagement.videoUrl[language],
    },
  ];

  const businessTabList: SupportTabItem[] = [
    {
      id: "0",
      title: LanguageService.modals.supportModal.business.howToManageTeam.title[language],
      url: LanguageService.modals.supportModal.business.howToManageTeam.videoUrl[language],
    },
    {
      id: "1",
      title: LanguageService.modals.supportModal.business.projectsManagement.title[language],
      url: LanguageService.modals.supportModal.business.projectsManagement.videoUrl[language],
    },
  ];

  const [videoUrl, setVideoUrl] = useState<string>(studentsTabList[0].url);

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
              isActive={videoUrl === tabItem.url}
            />
          ))}
        </VerticalContainer>
        <iframe
          width="700"
          height="400"
          src={videoUrl}
          title="Video onboarding"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
          className={styles.video}
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
      onCLick: () => setVideoUrl(studentsTabList[0].url),
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
      onCLick: () => setVideoUrl(mentorsTabList[0].url),
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
      onCLick: () => setVideoUrl(businessTabList[0].url),
    },
  ];

  return (
    <Tab tabList={tabList} />
  );
};

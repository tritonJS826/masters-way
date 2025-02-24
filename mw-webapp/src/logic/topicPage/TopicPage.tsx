import {useState} from "react";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {ErrorComponent} from "src/component/errorComponent/ErrorComponent";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Tag, TagType} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {FavoriteUserTrainingDAL} from "src/dataAccessLogic/FavoriteUserTrainingDAL";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {TrainingTrainingTagDAL} from "src/dataAccessLogic/TrainingTrainingTagDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {TopicPageStore} from "src/logic/topicPage/TopicPageStore";
import {DescriptionBlock} from "src/logic/trainingPage/descriptionBlock/DescriptionBlock";
import {TopicsBlock} from "src/logic/trainingPage/topicsBlock/TopicsBlock";
import {TrainingPageStore} from "src/logic/trainingPage/TrainingPageStore";
import {Topic} from "src/model/businessModel/Topic";
import {Training} from "src/model/businessModel/Training";
import {TrainingTag} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/topicPage/TopicPage.module.scss";

const MAX_LENGTH_TRAINING_NAME = 50;
const MIN_LENGTH_TRAINING_NAME = 1;

/**
 * Update Training params
 */
interface UpdateTrainingParams {

  /**
   * Training to update
   */
  trainingToUpdate: PartialWithUuid<Training>;

  /**
   * Callback to update training
   */
  setTraining: (training: PartialWithUuid<Training>) => void;
}

/**
 * Update Training
 */
const updateTraining = async (params: UpdateTrainingParams) => {
  params.setTraining(params.trainingToUpdate);
  await TrainingDAL.updateTraining(params.trainingToUpdate);
};

/**
 * TopicPage props
 */
interface TopicPageProps {

  /**
   * Training's Uuid
   */
  trainingUuid: string;

  /**
   * Topic's Uuid
   */
  topicUuid: string;
}

/**
 * Topic page
 */
export const TopicPage = observer((props: TopicPageProps) => {
  const navigate = useNavigate();
  const [isAddTrainingTagModalOpen, setIsAddTrainingTagModalOpen] = useState(false);
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const topicPageStore = useStore<
  new (trainingUuid: string) => TopicPageStore,
  [string], TopicPageStore>({
      storeForInitialize: TopicPageStore,
      dataForInitialization: [props.topicUuid],
      dependency: [props.topicUuid],
    });

  if (!topicPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = !!user && user.uuid === topicPageStore.topic.owner.uuid;

  // If (!isOwner && topicPageStore.training.isPrivate) {
  //   return (
  //     <ErrorComponent
  //       title={LanguageService.training.privateInfo.title[language]}
  //       description={LanguageService.training.privateInfo.description[language]}
  //     />
  //   );
  // }

  /**
   * Delete training
   */
  const deleteTraining = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await TrainingDAL.deleteTraining(topicPageStore.training.uuid);
    navigate(pages.user.getPath({uuid: user.uuid}));
  };

  return (
    <div style={{paddingTop: "300px"}}>
      {" "}
      Hello
    </div>
    // <VerticalContainer className={styles.container}>
    //   <HorizontalGridContainer className={styles.trainingDashboard}>
    //     <VerticalContainer className={styles.trainingDashBoardLeft}>
    //       <VerticalContainer className={styles.trainingInfo}>
    //         <HorizontalContainer className={styles.trainingTitleBlock}>
    //           <Infotip content={LanguageService.training.infotip.trainingName[language]} />
    //           <Title
    //             level={HeadingLevel.h2}
    //             text={topicPageStore.topic.name}
    //             placeholder={LanguageService.common.emptyMarkdown[language]}
    //             onChangeFinish={(name) => {
    //               updateTraining({
    //                 trainingToUpdate: {
    //                   uuid: topicPageStore.training.uuid,
    //                   name,
    //                 },

  //                 /**
  //                  * Update way's name
  //                  */
  //                 setTraining: () => topicPageStore.training.updateName(name),
  //               });
  //             }}
  //             isEditable={isOwner}
  //             className={styles.trainingName}
  //             validators={[
  //               minLengthValidator(MIN_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMinLength[language]),
  //               maxLengthValidator(MAX_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMaxLength[language]),
  //             ]}
  //           />

  //           <HorizontalContainer className={styles.trainingActionButtons}>
  //             <Tooltip
  //               content={favoriteTooltipText}
  //               position={PositionTooltip.LEFT}
  //             >
  //               <Button
  //                 className={clsx(styles.trainingActionsIcon, {[styles.disabled]: !user})}
  //                 value={`${isTrainingInFavorites
  //                   ? Symbols.STAR
  //                   : Symbols.OUTLINED_STAR
  //                 }${Symbols.NO_BREAK_SPACE}${topicPageStore.training.favoriteForUserUuids.length}`}
  //                 onClick={() => {
  //                   if (!user) {
  //                     return;
  //                   }

  //                   if (isTrainingInFavorites) {
  //                     FavoriteUserTrainingDAL.deleteFavoriteUserTraining(topicPageStore.training.uuid);
  //                     topicPageStore.training.deleteUserFromTrainingFavorites(user.uuid);
  //                   } else {
  //                     FavoriteUserTrainingDAL.createFavoriteUserTraining(topicPageStore.training.uuid);
  //                     topicPageStore.training.addUserToTrainingFavorites(user.uuid);
  //                   }

  //                   displayNotification({
  //                     text: isTrainingInFavorites
  //                       ? LanguageService.training.notifications.trainingRemovedFromFavorites[language]
  //                       : LanguageService.training.notifications.trainingAddedToFavorites[language],
  //                     type: NotificationType.INFO,
  //                   });
  //                 }}
  //                 buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
  //               />
  //             </Tooltip>

  //             <Dropdown
  //               contentClassName={styles.trainingActionMenu}
  //               trigger={(
  //                 <Tooltip
  //                   content={LanguageService.training.trainingInfo.trainingActionsTooltip[language]}
  //                   position={PositionTooltip.LEFT}
  //                 >
  //                   <Button
  //                     className={styles.trainingActionsIcon}
  //                     buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
  //                     onClick={() => {}}
  //                     icon={
  //                       <Icon
  //                         size={IconSize.MEDIUM}
  //                         name={"MoreVertical"}
  //                       />
  //                     }
  //                   />
  //                 </Tooltip>
  //               )}

  //               dropdownMenuItems={[
  //                 {
  //                   dropdownSubMenuItems: [
  //                     {
  //                       id: "Make the training private/public",
  //                       isPreventDefaultUsed: false,
  //                       isVisible: isOwner,
  //                       value: topicPageStore.training.isPrivate
  //                         ? LanguageService.training.peopleBlock.makePublicButton[language]
  //                         : LanguageService.training.peopleBlock.makePrivateButton[language],

  //                       /**
  //                        * Toggle training privacy
  //                        */
  //                       onClick: () => updateTraining({
  //                         trainingToUpdate: {
  //                           uuid: topicPageStore.training.uuid,
  //                           isPrivate: !topicPageStore.training.isPrivate,
  //                         },

  //                         /**
  //                          * Update isPrivate property
  //                          */
  //                         setTraining: () => topicPageStore.training.updateIsPrivate(!topicPageStore.training.isPrivate),
  //                       }),
  //                     },
  //                     {
  //                       id: "Copy url to clipboard",
  //                       isPreventDefaultUsed: false,
  //                       value: LanguageService.training.trainingActions.copyUrlToClipboard[language],

  //                       /**
  //                        * Copy url to clipboard
  //                        */
  //                       onClick: async () => {
  //                         await navigator.clipboard.writeText(location.href);
  //                         displayNotification({
  //                           text: LanguageService.training.notifications.urlCopied[language],
  //                           type: NotificationType.INFO,
  //                         });
  //                       },
  //                     },
  //                     {
  //                       id: "Delete the training",
  //                       isPreventDefaultUsed: true,
  //                       value: renderDeleteTrainingDropdownItem,
  //                       isVisible: isOwner,
  //                     },
  //                   ],
  //                 },
  //               ]}
  //             />
  //           </HorizontalContainer>
  //         </HorizontalContainer>

  //         <HorizontalContainer className={styles.trainingTagsContainer}>
  //           {topicPageStore.training.trainingTags.map(tag => (
  //             <Tag
  //               tagName={tag.name}
  //               key={tag.name}
  //               isDeletable={isOwner}
  //               type={TagType.PRIMARY_TAG}
  //               removeTooltipText={LanguageService.common.removeTag[language]}
  //               onDelete={() => {
  //                 TrainingTrainingTagDAL.deleteTrainingTrainingTag({
  //                   trainingTagName: tag.name,
  //                   trainingId: topicPageStore.training.uuid,
  //                 });
  //                 topicPageStore.training.deleteTag(tag.name);
  //               }}
  //             />
  //           ))}
  //           {!topicPageStore.training.trainingTags.length && LanguageService.training.trainingInfo.noTags[language]}
  //           {isOwner && (
  //             <Modal
  //               isOpen={isAddTrainingTagModalOpen}
  //               trigger={
  //                 <Tooltip content={LanguageService.training.trainingInfo.addTrainingTagButton[language]}>
  //                   <Button
  //                     icon={
  //                       <Icon
  //                         size={IconSize.SMALL}
  //                         name="PlusIcon"
  //                       />
  //                     }
  //                     onClick={() => {}}
  //                     buttonType={ButtonType.ICON_BUTTON}
  //                   />
  //                 </Tooltip>
  //               }
  //               content={
  //                 <PromptModalContent
  //                   defaultValue=""
  //                   title={LanguageService.training.trainingInfo.addTrainingTagModalButton[language]}
  //                   placeholder={LanguageService.training.trainingInfo.addTrainingTagModal[language]}
  //                   close={() => setIsAddTrainingTagModalOpen(false)}
  //                   onOk={async (tagName: string) => {
  //                     const isTrainingTagDuplicate = topicPageStore.training.trainingTags
  //                       .some((tag) => tag.name === tagName);
  //                     if (isTrainingTagDuplicate) {
  //                       displayNotification({
  //                         text: `${LanguageService.training.trainingInfo.duplicateTagModal[language]}`,
  //                         type: NotificationType.INFO,
  //                       });
  //                     } else {
  //                       await TrainingTrainingTagDAL.createTrainingTrainingTag({
  //                         name: tagName,
  //                         trainingId: topicPageStore.training.uuid,
  //                       });

  //                       const newTrainingTag = new TrainingTag({name: tagName});
  //                       topicPageStore.training.addTag(newTrainingTag);
  //                     }
  //                   }}
  //                   okButtonValue={LanguageService.training.trainingInfo.addTrainingTagModalButton[language]}
  //                   cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
  //                 />
  //               }
  //             />
  //           )}
  //         </HorizontalContainer>

  //         <DescriptionBlock
  //           description={topicPageStore.training.description}
  //           updateTraining={(description) => updateTraining({
  //             trainingToUpdate: {
  //               uuid: topicPageStore.training.uuid,
  //               description,
  //             },

  //             /**
  //              * Update way's goalDescription
  //              */
  //             setTraining: () => topicPageStore.training.updateDescription(description),
  //           })}
  //           isEditable={isOwner}
  //         />

  //       </VerticalContainer>
  //       <VerticalContainer className={styles.peopleBlock}>
  //         <HorizontalContainer
  //           className={styles.privacyBlock}
  //           dataCy={userWaysAccessIds.privacyStatus}
  //         >
  //           <HorizontalContainer>
  //             <Infotip content={LanguageService.training.infotip.privacyStatus[language]} />
  //             <Title
  //               level={HeadingLevel.h3}
  //               text={LanguageService.training.peopleBlock.trainingPrivacy.title[language]}
  //               placeholder=""
  //             />
  //             {Symbols.NO_BREAK_SPACE}
  //             {topicPageStore.training.isPrivate
  //               ? LanguageService.training.peopleBlock.trainingPrivacy.private[language]
  //               : LanguageService.training.peopleBlock.trainingPrivacy.public[language]
  //             }
  //           </HorizontalContainer>
  //         </HorizontalContainer>

  //         <HorizontalContainer className={styles.ownerBlock}>
  //           <Infotip content={LanguageService.training.infotip.trainingOwner[language]} />
  //           <Title
  //             level={HeadingLevel.h3}
  //             text={LanguageService.training.peopleBlock.trainingOwner[language]}
  //             placeholder=""
  //           />
  //           <Link
  //             path={pages.user.getPath({uuid: topicPageStore.training.owner.uuid})}
  //             className={styles.mentors}
  //           >
  //             {topicPageStore.training.owner.name}
  //           </Link>
  //         </HorizontalContainer>
  //         {/* {!!trainingPageStore.training.mentors.size &&
  //           <MentorsSection
  //             way={way}
  //             setWay={() => {}}
  //             isOwner={isOwner}
  //           />
  //         } */}

  //       </VerticalContainer>

  //     </VerticalContainer>

  //     <VerticalContainer className={styles.trainingTopics}>
  //       <Title
  //         level={HeadingLevel.h3}
  //         text={LanguageService.training.topicsBlock.topics[language]}
  //         placeholder=""
  //       />

  //       <TopicsBlock
  //         addTopic={(topic: Topic) => topicPageStore.training.addTopic(topic)}
  //         deleteTopic={(topicUuid: string) => topicPageStore.training.deleteTopic(topicUuid)}
  //         isEditable={isOwner}
  //         topics={topicPageStore.training.topics}
  //         trainingUuid={topicPageStore.training.uuid}
  //       />
  //     </VerticalContainer>

  //   </HorizontalGridContainer>

  // </VerticalContainer>
  );
});

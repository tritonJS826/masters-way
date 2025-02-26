import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {AnchorLink} from "src/component/anchorLink/AnchorLink";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {PracticeMaterialDAL} from "src/dataAccessLogic/PracticeMaterialDAL";
import {TheoryMaterialDAL} from "src/dataAccessLogic/TheoryMaterialDAL";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {TopicPageStore} from "src/logic/topicPage/TopicPageStore";
import {Topic} from "src/model/businessModel/Topic";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/topicPage/TopicPage.module.scss";

const MAX_LENGTH_TRAINING_NAME = 50;
const MIN_LENGTH_TRAINING_NAME = 1;

/**
 * Update Training params
 */
interface UpdateTopicParams {

  /**
   * Training to update
   */
  topicToUpdate: PartialWithUuid<Topic>;

  /**
   * Callback to update training
   */
  setTopic: (topic: PartialWithUuid<Topic>) => void;
}

/**
 * Update Topic
 */
export const updateTopic = async (params: UpdateTopicParams) => {
  params.setTopic(params.topicToUpdate);
  await TopicDAL.updateTopic(params.topicToUpdate);
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

  /**
   * Add theory material
   */
  const addTheoryMaterial = async (topicUuid: string) => {
    const newTheoryMaterial = await TheoryMaterialDAL.createTheoryMaterial({
      name: "",
      description: "",
      topicUuid,
    });
    topicPageStore.topic.addTheoryMaterial(newTheoryMaterial);
  };

  /**
   * Add practice material
   */
  const addPracticeMaterial = async (topicUuid: string) => {
    const newPracticeMaterial = await PracticeMaterialDAL.createPracticeMaterial({
      name: "",
      taskDescription: "",
      topicUuid,
      answer: "",
      practiceType: "",
      timeToAnswer: 0,
    });
    topicPageStore.topic.addPracticeMaterial(newPracticeMaterial);
  };

  /**
   * Delete topic
   */
  const deleteTopic = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await TopicDAL.deleteTopic(topicPageStore.topic.uuid);
    navigate(pages.training.getPath({uuid: topicPageStore.topic.trainingUuid}));
  };

  const renderDeleteTopicDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.topic.topicActions.deleteTopic[language]}
      </>}
      content={<p>
        {`${LanguageService.topic.topicActions.deleteTopicQuestion[language]} "${topicPageStore.topic.name}"?`}
      </p>}
      onOk={deleteTopic}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />);

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalGridContainer className={styles.topicDashboard}>
        <VerticalContainer className={styles.topicDashBoardLeft}>
          <VerticalContainer className={styles.topicInfo}>
            <HorizontalContainer className={styles.topicTitleBlock}>
              <Infotip content={LanguageService.topic.infotip.topicName[language]} />
              <Title
                level={HeadingLevel.h2}
                text={topicPageStore.topic.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={(name) => {
                  updateTopic({
                    topicToUpdate: {
                      uuid: topicPageStore.topic.uuid,
                      name,
                    },

                    /**
                     * Update topic's name
                     */
                    setTopic: () => topicPageStore.topic.updateName(name),
                  });
                }}
                isEditable={isOwner}
                className={styles.topicName}
                validators={[
                  minLengthValidator(MIN_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMinLength[language]),
                  maxLengthValidator(MAX_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMaxLength[language]),
                ]}
              />

              <HorizontalContainer className={styles.topicActionButtons}>
                <Dropdown
                  trigger={(
                    <Tooltip
                      content={LanguageService.topic.topicInfo.topicActionsTooltip[language]}
                      position={PositionTooltip.LEFT}
                    >
                      <Button
                        className={styles.topicActionsIcon}
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                        icon={
                          <Icon
                            size={IconSize.MEDIUM}
                            name={"MoreVertical"}
                          />
                        }
                      />
                    </Tooltip>
                  )}

                  dropdownMenuItems={[
                    {
                      dropdownSubMenuItems: [
                        {
                          id: "Delete the topic",
                          isPreventDefaultUsed: true,
                          value: renderDeleteTopicDropdownItem,
                          isVisible: isOwner,
                        },
                      ],
                    },
                  ]}
                />

              </HorizontalContainer>
            </HorizontalContainer>

            <Title
              level={HeadingLevel.h3}
              text={LanguageService.topic.materialsBlock.theoryMaterialsTitle[language]}
              placeholder=""
            />

            {topicPageStore.topic.theoryMaterials.map((theoryMaterial) => (
              <AnchorLink
                path={theoryMaterial.name}
                key={theoryMaterial.uuid}
              >
                1231232132131231
                {theoryMaterial.name}
              </AnchorLink>
            ),
            )}

            <Title
              level={HeadingLevel.h3}
              text={LanguageService.topic.materialsBlock.practiceMaterialsTitle[language]}
              placeholder=""
            />

            {topicPageStore.topic.practiceMaterials.map((practiceMaterial) => (

              <div key={practiceMaterial.uuid}>
                1231232132131231
                {practiceMaterial.name}
              </div>
            ),
            )}

          </VerticalContainer>
          <VerticalContainer className={styles.peopleBlock}>
            <HorizontalContainer className={styles.ownerBlock}>
              <Infotip content={LanguageService.topic.infotip.topicOwner[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.topic.peopleBlock.topicOwner[language]}
                placeholder=""
              />
              <Link
                path={pages.user.getPath({uuid: topicPageStore.topic.owner.uuid})}
                className={styles.mentors}
              >
                {topicPageStore.topic.owner.name}
              </Link>
            </HorizontalContainer>
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.materials}>
          {topicPageStore.topic.theoryMaterials.map((theoryMaterial) => (

            <div
              key={theoryMaterial.uuid}
              id={theoryMaterial.name}
            >
              1231232132131231
              {theoryMaterial.name}
              {theoryMaterial.description}
            </div>
          ),
          )}

          {isOwner &&
          <Button
            value={LanguageService.topic.materialsBlock.addNewTheoryMaterialButton[language]}
            onClick={() => addTheoryMaterial(topicPageStore.topic.uuid)}
          />
          }

          {topicPageStore.topic.practiceMaterials.map((practiceMaterial) => (

            <div
              key={practiceMaterial.uuid}
              id={practiceMaterial.name}
            >
              1231232132131231
              {practiceMaterial.name}
              {practiceMaterial.taskDescription}
            </div>
          ),
          )}

          {isOwner &&
          <Button
            value={LanguageService.topic.materialsBlock.addNewPracticalMaterialButton[language]}
            onClick={() => addPracticeMaterial(topicPageStore.topic.uuid)}
          />
          }
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AnchorLink} from "src/component/anchorLink/AnchorLink";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Separator} from "src/component/separator/Separator";
import {Text} from "src/component/text/Text";
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
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
import {TheoryMaterial} from "src/model/businessModel/TheoryMaterial";
import {Topic} from "src/model/businessModel/Topic";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/topicPage/TopicPage.module.scss";

const MAX_LENGTH_TOPIC_NAME = 300;
const MIN_LENGTH_TOPIC_NAME = 1;
const MAX_LENGTH_MATERIAL_NAME = 128;
const MIN_LENGTH_MATERIAL_NAME = 1;

/**
 * Update Topic params
 */
interface UpdateTopicParams {

  /**
   * Topic to update
   */
  topicToUpdate: PartialWithUuid<Topic>;

  /**
   * Callback to update topic
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
 * Update TheoryMaterial params
 */
interface UpdateTheoryMaterialParams {

  /**
   * TheoryMaterial to update
   */
  theoryMaterialToUpdate: PartialWithUuid<TheoryMaterial>;

  /**
   * Callback to update TheoryMaterial
   */
  setTheoryMaterial: (theoryMaterial: PartialWithUuid<TheoryMaterial>) => void;
}

/**
 * Update TheoryMaterial
 */
export const updateTheoryMaterial = async (params: UpdateTheoryMaterialParams) => {
  params.setTheoryMaterial(params.theoryMaterialToUpdate);
  await TheoryMaterialDAL.updateTheoryMaterial(params.theoryMaterialToUpdate);
};

/**
 * Update PracticeMaterial params
 */
interface UpdatePracticeMaterialParams {

  /**
   * PracticeMaterial to update
   */
  practiceMaterialToUpdate: PartialWithUuid<PracticeMaterial>;

  /**
   * Callback to update PracticeMaterial
   */
  setPracticeMaterial: (practiceMaterial: PartialWithUuid<PracticeMaterial>) => void;
}

/**
 * Update PracticeMaterial
 */
export const updatePracticeMaterial = async (params: UpdatePracticeMaterialParams) => {
  params.setPracticeMaterial(params.practiceMaterialToUpdate);
  await PracticeMaterialDAL.updatePracticeMaterial(params.practiceMaterialToUpdate);
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
 * Practice material type
 */
export enum PracticeMaterialType {
  INPUT_WORD = "input_word"
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
      practiceType: PracticeMaterialType.INPUT_WORD,
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

  /**
   * Delete theoryMaterial
   */
  const deleteTheoryMaterial = async (theoryMaterialUuid: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    topicPageStore.topic.deleteTheoryMaterial(theoryMaterialUuid);
    isOwner && await TheoryMaterialDAL.deleteTheoryMaterial(theoryMaterialUuid);
  };

  /**
   * Delete practiceMaterial
   */
  const deletePracticeMaterial = async (practiceMaterialUuid: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    topicPageStore.topic.deletePracticeMaterial(practiceMaterialUuid);
    isOwner && await PracticeMaterialDAL.deletePracticeMaterial(practiceMaterialUuid);
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
                  minLengthValidator(MIN_LENGTH_TOPIC_NAME, LanguageService.topic.notifications.topicNameMinLength[language]),
                  maxLengthValidator(MAX_LENGTH_TOPIC_NAME, LanguageService.topic.notifications.topicNameMaxLength[language]),
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
              <HorizontalContainer
                key={theoryMaterial.uuid}
                className={styles.materialShortBlock}
              >
                <AnchorLink
                  path={theoryMaterial.name}
                  key={theoryMaterial.uuid}
                >
                  {theoryMaterial.name.trim() === ""
                    ? LanguageService.common.emptyMarkdown[language]
                    : <Text text={theoryMaterial.name} />
                  }
                </AnchorLink>
                <Tooltip content={LanguageService.topic.materialsBlock.deleteMaterialTooltip[language]}>
                  <Confirm
                    trigger={
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="TrashIcon"
                          />
                        }
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                      />
                    }
                    content={<p>
                      {renderMarkdown(
                        `${LanguageService.topic.materialsBlock.deleteTheoryMaterialQuestion[language]}
                          "${theoryMaterial.name}"?`,
                      )}
                    </p>}
                    onOk={() => deleteTheoryMaterial(theoryMaterial.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
              </HorizontalContainer>
            ),
            )}

            <Title
              level={HeadingLevel.h3}
              text={LanguageService.topic.materialsBlock.practiceMaterialsTitle[language]}
              placeholder=""
            />

            {topicPageStore.topic.practiceMaterials.map((practiceMaterial) => (
              <HorizontalContainer
                key={practiceMaterial.uuid}
                className={styles.materialShortBlock}
              >
                <AnchorLink path={practiceMaterial.name}>
                  {practiceMaterial.name.trim() === ""
                    ? LanguageService.common.emptyMarkdown[language]
                    : <Text text={practiceMaterial.name} />
                  }
                </AnchorLink>

                <Tooltip content={LanguageService.topic.materialsBlock.deleteMaterialTooltip[language]}>
                  <Confirm
                    trigger={
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="TrashIcon"
                          />
                        }
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                      />
                    }
                    content={<p>
                      {renderMarkdown(
                        `${LanguageService.topic.materialsBlock.deletePracticalMaterialQuestion[language]}
                          "${practiceMaterial.name}"?`,
                      )}
                    </p>}
                    onOk={() => deletePracticeMaterial(practiceMaterial.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
              </HorizontalContainer>
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
            <HorizontalContainer className={styles.ownerBlock}>
              <Infotip content={LanguageService.topic.infotip.topicOwner[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.topic.peopleBlock.parentTraining[language]}
                placeholder=""
              />
              <Link
                path={pages.training.getPath({uuid: topicPageStore.topic.trainingUuid})}
                className={styles.mentors}
              >
                {LanguageService.topic.backToTrainingButton[language]}
              </Link>
            </HorizontalContainer>
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.materials}>
          {topicPageStore.topic.theoryMaterials.map((theoryMaterial: TheoryMaterial) => (
            <div
              key={theoryMaterial.uuid}
              className={styles.materialContainer}
              id={theoryMaterial.name}
            >
              <HorizontalContainer className={styles.materialTitleAndActionsBlock}>
                <Title
                  level={HeadingLevel.h2}
                  text={theoryMaterial.name}
                  isEditable={isOwner}
                  placeholder={isOwner
                    ? LanguageService.common.emptyMarkdownAction[language]
                    : LanguageService.common.emptyMarkdown[language]}
                  onChangeFinish={(name) => {
                    updateTheoryMaterial({
                      theoryMaterialToUpdate: {
                        uuid: theoryMaterial.uuid,
                        name,
                      },

                      /**
                       * Update theoryMaterial's name
                       */
                      setTheoryMaterial: () => theoryMaterial.updateName(name),
                    });
                  }}
                  className={styles.title}
                  validators={[
                    minLengthValidator(
                      MIN_LENGTH_MATERIAL_NAME,
                      LanguageService.topic.notifications.materialNameMinLength[language],
                    ),
                    maxLengthValidator(
                      MAX_LENGTH_MATERIAL_NAME,
                      LanguageService.topic.notifications.materialNameMaxLength[language],
                    ),
                  ]}
                />
                <Tooltip content={LanguageService.topic.materialsBlock.deleteMaterialTooltip[language]}>
                  <Confirm
                    trigger={
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="TrashIcon"
                          />
                        }
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                      />
                    }
                    content={<p>
                      {renderMarkdown(
                        `${LanguageService.topic.materialsBlock.deleteTheoryMaterialQuestion[language]}
                          "${theoryMaterial.name}"?`,
                      )}
                    </p>}
                    onOk={() => deleteTheoryMaterial(theoryMaterial.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
              </HorizontalContainer>
              <EditableTextarea
                text={theoryMaterial.description}
                onChangeFinish={(description) => {
                  updateTheoryMaterial({
                    theoryMaterialToUpdate: {
                      uuid: theoryMaterial.uuid,
                      description,
                    },

                    /**
                     * Update theoryMaterial's description
                     */
                    setTheoryMaterial: () => theoryMaterial.updateDescription(description),
                  });
                }}
                isEditable={isOwner}
                className={styles.editableTextarea}
                placeholder={isOwner
                  ? LanguageService.common.emptyMarkdownAction[language]
                  : LanguageService.common.emptyMarkdown[language]}
              />
              <Separator className={styles.separator} />
            </div>
          ),
          )}

          {isOwner &&
          <Button
            value={LanguageService.topic.materialsBlock.addNewTheoryMaterialButton[language]}
            onClick={() => addTheoryMaterial(topicPageStore.topic.uuid)}
            className={styles.addMaterial}
          />
          }

          {topicPageStore.topic.practiceMaterials.map((practiceMaterial: PracticeMaterial) => (

            <div
              key={practiceMaterial.uuid}
              className={styles.materialContainer}
              id={practiceMaterial.name}
            >
              <HorizontalContainer className={styles.materialTitleAndActionsBlock}>
                <Title
                  level={HeadingLevel.h2}
                  text={practiceMaterial.name}
                  isEditable={isOwner}
                  placeholder={isOwner
                    ? LanguageService.common.emptyMarkdownAction[language]
                    : LanguageService.common.emptyMarkdown[language]}
                  onChangeFinish={(name) => {
                    updatePracticeMaterial({
                      practiceMaterialToUpdate: {
                        uuid: practiceMaterial.uuid,
                        name,
                      },

                      /**
                       * Update practiceMaterial's name
                       */
                      setPracticeMaterial: () => practiceMaterial.updateName(name),
                    });
                  }}
                  className={styles.title}
                  validators={[
                    minLengthValidator(
                      MIN_LENGTH_MATERIAL_NAME,
                      LanguageService.topic.notifications.materialNameMinLength[language],
                    ),
                    maxLengthValidator(
                      MAX_LENGTH_MATERIAL_NAME,
                      LanguageService.topic.notifications.materialNameMaxLength[language],
                    ),
                  ]}
                />
                <Tooltip content={LanguageService.topic.materialsBlock.deleteMaterialTooltip[language]}>
                  <Confirm
                    trigger={
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="TrashIcon"
                          />
                        }
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                      />
                    }
                    content={<p>
                      {renderMarkdown(
                        `${LanguageService.topic.materialsBlock.deletePracticalMaterialQuestion[language]}
                          "${practiceMaterial.name}"?`,
                      )}
                    </p>}
                    onOk={() => deletePracticeMaterial(practiceMaterial.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
              </HorizontalContainer>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.topic.materialsBlock.practiceDescriptionTitle[language]}
                placeholder=""
              />
              <EditableTextarea
                text={practiceMaterial.taskDescription}
                onChangeFinish={(taskDescription) => {
                  updatePracticeMaterial({
                    practiceMaterialToUpdate: {
                      uuid: practiceMaterial.uuid,
                      taskDescription,
                    },

                    /**
                     * Update practiceMaterial's description
                     */
                    setPracticeMaterial: () => practiceMaterial.updateDescription(taskDescription),
                  });
                }}
                isEditable={isOwner}
                className={styles.editableTextarea}
                placeholder={isOwner
                  ? LanguageService.common.emptyMarkdownAction[language]
                  : LanguageService.common.emptyMarkdown[language]}
              />

              <Title
                level={HeadingLevel.h3}
                isEditable={false}
                text={isOwner
                  ? LanguageService.topic.materialsBlock.timeToAnswerTitle[language]
                  : `${LanguageService.topic.materialsBlock.timeToAnswerTitle[language]}
                  ${practiceMaterial.timeToAnswer}`
                }
                placeholder=""
              />
              {isOwner &&
              <EditableText
                value={practiceMaterial.timeToAnswer}
                type="number"
                min={0}
                onChangeFinish={(timeToAnswer) => {
                  updatePracticeMaterial({
                    practiceMaterialToUpdate: {
                      uuid: practiceMaterial.uuid,
                      timeToAnswer,
                    },

                    /**
                     * Update practiceMaterial's time to answer
                     */
                    setPracticeMaterial: () => practiceMaterial.updateTimeToAnswer(timeToAnswer),
                  });
                }}
                className={styles.practiceMaterialInput}
                isEditable={isOwner}
                placeholder=""
              />
              }

              {isOwner ?
                <VerticalContainer>
                  <Title
                    level={HeadingLevel.h3}
                    text={LanguageService.topic.materialsBlock.answerPlaceholder[language]}
                    placeholder=""
                  />
                  <EditableTextarea
                    placeholder={isOwner
                      ? LanguageService.common.emptyMarkdownAction[language]
                      : LanguageService.common.emptyMarkdown[language]}
                    text={practiceMaterial.answer}
                    className={styles.practiceMaterialInput}
                    onChangeFinish={(answer) => {
                      updatePracticeMaterial({
                        practiceMaterialToUpdate: {
                          uuid: practiceMaterial.uuid,
                          answer,
                        },

                        /**
                         * Update practiceMaterial's name
                         */
                        setPracticeMaterial: () => practiceMaterial.updateAnswer(answer),
                      });
                    }}
                  />
                </VerticalContainer>
                : (
                  <Accordion
                    items={[
                      {
                        trigger: {child: LanguageService.topic.materialsBlock.answerTitle[language]},
                        content: {child: renderMarkdown(practiceMaterial.answer)},
                      },
                    ]}
                    type={accordionTypes.MULTIPLE}
                  />
                )
              }
              <Separator className={styles.separator} />
            </div>
          ),
          )}

          {isOwner &&
          <Button
            value={LanguageService.topic.materialsBlock.addNewPracticalMaterialButton[language]}
            onClick={() => addPracticeMaterial(topicPageStore.topic.uuid)}
            className={styles.addMaterial}
          />
          }
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

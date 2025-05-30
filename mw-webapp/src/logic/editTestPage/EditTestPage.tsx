import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {ErrorPromiseModal} from "src/component/errorPromiseModal/ErrorPromiseModal";
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
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {PracticeMaterialDAL} from "src/dataAccessLogic/PracticeMaterialDAL";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {TheoryMaterialDAL} from "src/dataAccessLogic/TheoryMaterialDAL";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {DescriptionBlock} from "src/logic/editTestPage/descriptionBlock/DescriptionBlock";
import {EditTestPageStore} from "src/logic/editTestPage/EditTestPageStore";
import {TopicPageStore} from "src/logic/topicPage/TopicPageStore";
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
import {Test} from "src/model/businessModel/Test";
import {TheoryMaterial} from "src/model/businessModel/TheoryMaterial";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/editTestPage/EditTestPage.module.scss";

const MAX_LENGTH_TOPIC_NAME = 300;
const MIN_LENGTH_TOPIC_NAME = 1;
const MAX_LENGTH_MATERIAL_NAME = 128;
const MIN_LENGTH_MATERIAL_NAME = 1;
const MAX_TRAINING_MATERIAL_LENGTH = 10000;

/**
 * Update Test params
 */
interface UpdateTestParams {

  /**
   * Test to update
   */
  testToUpdate: PartialWithUuid<Test>;

  /**
   * Callback to update Test
   */
  setTest: (test: PartialWithUuid<Test>) => void;
}

/**
 * Update Test
 */
export const updateTest = async (params: UpdateTestParams) => {
  params.setTest(params.testToUpdate);
  await TestDAL.updateTest(params.testToUpdate);
};

/**
 * EditTestPage props
 */
interface EditTestPageProps {

  /**
   * Test's Uuid
   */
  uuid: string;

}

/**
 * Edit Test page
 */
export const EditTestPage = observer((props: EditTestPageProps) => {
  const navigate = useNavigate();
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const editTestPageStore = useStore<
  new (testUuid: string) => EditTestPageStore,
  [string], EditTestPageStore>({
      storeForInitialize: EditTestPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  if (!editTestPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = !!user && user.uuid === editTestPageStore.test.ownerUuid;

  // /**я
  //  * Add theory material
  //  */
  // const addTheoryMaterial = async (topicUuid: string) => {
  //   const newTheoryMaterial = await TheoryMaterialDAL.createTheoryMaterial({
  //     name: "",
  //     description: "",
  //     topicUuid,
  //   });
  //   editTestPageStore.topic.addTheoryMaterial(newTheoryMaterial);
  // };

  // /**
  //  * Generate theory material by AI
  //  */
  // const generateTheoryMaterial = async (topicUuid: string) => {
  //   try {
  //     const newTheoryMaterial = await AIDAL.aiCreateTheoryMaterial({
  //       topicId: topicUuid,
  //       trainingId: props.testUuid,
  //       language,
  //     });
  //     editTestPageStore.topic.addTheoryMaterial(newTheoryMaterial);
  //   } catch (error) {
  //     setIsErrorCatched(true);

  //     //TODO: need manage error somehow
  //     throw error;
  //   }
  // };

  // /**
  //  * Add practice material
  //  */
  // const addPracticeMaterial = async (topicUuid: string) => {
  //   const newPracticeMaterial = await PracticeMaterialDAL.createPracticeMaterial({
  //     name: "",
  //     taskDescription: "",
  //     topicUuid,
  //     answer: "",
  //     practiceType: PracticeMaterialType.INPUT_WORD,
  //     timeToAnswer: 0,
  //   });
  //   editTestPageStore.topic.addPracticeMaterial(newPracticeMaterial);
  // };

  // /**
  //  * Generate practice material by AI
  //  */
  // const generatePracticeMaterial = async (topicUuid: string) => {
  //   try {
  //     const newPracticeMaterial = await AIDAL.aiCreatePracticeMaterial({
  //       generateAmount: 2,
  //       topicId: topicUuid,
  //       trainingId: props.testUuid,
  //       language,
  //     });
  //     newPracticeMaterial.forEach(practiceMaterial => editTestPageStore.topic.addPracticeMaterial(practiceMaterial));
  //   } catch (error) {
  //     setIsErrorCatched(true);

  //     //TODO: need manage error somehow
  //     throw error;
  //   }
  // };

  /**
   * Delete topic
   */
  const deleteTopic = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await TopicDAL.deleteTopic(editTestPageStore.topic.uuid);
    navigate(pages.training.getPath({uuid: editTestPageStore.topic.trainingUuid}));
  };

  const renderDeleteTopicDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.topic.topicActions.deleteTopic[language]}
      </>}
      content={<p>
        {`${LanguageService.topic.topicActions.deleteTopicQuestion[language]} "${editTestPageStore.topic.name}"?`}
      </p>}
      onOk={deleteTopic}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />);

  return (
    <VerticalContainer className={styles.container}>
      {isErrorCatched &&
      <ErrorPromiseModal
        errorMessage={LanguageService.error.onClickError[language]}
        isErrorCatched={isErrorCatched}
        okText={LanguageService.modals.confirmModal.okButton[language]}
      />
      }
      <HorizontalGridContainer className={styles.testDashboard}>
        <VerticalContainer className={styles.testDashBoardLeft}>
          <VerticalContainer className={styles.testInfo}>
            <HorizontalContainer className={styles.testTitleBlock}>
              <Infotip content={LanguageService.topic.infotip.topicName[language]} />
              <Title
                level={HeadingLevel.h2}
                text={editTestPageStore.topic.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={(name) => {
                  updateTopic({
                    topicToUpdate: {
                      uuid: editTestPageStore.topic.uuid,
                      name,
                    },

                    /**
                     * Update topic's name
                     */
                    setTopic: () => editTestPageStore.topic.updateName(name),
                  });
                }}
                isEditable={isOwner}
                className={styles.testName}
                validators={[
                  minLengthValidator(MIN_LENGTH_TOPIC_NAME, LanguageService.topic.notifications.topicNameMinLength[language]),
                  maxLengthValidator(MAX_LENGTH_TOPIC_NAME, LanguageService.topic.notifications.topicNameMaxLength[language]),
                ]}
                maxCharacterCount={MAX_LENGTH_TOPIC_NAME}
              />

              <HorizontalContainer className={styles.testActionButtons}>
                <Dropdown
                  trigger={(
                    <Tooltip
                      content={LanguageService.topic.topicInfo.topicActionsTooltip[language]}
                      position={PositionTooltip.LEFT}
                    >
                      <Button
                        className={styles.testActionsIcon}
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
                          id: "Delete the test",
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

            <DescriptionBlock
              description={editTestPageStore.test.description}
              updateTraining={(description) => updateTest({
                testToUpdate: {
                  uuid: editTestPageStore.test.uuid,
                  description,
                },

                /**
                 * Update test's goalDescription
                 */
                setTest: () => editTestPageStore.test.updateDescription(description),
              })}
              isEditable={isOwner}
            />

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
                path={pages.user.getPath({uuid: editTestPageStore.topic.owner.uuid})}
                className={styles.mentors}
              >
                {editTestPageStore.topic.owner.name}
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
                path={pages.training.getPath({uuid: editTestPageStore.topic.trainingUuid})}
                className={styles.mentors}
              >
                {LanguageService.topic.backToTrainingButton[language]}
              </Link>
            </HorizontalContainer>
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.materials}>
          <VerticalContainer className={styles.theoryMaterials}>
            {editTestPageStore.topic.theoryMaterials.map((theoryMaterial: TheoryMaterial) => (
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
                    maxCharacterCount={MAX_LENGTH_MATERIAL_NAME}
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
                  maxCharacterCount={MAX_TRAINING_MATERIAL_LENGTH}
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
            <HorizontalContainer className={styles.generateMaterialButtons}>
              <Button
                value={LanguageService.topic.materialsBlock.addNewTheoryMaterialButton[language]}
                onClick={() => addTheoryMaterial(editTestPageStore.topic.uuid)}
              />
              <Button
                value={LanguageService.topic.aiButtons.generateTheoryMaterialWithAIButton[language]}
                onClick={() => {
                  setIsErrorCatched(false);
                  generateTheoryMaterial(editTestPageStore.topic.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
              />
            </HorizontalContainer>
            }

          </VerticalContainer>

          <VerticalContainer className={styles.practiceMaterials}>
            {editTestPageStore.topic.practiceMaterials.map((practiceMaterial: PracticeMaterial) => (

              <div
                key={practiceMaterial.uuid}
                className={styles.materialContainer}
                id={practiceMaterial.name}
              >
                <VerticalContainer>
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
                      maxCharacterCount={MAX_LENGTH_MATERIAL_NAME}
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

                  <HorizontalContainer className={styles.timeToAnswerBlock}>
                    <Text
                      className={styles.timeToAnswerTitle}
                      text={isOwner
                        ? LanguageService.topic.materialsBlock.timeToAnswerTitle[language]
                        : `${LanguageService.topic.materialsBlock.timeToAnswerTitle[language]} ${practiceMaterial.timeToAnswer}`}
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
                        className={styles.timeToAnswerInput}
                        isEditable={isOwner}
                        placeholder=""
                      />
                    }
                  </HorizontalContainer>
                </VerticalContainer>

                <Title
                  level={HeadingLevel.h3}
                  text={LanguageService.topic.materialsBlock.practiceDescriptionTitle[language]}
                  placeholder=""
                />
                <EditableTextarea
                  text={practiceMaterial.taskDescription}
                  maxCharacterCount={MAX_TRAINING_MATERIAL_LENGTH}
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

                {isOwner ?
                  <VerticalContainer>
                    <Title
                      level={HeadingLevel.h3}
                      text={LanguageService.topic.materialsBlock.answerPlaceholder[language]}
                      placeholder=""
                    />
                    <EditableTextarea
                      maxCharacterCount={MAX_TRAINING_MATERIAL_LENGTH}
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
            <HorizontalContainer className={styles.generateMaterialButtons}>
              <Button
                value={LanguageService.topic.materialsBlock.addNewPracticalMaterialButton[language]}
                onClick={() => addPracticeMaterial(editTestPageStore.topic.uuid)}
                className={styles.addMaterial}
              />
              <Button
                value={LanguageService.topic.aiButtons.generatePracticeMaterialWithAIButton[language]}
                onClick={() => {
                  setIsErrorCatched(false);
                  generatePracticeMaterial(editTestPageStore.topic.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
              />
            </HorizontalContainer>
            }
          </VerticalContainer>
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

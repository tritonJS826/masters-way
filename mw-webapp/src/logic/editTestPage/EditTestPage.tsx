import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {AnchorLink} from "src/component/anchorLink/AnchorLink";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {ErrorPromiseModal} from "src/component/errorPromiseModal/ErrorPromiseModal";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Loader} from "src/component/loader/Loader";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CreateQuestionParams, QuestionDAL} from "src/dataAccessLogic/QuestionDAL";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {DescriptionBlock} from "src/logic/editTestPage/descriptionBlock/DescriptionBlock";
import {EditTestPageStore} from "src/logic/editTestPage/EditTestPageStore";
import {QuestionItem} from "src/logic/editTestPage/questionItem/QuestionItem";
import {Question, Test} from "src/model/businessModel/Test";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/editTestPage/EditTestPage.module.scss";

const MAX_LENGTH_TEST_NAME = 300;
const MIN_LENGTH_TEST_NAME = 1;

/**
 * Update Question params
 */
interface UpdateQuestionParams {

  /**
   * Question to update
   */
  questionToUpdate: PartialWithUuid<Question>;

  /**
   * Callback to update question
   */
  setQuestion: (question: PartialWithUuid<Question>) => void;
}

/**
 * Update Question
 */
export const updateQuestion = async (params: UpdateQuestionParams) => {
  params.setQuestion(params.questionToUpdate);
  await QuestionDAL.updateQuestion(params.questionToUpdate);
};

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
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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
   * Add question
   */
  const addQuestion = async (params?: CreateQuestionParams) => {
    const newQuestion = await QuestionDAL.createQuestion({
      answer: params?.answer ?? "",
      name: params?.name ?? "New queston",
      practiceType: params?.practiceType ?? "",
      questionText: params?.questionText ?? "",
      testUuid: editTestPageStore.test.uuid,
      timeToAnswer: params?.timeToAnswer ?? 0,
    });
    editTestPageStore.test.addQuestion(newQuestion);
  };

  /**
   * Delete question
   */
  const deleteQuestion = async (uuid: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await QuestionDAL.deleteQuestion(uuid);
    editTestPageStore.test.deleteQuestion(uuid);
  };

  /**
   * Delete test
   */
  const deleteTest = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await TestDAL.deleteTest(editTestPageStore.test.uuid);
    navigate(pages.user.getPath({uuid: editTestPageStore.test.ownerUuid}));
  };

  const renderDeleteTestDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.test.testActions.deleteTest[language]}
      </>}
      content={<p>
        {`${LanguageService.test.testActions.deleteTestQuestion[language]} "${editTestPageStore.test.name}"?`}
      </p>}
      onOk={deleteTest}
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
              <Infotip content={LanguageService.test.infotip.testName[language]} />
              <Title
                level={HeadingLevel.h2}
                text={editTestPageStore.test.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={(name) => {
                  updateTest({
                    testToUpdate: {
                      uuid: editTestPageStore.test.uuid,
                      name,
                    },

                    /**
                     * Update test's name
                     */
                    setTest: () => editTestPageStore.test.updateName(name),
                  });
                }}
                isEditable={isOwner}
                className={styles.testName}
                validators={[
                  minLengthValidator(MIN_LENGTH_TEST_NAME, LanguageService.test.notifications.testNameMinLength[language]),
                  maxLengthValidator(MAX_LENGTH_TEST_NAME, LanguageService.test.notifications.testNameMaxLength[language]),
                ]}
                maxCharacterCount={MAX_LENGTH_TEST_NAME}
              />

              <HorizontalContainer className={styles.testActionButtons}>
                <Dropdown
                  trigger={(
                    <Tooltip
                      content={LanguageService.test.testInfo.testActionsTooltip[language]}
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
                          value: renderDeleteTestDropdownItem,
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
              updateTest={(description) => updateTest({
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

            <Title
              level={HeadingLevel.h3}
              text={LanguageService.test.questionsBlock.questions[language]}
              placeholder=""
            />

            {editTestPageStore.test.questions.map((question) => (
              <HorizontalContainer
                key={question.questionText}
                className={styles.materialShortBlock}
              >
                <AnchorLink path={question.questionText}>
                  {question.questionText.trim() === ""
                    ? LanguageService.common.emptyMarkdown[language]
                    : <Text text={question.questionText} />
                  }
                </AnchorLink>

                <Tooltip content={LanguageService.test.questionsBlock.deleteQuestionTooltip[language]}>
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
                        `${LanguageService.test.questionsBlock.deleteQuestionQuestion[language]}
                          "${question.questionText}"?`,
                      )}
                    </p>}
                    onOk={() => deleteQuestion(question.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
              </HorizontalContainer>
            ),
            )}

          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.questions}>
          {editTestPageStore.test.questions.map((question: Question) => (
            <div
              key={question.uuid}
              className={styles.theoryMaterials}
              id={question.questionText}
            >
              <QuestionItem
                key={question.uuid}
                question={question}
                deleteQuestion={(uuid: string) => deleteQuestion(uuid)}
                isEditable={isOwner}
              />
            </div>

          ),
          )}

          {isOwner &&
            <HorizontalContainer className={styles.generateMaterialButtons}>
              <Button
                value={LanguageService.test.questionsBlock.addNewQuestionButton[language]}
                onClick={() => addQuestion()}
                className={styles.addMaterial}
              />
              {/* <Button
                value={LanguageService.topic.aiButtons.generatePracticeMaterialWithAIButton[language]}
                onClick={() => {
                  setIsErrorCatched(false);
                  generatePracticeMaterial(editTestPageStore.topic.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
              /> */}
            </HorizontalContainer>
          }
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});

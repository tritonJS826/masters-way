import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userPersonalSelectors = {
    descriptionSection: {
        getName: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameDisplay)),
        getNameInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameInput)),
        getAboutMe: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownDisplay)),
        getAboutMeInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownInput)),
        getAddSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.addSkillButton)),
        getMentorCheckbox: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.mentorCheckbox)),
    },

    findMentor: {
        getFindMentorButton: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.findMentorButton)),
        getForm: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.form)),
        getSkillsToLearnInput: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.skillsToLearnInput)),
        getCurrentExperienceInput: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.currentExperienceInput)),
        getMentorDescriptionInput: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.mentorDescriptionInput)),
        getSubmitButton: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.submitButton)),
        getRequestSent: () => cy.get(getDataCy(userPersonalDataAccessIds.findMentor.requestSent)),
    },

    getConnectButton: () => cy.get(getDataCy(userPersonalDataAccessIds.connectButton)),

    userSkillsBlock: {
        skillsModalContent: {
            getSkillInput: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.skillInput)),
            getCreateSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.createSkillButton)),
        },

        skillTag: {
            getSkillTag: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillTag.tag)),
            getRemoveTagButton: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillTag.removeTagButton)),
        }
  },
  surveyModal: {
    userInfoSurvey: {
      getOverlay: () => cy.get(getDataCy(userPersonalDataAccessIds.surveyOverlay)),
      }
    }
};
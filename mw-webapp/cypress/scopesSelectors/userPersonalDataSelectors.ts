import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userPersonalSelectors = {
    descriptionSection: {
        getName: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameDisplay)),
        getNameInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameInput)),
        getAboutMe: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownDisplay)),
        getAboutMeInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownInput)),
        getAddSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.addSkillButton)),
    },

    userSkillsBlock: {
        skillsModalContent: {
            getSkillInput: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.skillInput)),
            getCreateSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.createSkillButton)),
        },

        skillTag: {
            getSkillTag: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillTag.tag)),
            getRemoveTagButton: () => cy.get(getDataCy(userPersonalDataAccessIds.userSkillsBlock.skillTag.removeTagButton)),
        }
    }
};
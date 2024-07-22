import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userPersonalSelectors = {
    descriptionSection: {
        getName: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameDisplay)),
        getNameInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameInput)),
        getAboutMe: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownDisplay)),
        getAboutMeInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownInput)),
        getAddSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.addSkillButton)),
    }
};
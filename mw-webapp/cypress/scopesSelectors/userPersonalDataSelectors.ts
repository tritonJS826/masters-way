import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userPersonalSelectors = {
    descriptionSection: {
        getName: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameDisplay)),
        getNameInput: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.nameInput)),
        getAddSkillButton: () => cy.get(getDataCy(userPersonalDataAccessIds.descriptionSection.addSkillButton)),
    }
};
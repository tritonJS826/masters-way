import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const headerSelectors = {
    getHeader: () => cy.get(getDataCy(headerAccessIds.header)),
    getLogo: () => cy.get(getDataCy(headerAccessIds.logo)),
    getAvatar: () => cy.get(getDataCy(headerAccessIds.avatar)),
    getBurgerMenu: () => cy.get(getDataCy(headerAccessIds.burgerMenu)),

    settings: {
        getThemeSwitcher: () => cy.get(getDataCy(headerAccessIds.settings.themeSwitcher)),

        language: {
            getSelect:() => cy.get(getDataCy(headerAccessIds.settings.language.select)),
    
            languageMenuItems: [
                () => cy.get(getDataCy(headerAccessIds.settings.language.ruItem)),
                () => cy.get(getDataCy(headerAccessIds.settings.language.enItem)),
                () => cy.get(getDataCy(headerAccessIds.settings.language.uaItem))
            ]
        },
    },
    
    getloginButton: () => cy.get(getDataCy(headerAccessIds.loginButton)),
};
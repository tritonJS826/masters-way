import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigationMenuIds} from "cypress/accessIds/navigationMenuIds";

export const navigationMenuSelectors = {
    menuItemLinks: {
        getLogoItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.logo)),
        getHomeItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.home)),
        getAllWaysItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allWays)),
        getAllUsersItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allUsers)),
        getAboutProjectItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.aboutProject))
    },

    language: {
        getText:() => cy.get(getDataCy(navigationMenuIds.language.text)),
        getSelect:() => cy.get(getDataCy(navigationMenuIds.language.select)),

        languageMenuItems: [
            () => cy.get(getDataCy(navigationMenuIds.language.ruItem)),
            () => cy.get(getDataCy(navigationMenuIds.language.enItem)),
            () => cy.get(getDataCy(navigationMenuIds.language.uaItem)),
            () => cy.get(getDataCy(navigationMenuIds.language.kaItem))
        ]
    },

    getCloseButton: () => cy.get(getDataCy(navigationMenuIds.closeButton))

};
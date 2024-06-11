import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigatioMenuIds} from "cypress/accessIds/navigationMenuIds";

export const navigatioMenuSelectors = {
    getNavigationMenu: () => cy.get(getDataCy(navigatioMenuIds.navigatioMenu)),

    menuItemLinks: {
        getLogoItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.logo)),
        getHomeItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.home)),
        getAllWaysItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.allWays)),
        getAllUsersItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.allUsers)),
        getAboutProjectItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.aboutProject)),
    },

    language: {
        getText:() => cy.get(getDataCy(navigatioMenuIds.language.text)),
        getSelect:() => cy.get(getDataCy(navigatioMenuIds.language.select)),

        languageMenuItems: [
            () => cy.get(getDataCy(navigatioMenuIds.language.ruItem)),
            () => cy.get(getDataCy(navigatioMenuIds.language.enItem)),
            () => cy.get(getDataCy(navigatioMenuIds.language.uaItem)),
            () => cy.get(getDataCy(navigatioMenuIds.language.kaItem))
        ]
    },

    getCloseButton: () => cy.get(getDataCy(navigatioMenuIds.closeButton))
};
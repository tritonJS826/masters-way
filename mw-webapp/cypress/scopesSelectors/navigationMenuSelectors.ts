import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigationMenuIds} from "cypress/accessIds/navigationMenuAccessIds";

export const navigationMenuSelectors = {
    getNavigationMenu: () => cy.get(getDataCy(navigationMenuIds.navigationMenu)),

    menuItemLinks: {
        getLogoItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.logo)),
        getHomeItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.home)),
        getPersonalAreaItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.personalArea)),
        getAllWaysItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allWays)),
        getAllUsersItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allUsers)),
        getAboutProjectItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.aboutProject)),
        getSettingsItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.settings))
    },

    language: {
        getText:() => cy.get(getDataCy(navigationMenuIds.language.text)),
        getSelect:() => cy.get(getDataCy(navigationMenuIds.language.select)),

        languageMenuItems: [
            () => cy.get(getDataCy(navigationMenuIds.language.ruItem)),
            () => cy.get(getDataCy(navigationMenuIds.language.enItem)),
            () => cy.get(getDataCy(navigationMenuIds.language.uaItem))
        ]
    },

    nightMode: {
        getText:() => cy.get(getDataCy(navigationMenuIds.nightMode.text)),
        getSlider:() => cy.get(getDataCy(navigationMenuIds.nightMode.slider))
    },

    socialMedia: {
        getText:() => cy.get(getDataCy(navigationMenuIds.socialMedia.text)),
        getLinkedinLink:() => cy.get(getDataCy(navigationMenuIds.socialMedia.linkedinLink)),
        getYoutubeLink:() => cy.get(getDataCy(navigationMenuIds.socialMedia.youtubeLink)),
    },

    getCloseButton: () => cy.get(getDataCy(navigationMenuIds.closeButton)),
    getLogoutButton: () => cy.get(getDataCy(navigationMenuIds.logoutButton))
};
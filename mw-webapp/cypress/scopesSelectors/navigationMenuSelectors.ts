import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigationMenuIds} from "cypress/accessIds/navigationMenuIds";

export const navigationMenuSelectors = {
    menuItemLinks: {
        getLogoItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.logo)),
        getHomeItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.home)),
        getAllWaysItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allWays)),
        getAllUsersItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.allUsers)),
        getAboutProjectItemLink: () => cy.get(getDataCy(navigationMenuIds.menuItemLinks.aboutProject))
    }

};
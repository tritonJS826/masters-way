import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigatioMenuIds} from "cypress/accessIds/navigationMenuIds";

export const navigatioMenuSelectors = {
    menuItemLinks: {
        getLogoItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.logo)),
        getHomeItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.home)),
        getAllWaysItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.allWays)),
        getAllUsersItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.allUsers)),
        getAboutProjectItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.aboutProject))
    }

};
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {navigatioMenuIds} from "cypress/accessIds/navigationMenuIds";

export const navigatioMenuSelectors = {
    menuItemLinks: {
        getAllWaysItemLink: () => cy.get(getDataCy(navigatioMenuIds.menuItemLinks.allWays))
    }

};
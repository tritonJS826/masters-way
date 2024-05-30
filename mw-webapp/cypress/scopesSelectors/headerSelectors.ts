import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const headerSelectors = {
    link: {
        getLogo: () => cy.get(getDataCy(headerAccessIds.link.logo)),
    },

    buttons: {
        getThemeSwitcher: () => cy.get(getDataCy(headerAccessIds.buttons.themeSwitcher))
    }
    
};
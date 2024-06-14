import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const headerSelectors = {
    getHeader: () => cy.get(getDataCy(headerAccessIds.header)),
    getLogo: () => cy.get(getDataCy(headerAccessIds.logo)),
    getBurgerMenu: () => cy.get(getDataCy(headerAccessIds.burgerMenu)),

    settings: {
        getThemeSwitcher: () => cy.get(getDataCy(headerAccessIds.settings.themeSwitcher)),
    }
    
};
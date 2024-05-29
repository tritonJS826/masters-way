import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const headerSelectors = {
    items: {
        getLogoButton: () => cy.get(getDataCy(headerAccessIds.items.homeLogo)),
    }

};
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {homeAccessIds} from "cypress/accessIds/homeAccessIds";

export const homeSelectors = {
    pageTitle: {
        getTitle: () => cy.get(getDataCy(homeAccessIds.titles.main)),
    },

    items: {
        getStartBtn: () => cy.get(getDataCy(homeAccessIds.btns.startBtn)),
    }


};
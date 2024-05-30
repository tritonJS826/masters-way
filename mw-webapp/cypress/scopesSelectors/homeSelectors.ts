import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {homeAccessIds} from "cypress/accessIds/homeAccessIds";

export const homeSelectors = {
    welcomeBlock: {
        getTitle: () => cy.get(getDataCy(homeAccessIds.welcomeBlock.title)),
        getStartButton: () => cy.get(getDataCy(homeAccessIds.welcomeBlock.startButton))
    }

};
import {aboutProjectAccessIds} from "cypress/accessIds/aboutProjectAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const aboutProjectSelectors = {
    welcomeBlock: {
        getTitle: () => cy.get(getDataCy(aboutProjectAccessIds.aboutBlock.title))
    }

};
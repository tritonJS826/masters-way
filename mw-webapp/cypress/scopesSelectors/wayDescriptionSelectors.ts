import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const wayDescriptionSelectors = {
    wayDashBoardLeft: {
       getTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.title)),
    }
};
import {partnershipAccessIds} from "cypress/accessIds/partnershipAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const partnershipSelectors = {
    mainBlock: {
        getTitle: () => cy.get(getDataCy(partnershipAccessIds.mainBlock.title))
    }
};
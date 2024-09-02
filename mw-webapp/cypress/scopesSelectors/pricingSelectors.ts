import {aboutProjectAccessIds} from "cypress/accessIds/aboutProjectAccessIds";
import { pricingAccessIds } from "cypress/accessIds/pricingAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const pricingSelectors = {
    pricingBlock: {
        getTitle: () => cy.get(getDataCy(pricingAccessIds.pricingBlock.title))
    }

};
import {settingsAccessIds} from "cypress/accessIds/settingsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const settingsSelectors = {
    getTitle: () => cy.get(getDataCy(settingsAccessIds.title))
};
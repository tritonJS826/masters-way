import {allUsersAccessIds } from "cypress/accessIds/allUsersAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const allUsersSelectors = {
    allUserssTable: {
        getTitle: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.title))
    },

};
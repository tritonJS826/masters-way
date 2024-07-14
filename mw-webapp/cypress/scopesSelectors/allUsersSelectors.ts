import {allUsersAccessIds } from "cypress/accessIds/allUsersAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const allUsersSelectors = {
    allUsersTitles: {
        getTitle: () => cy.get(getDataCy(allUsersAccessIds.allUsersTitles.title))
    },

    filterViewBlock: {
        getSearchByEmailInput: () => cy.get(getDataCy(allUsersAccessIds.filterViewBlock.searchByEmailInput))
    },

    allUsersTable: {
        getTableBodyTr: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.tableBodyTr)),
        getUserLink: (userName: string) => cy.get(getDataCy(`${allUsersAccessIds.allUsersTable.userLink}_${userName}`)),
        getUserContact: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.userContact))
    },

    allWaysCard: {
        getCardLink: () => cy.get(getDataCy(allUsersAccessIds.allUsersCard.userCardLink))
    }
};
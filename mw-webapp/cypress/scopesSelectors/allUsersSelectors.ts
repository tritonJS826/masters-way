import {allUsersAccessIds } from "cypress/accessIds/allUsersAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const allUsersSelectors = {
    allUsersTitles: {
        getTitle: () => cy.get(getDataCy(allUsersAccessIds.allUsersTitles.title)),
        getTotalFoundTitle: () => cy.get(getDataCy(allUsersAccessIds.allUsersTitles.totalFoundTitle))
    },

    filterViewBlock: {
        getSearchByEmailInput: () => cy.get(getDataCy(allUsersAccessIds.filterViewBlock.searchByEmailInput)),
        getSearchByNameInput: () => cy.get(getDataCy(allUsersAccessIds.filterViewBlock.searchByNameInput))
    },

    allUsersTable: {
        getTable: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.table)),
        getUserName: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.userName)),
        getUserLink: (userName: string) => cy.get(getDataCy(allUsersAccessIds.allUsersTable.userLink(userName))),
        getUserContact: () => cy.get(getDataCy(allUsersAccessIds.allUsersTable.userContact))
    },

    card: {
        getCardLink: (userName: string) => cy.get(getDataCy(allUsersAccessIds.allUsersCard.userCardLink(userName)))
    },

    getLoadMoreButton: () => cy.get(getDataCy(allUsersAccessIds.loadMoreButton))
};
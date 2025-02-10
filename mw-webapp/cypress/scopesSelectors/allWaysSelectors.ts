import {getDataCy} from 'src/utils/cyTesting/getDataCy';
import {allWaysAccessIds} from 'cypress/accessIds/allWaysAccessIds'
import {View} from "src/utils/LocalStorageWorker";

export const allWaysSelectors = {
    allWaysTitles: {
        getTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTitles.title)),
        getTotalAmountTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTitles.totalAmountTitle)),
    },

    allWaysTable: {
        getTable: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.table)),
        getTableTh: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableTh)),
        getTableBodyTr: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableBodyTr)),
        getTableBodyTd: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableBodyTd)),
        getOwnerLink: (ownerName: string) => cy.get(getDataCy(allWaysAccessIds.allWaysTable.ownerLink(ownerName))),
        getWayLink: (wayTitle: string) => cy.get(getDataCy(allWaysAccessIds.allWaysTable.wayLink(wayTitle))),
        getMentorLink: (mentorName: string) => cy.get(getDataCy(allWaysAccessIds.allWaysTable.mentorLink(mentorName))),
    },

    allWaysCard: {
        getCardLink: (wayTitle: string) => cy.get(getDataCy(allWaysAccessIds.allWaysCard.wayCardLink(wayTitle))),
    },

    filterViewBlock: {
        getSearchByWayNameInput: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.searchByWayNameInput)),

        getStatusSelect: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.statusSelect)),
        getStatusSelectOptionAll: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.statusSelectOptionAll)),
        getStatusSelectOptionCompleted: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.statusSelectOptionCompleted)),
        getStatusSelectOptionAbandoned: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.statusSelectOptionAbandoned)),
        getStatusSelectOptionInProgress: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.statusSelectOptionInProgress)),

        getDayReportsSelect: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.dayReportsSelect)),
        getDayReportsSelectOption0: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.dayReportsSelectOption0)),
        getDayReportsSelectOptionAtLeast5: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.dayReportsSelectOptionAtLeast5)),
        getDayReportsSelectOptionAtLeast20: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.dayReportsSelectOptionAtLeast20)),
        getDayReportsSelectOptionAtLeast50: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.dayReportsSelectOptionAtLeast50)),

        getCardViewButton: () => cy.get(getDataCy(`${View.Card }${allWaysAccessIds.filterViewBlock.viewButton}`)),
        getTableViewButton: () => cy.get(getDataCy(`${View.Table }${allWaysAccessIds.filterViewBlock.viewButton}`))
    }

};
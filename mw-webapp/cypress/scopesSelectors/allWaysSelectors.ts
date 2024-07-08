import {getDataCy} from 'src/utils/cyTesting/getDataCy';
import {allWaysAccessIds} from 'cypress/accessIds/allWaysAccessIds'
import {View} from "src/utils/LocalStorageWorker";

export const allWaysSelectors = {
    allWaysTable: {
        getTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.title)),
        getTotalAmountTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.totalAmountTitle)),
        getTable: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.table)),
        getTableTh: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableTh)),
        getTableBodyTr: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableBodyTr)),
        getTableBodyTd: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.tableBodyTd)),
        getOwnerLink: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.ownerLink)),
        getWayLink: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.wayLink)),
    },

    filterViewBlock: {
        getStatusSelect: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.filterByStatus)),
        getCardViewButton: () => cy.get(getDataCy(View.Card + allWaysAccessIds.filterViewBlock.viewButton)),
        getTableViewButton: () => cy.get(getDataCy(View.Table + allWaysAccessIds.filterViewBlock.viewButton))
    }

};
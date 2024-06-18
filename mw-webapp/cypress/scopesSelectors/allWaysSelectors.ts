import {getDataCy} from 'src/utils/cyTesting/getDataCy';
import {allWaysAccessIds} from 'cypress/accessIds/allWaysAccessIds'

export const allWaysSelectors = {
    allWaysTable: {
        getTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.title)),
        getTotalAmountTitle: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.totalAmountTitle)),
        getTable: () => cy.get(getDataCy(allWaysAccessIds.allWaysTable.table)),
    },

    filterViewBlock: {
        getStatusSelect: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.filterByStatus)),
        getCardViewButton: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.cardViewButton)),
        getTableViewButton: () => cy.get(getDataCy(allWaysAccessIds.filterViewBlock.tableViewButton))
    }

};
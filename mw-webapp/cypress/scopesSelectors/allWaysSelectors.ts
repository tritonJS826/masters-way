import {getDataCy} from 'src/utils/cyTesting/getDataCy';
import {allWaysAccessIds} from 'cypress/accessIds/allWaysAccessIds'

export const allWaysSelectors = {
    titleContainer: {
        getTitle: () => cy.get(getDataCy(allWaysAccessIds.titleContainer.title)),
        getTotalFound: () => cy.get(getDataCy(allWaysAccessIds.titleContainer.totalFound))
    },

    filterView: {
        getStatusSelect: () => cy.get(getDataCy(allWaysAccessIds.filterView.statusSelect)),
        getCardViewButton: () => cy.get(getDataCy(allWaysAccessIds.filterView.cardViewButton)),
        getTableViewButton: () => cy.get(getDataCy(allWaysAccessIds.filterView.tableViewButton))
    }

};
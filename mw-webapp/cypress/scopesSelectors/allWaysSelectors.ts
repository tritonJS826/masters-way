import {getDataCy} from 'src/utils/cyTesting/getDataCy';
import {allWaysAccessIds} from '../accessIds/allWaysAccessIds'

export const allWaysSelectors = {
    titles: {
        getAllWaysTitle: () => cy.get(getDataCy(allWaysAccessIds.titles.allWays)),
    }

};
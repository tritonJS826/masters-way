import {allTrainingsAccessIds} from 'cypress/accessIds/allTrainingsAccessIds';
import {getDataCy} from 'src/utils/cyTesting/getDataCy';


export const allTrainingsSelectors = {
    allTrainingsTitles: {
        getTitle: () => cy.get(getDataCy(allTrainingsAccessIds.allTrainingsTitles.title))
    }
};
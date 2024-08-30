import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userWaysSelectors = {
    wayTitles: {
        getWayStatusTitle: () => cy.get(getDataCy(userWaysAccessIds.wayStatusTitle)),
    },

    wayCollectionButtonsBlock: {
        getWayAmountCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.wayAmountCollectionButton)),

        getWayLink: (wayTitle: string) => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.wayLink(wayTitle))),

        getOwnWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.ownWayCollectionButton)),
        getMentoringWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.mentoringWayCollectionButton)),
        getFavoriteWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.favoriteWayCollectionButton)),

        getWayCollectionButtonMainInfo: () => cy.get(getDataCy(userWaysAccessIds.wayCollectionButtonsBlock.wayCollectionButtonMainInfo)),
    },

    getCreateNewWayButton: () => cy.get(getDataCy(userWaysAccessIds.createNewWayButton))

};
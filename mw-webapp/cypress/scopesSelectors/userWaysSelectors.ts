import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userWaysSelectors = {
    wayTitles: {
        getWayStatusTitle: () => cy.get(getDataCy(userWaysAccessIds.wayStatusTitle)),
    },

    wayCard: {
        getWayAmountCollectionCardButton: () => cy.get(getDataCy(userWaysAccessIds.wayCard.wayAmountCollectionCardButton)),

        getWayLink: (wayTitle: string) => cy.get(getDataCy(userWaysAccessIds.wayCard.wayLink(wayTitle))),

        getOwnWayCollectionCardButton: () => cy.get(getDataCy(userWaysAccessIds.wayCard.ownWayCollectionCardButton)),
        getOwnWayCollectionCardButtonMainInfo: () => cy.get(getDataCy(userWaysAccessIds.wayCard.wayCollectionCardButtonMainInfo)),

        getMentoringWayCollectionCardButton: () => cy.get(getDataCy(userWaysAccessIds.wayCard.mentoringWayCollectionCardButton)),
        getMentoringWayCollectionCardButtonMainInfo: () => cy.get(getDataCy(userWaysAccessIds.wayCard.mentoringWayCollectionCardButtonMainInfo)),
        getMentoringWayLink: (wayTitle: string) => cy.get(getDataCy(userWaysAccessIds.wayCard.mentoringWayLink(wayTitle))),
    }

};
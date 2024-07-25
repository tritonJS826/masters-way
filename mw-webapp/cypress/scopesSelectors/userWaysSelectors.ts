import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userWaysSelectors = {
    wayTitles: {
        getOwnWayTitle: () => cy.get(getDataCy(userWaysAccessIds.wayStatusTitle)),
    },

    wayCard: {
        getWayAmountCollectionCardButton: () => cy.get(getDataCy(userWaysAccessIds.wayCard.wayAmountCollectionCardButton)),
        getOwnWayCollectionCardButton: () => cy.get(getDataCy(userWaysAccessIds.wayCard.ownWayCollectionCardButton)),
        getOwnWayCollectionCardButtonMainInfo: () => cy.get(getDataCy(userWaysAccessIds.wayCard.ownWayCollectionCardButtonMainInfo)),
        getOwnWayLink: (wayTitle: string) => cy.get(getDataCy(userWaysAccessIds.wayCard.ownWayLink(wayTitle))),
    }

};
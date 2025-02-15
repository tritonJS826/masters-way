import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const userWaysSelectors = {
    wayTitles: {
        getWayStatusTitle: () => cy.get(getDataCy(userWaysAccessIds.wayTitles.wayStatusTitle)),
    },

    getPrivacyStatus: () => cy.get(getDataCy(userWaysAccessIds.privacyStatus)),

    collectionBlock: {
        getWayAmountCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.amountCollectionButton)),

        getWayLink: (wayTitle: string) => cy.get(getDataCy(userWaysAccessIds.collectionBlock.wayLink(wayTitle))),

        getOwnWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.ownWayCollectionButton)),
        getMentoringWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.mentoringWayCollectionButton)),
        getFavoriteWayCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.favoriteWayCollectionButton)),
        getAddCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.addCollectionButton)),
        getCustomerCollectionButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customerCollectionButton)),

        getWayCollectionButtonMainInfo: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.collectionButtonMainInfo)),

        customCollection: {
            getCustomCollectionBlock: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.customCollectionBlock)),
            getActionMenuButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.actionMenuButton)),
            getActionMenuList: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.actionMenuList)),
            getAtcionMenuItem: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.actionMenuItem)),
            
            renameDialog: {
                getContent: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.renameDialog.content)),
                getInput: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.renameDialog.input)),
                getOkButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.renameDialog.okButton)),
            },

            deleteDialog: {
                getContent: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.deleteDialog.content)),
                getDeleteButton: () => cy.get(getDataCy(userWaysAccessIds.collectionBlock.customCollection.deleteDialog.deleteButton)),
            }
        }
    },

    getCreateNewWayButton: () => cy.get(getDataCy(userWaysAccessIds.createNewWayButton))

};
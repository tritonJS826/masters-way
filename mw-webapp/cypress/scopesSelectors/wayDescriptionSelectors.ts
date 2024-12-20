import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const wayDescriptionSelectors = {
    wayDashBoardLeft: {
       getTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.title)),
       getAddToFavoritesButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.addToFavoritesButton)),
       getGoal: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.goal)),
       
       tag: {
            getAddTagButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.tag.addTagButton)),
            getTagInput: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.tag.tagInput)),
            getCreateTagButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.tag.createTagButton)),
            getTagTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.tag.tagTitle)),
        }
    },

    peopleBlock: {
        getApplyAsMentorButton: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.applyAsMentorButton)),
        getMentorsOfWayText: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.mentorsOfWayText)),
        getWayMentorLink: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.wayMentorLink)),
        childWaysTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childWaysTitle)),
        getChildLink: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childLink(name))),
        getDeleteFromCompositeWay: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromCompositeWayButton(name))),
        
        deleteFromCompositeDialogContent: {
            getDeleteButton: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromCompositeDialogContent.deleteButton)),
        },

        deleteFromMentors: {
            getTrashIcon: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromMentors.trashIcon(name))),
            getDeleteButton: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromMentors.deleteButton)),
            getDialogContent: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromMentors.dialogContent))
        }
    },
    mentorRequestDialog: {
        getMentorNameLink: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.mentorNameLink)),
        getAcceptButton: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.acceptButton)),
    },

    wayActionMenu: {
        getWayActionButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.wayActionButton)),
        getWayActionMenuItem: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.wayMenuItem)),
        getWayActionSubMenuItem: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.wayMenuItem)),
        getWayActionSubTriggerItem: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.waySubTriggerItem)),

        DeleteWayItem: {
            dialog: {
                getDeleteButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.DeleteWayItem.dialog.deleteButton)),
                getContent: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.DeleteWayItem.dialog.content)),
            }
        }
    }
};
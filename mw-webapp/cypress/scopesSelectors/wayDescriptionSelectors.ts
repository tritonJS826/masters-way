import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const wayDescriptionSelectors = {
    wayDashBoardLeft: {
       getTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.title)),
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
        getMentorOfWayText: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.mentorOfWayText)),
        getWayMentorLink: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.wayMentorLink)),
        childWaysTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childWaysTitle)),
        getChildLink: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childLink(name))),
        getDeleteFromCompositeWay: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.deleteFromCompositeWayButton(name))),
        dialogContent: {
            getDeleteButton: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.dialogContent.deleteButton)),
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
    }
};
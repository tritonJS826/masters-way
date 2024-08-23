import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const wayDescriptionSelectors = {
    wayDashBoardLeft: {
       getTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.wayDashBoardLeft.title)),
    },

    peopleBlock: {
        getApplyAsMentorButton: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.applyAsMentorButton)),
        getMentorOfWayText: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.mentorOfWayText)),
        getWayMentorLink: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.wayMentorLink)),
        childWaysTitle: () => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childWaysTitle)),
        getChildLink: (name: string) => cy.get(getDataCy(wayDescriptionAccessIds.peopleBlock.childLink(name))),
    },
    mentorRequestDialog: {
        getMentorNameLink: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.mentorNameLink)),
        getAcceptButton: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.acceptButton)),
    },

    wayActionMenu: {
        getWayActionButton: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.wayActionButton)),
        getWayActionMenuItem: () => cy.get(getDataCy(wayDescriptionAccessIds.wayActionMenu.wayMenuItem)),
    }
};
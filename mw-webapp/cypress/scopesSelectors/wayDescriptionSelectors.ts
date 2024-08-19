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
    },
    mentorRequestDialog: {
        getMentorNameLink: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.mentorNameLink)),
        getAcceptButton: () => cy.get(getDataCy(wayDescriptionAccessIds.mentorRequestDialog.acceptButton)),
    }  
};
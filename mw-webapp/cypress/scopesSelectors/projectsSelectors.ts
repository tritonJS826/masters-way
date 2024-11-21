import {projectsAccessIds} from "cypress/accessIds/projectsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const projectsSelectors = {
    getProjectsButton: () => cy.get(getDataCy(projectsAccessIds.projectsButton)),

    getAddProjectsButton: () => cy.get(getDataCy(projectsAccessIds.addProjectButton)),
    getProjectCardButton: () => cy.get(getDataCy(projectsAccessIds.projectCardButton)),
    getProjectTitle: () => cy.get(getDataCy(projectsAccessIds.projectTitle)),
    getProjectStatus: () => cy.get(getDataCy(projectsAccessIds.projectStatus)),

    projectPageContent: {
        infoBlock: {
            getTitle: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.infoBlock.title)),
            getTitleInput: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.infoBlock.titleInput)),
            getStatus: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.infoBlock.status)),

            participantsBlock: {
                getAvatar: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.infoBlock.participantsBlock.avatar)),
            }
        },

        projectActionMenu: {
            getMenuButton: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.projectActionMenu.menuButton)),
            getMenuList: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.projectActionMenu.menuList)),
            getMenuItem: () => cy.get(getDataCy(projectsAccessIds.projectPageContent.projectActionMenu.menuItem)),
        }
    }
};
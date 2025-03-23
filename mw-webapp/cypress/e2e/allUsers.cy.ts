import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import allUsersData from "cypress/fixtures/allUsersFixture.json";
import {Navigation} from "cypress/support/Navigation";
import {AllUsersPage, ViewMode} from "cypress/support/pages/AllUsersPage";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
    Navigation.openAllUsersPage();
});

afterEach(() => {
    cy.clearAllStorage();
});

function getLowerCaseTextAndCheck(element: JQuery<HTMLElement>, symbols: string): void {
    cy.wrap(element).invoke('text').then(text => {
        text.toLowerCase().includes(symbols.toLowerCase());
    });
};

describe('NoAuth All Users scope tests', () => {

    it('NoAuth_AllUsers_OpenUserPersonalAreaTableView', () => {
        AllUsersPage.adjustUsersViewMode(ViewMode.tableView);

        const checkUserNameLink = (userData: {userName: string, userId: string}) => {
            allUsersSelectors.allUsersTable.getUserLink(userData.userName).contains(userData.userName).click();
            cy.url().should('include', userData.userId);
            userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
        }

        checkUserNameLink(testUserData.users.John);
        cy.visit(`/${allUsersData.endpoint}`);

        checkUserNameLink(testUserData.users.Bob);
        cy.visit(`/${allUsersData.endpoint}`);

        checkUserNameLink(testUserData.users.Bernardo);
        
    });

    it('NoAuth_AllUsers_OpenUserPersonalAreaCardView', () => {
        const checkWayLink = (userData: {userName: string, userId: string}) => {
            AllUsersPage.openUserPersonalAreaPageByClickingCard(userData.userName);
            cy.url().should('include', userData.userId);
            userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
        }
      
        checkWayLink(testUserData.users.John);
        cy.visit(`/${allUsersData.endpoint}`);
      
        checkWayLink(testUserData.users.Bob);
        cy.visit(`/${allUsersData.endpoint}`);
      
        checkWayLink(testUserData.users.Bernardo);
               
    });

    it('NoAuth_AllUsers_SearchByEmail', () => {
        AllUsersPage.adjustUsersViewMode(ViewMode.tableView);

        const searchByEmail = (searchData: {symbols: string, expectedCount: number}) => {
            AllUsersPage.searchUserByEmail(searchData.symbols);

            allUsersSelectors.allUsersTable.getUserContact()
                .should('have.length', searchData.expectedCount)
                .each((userEmail) => {
                    getLowerCaseTextAndCheck(userEmail,searchData.symbols);
                });
            
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().clear();
        }

        searchByEmail(testUserData.searchByEmail.firstSearch);
        searchByEmail(testUserData.searchByEmail.secondSearch);
        searchByEmail(testUserData.searchByEmail.thirdSearch);

    });

    it('NoAuth_AllUsers_SearchByName', () => {
        AllUsersPage.adjustUsersViewMode(ViewMode.tableView);

        const searchByName = (searchData: {symbols: string, expectedCount: number}) => {
            AllUsersPage.searchUserByName(searchData.symbols);

            allUsersSelectors.allUsersTable.getUserName()
                .should('have.length', searchData.expectedCount)
                .each((userName) => {
                    getLowerCaseTextAndCheck(userName,searchData.symbols);
                });
            
            allUsersSelectors.filterViewBlock.getSearchByNameInput().clear();
        }

        searchByName(testUserData.searchByName.firstSearch);
        searchByName(testUserData.searchByName.secondSearch);
        searchByName(testUserData.searchByName.thirdSearch);

    });

});
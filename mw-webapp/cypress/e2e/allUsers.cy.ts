import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import allUsersData from "cypress/fixtures/allUsersFixture.json";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
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
        allWaysSelectors.filterViewBlock.getTableViewButton().click();

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
            allUsersSelectors.card.getCardLink(userData.userName).click();
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
        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        const searchByEmail = (searchData: {symbols: string, expectedCount: number}) => {
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().type(searchData.symbols);

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
        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        const searchByName = (searchData: {symbols: string, expectedCount: number}) => {
            allUsersSelectors.filterViewBlock.getSearchByNameInput().type(searchData.symbols);

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
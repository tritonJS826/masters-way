import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import allUsersData from "cypress/fixtures/allUsersFixture.json";

beforeEach(() => {
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('NoAuth All Users scope tests', () => {
    
    it('NoAuth_AllUsers_OpenUserPersonalAreaTableView', () => {
        const users: Record<string, string> = testUserData.users;

        Object.keys(users).forEach(expectedUserName => {
            allWaysSelectors.filterViewBlock.getTableViewButton().click();

            allUsersSelectors.allUsersTable.getUserLink(expectedUserName).contains(expectedUserName).click();
        
            cy.url().should('include', `${users[expectedUserName]}`);
            userPersonalSelectors.descriptionSection.getName().should('have.text', expectedUserName);
      
            cy.visit(`/${allUsersData.endpoint}`);
        });        
    });

    it('NoAuth_AllUsers_OpenUserPersonalAreaCardView', () => {
        const users: Record<string, string> = testUserData.users;

        Object.keys(users).forEach(expectedUserName => {
            allUsersSelectors.allWaysCard.getCardLink()
                .filter(`[href="/user/${users[expectedUserName]}"]`)
                .contains(expectedUserName)
                .click();
    
            cy.url().should('include', `${users[expectedUserName]}`);
            userPersonalSelectors.descriptionSection.getName().should('have.text', expectedUserName);
      
            cy.visit(`/${allUsersData.endpoint}`);
        });        
    });

    it.only('NoAuth_AllUsers_SearchByEmail', () => {
        const searchByEmail: Record<string, number> = testUserData.searchByEmail;

        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        Object.keys(searchByEmail).forEach((symbols) => {
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().type(symbols);

            allUsersSelectors.allUsersTable.getUserContact()
                .should('have.length', searchByEmail[symbols])
                .and('contain', symbols);
        
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().clear();
        });

    });

    it.only('NoAuth_AllUsers_SearchByName', () => {
        const searchByEmail: Record<string, number> = testUserData.searchByEmail;

        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        Object.keys(searchByEmail).forEach((symbols) => {
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().type(symbols);

            allUsersSelectors.allUsersTable.getUserContact()
                .should('have.length', searchByEmail[symbols])
                .and('contain', symbols);
        
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().clear();
        });

    });

});
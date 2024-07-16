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

function getLowerCaseTextAndCheck(element: JQuery<HTMLElement>, symbols: string): void {
    cy.wrap(element).invoke('text').then(text => {
        text.toLowerCase().includes(symbols.toLowerCase());
    });
};

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

    it('NoAuth_AllUsers_SearchByEmail', () => {
        const searchByEmail: Record<string, number> = testUserData.searchByEmail;

        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        Object.keys(searchByEmail).forEach((symbols) => {
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().type(symbols);

            allUsersSelectors.allUsersTable.getUserContact()
                .should('have.length', searchByEmail[symbols])
                .each((userEmail) => {
                    getLowerCaseTextAndCheck(userEmail,symbols);
                });
        
            allUsersSelectors.filterViewBlock.getSearchByEmailInput().clear();
        });
    });

    it('NoAuth_AllUsers_SearchByName', () => {
        const searchByName: Record<string, number> = testUserData.searchByName;

        allWaysSelectors.filterViewBlock.getTableViewButton().click();

        Object.keys(searchByName).forEach((symbols) => {
            allUsersSelectors.filterViewBlock.getSearchByNameInput().type(symbols);

            allUsersSelectors.allUsersTable.getUserName()
                .should('have.length', searchByName[symbols])
                .each((userName) => {
                    getLowerCaseTextAndCheck(userName,symbols);
                });
        
            allUsersSelectors.filterViewBlock.getSearchByNameInput().clear();
        });
    });

});
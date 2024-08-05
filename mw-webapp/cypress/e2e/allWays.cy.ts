import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import allWayData from "cypress/fixtures/allWaysFixture.json";

const apiUrl = Cypress.env('API_BASE_PATH');

beforeEach(() => {
  cy.request('GET', `${apiUrl}/dev/reset-db`);
  cy.visit('/');
  headerSelectors.getBurgerMenu().click();
  navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
});

afterEach(() => {
  cy.clearAllStorage();
});

describe('NoAuth All Ways scope tests', () => {

  it('NoAuth_AllWays_SelectTableView', () => {
    const tableHeadersEn = Object.values(allWaysPageContent.waysTable.columns).map(column => column.en);
    tableHeadersEn.push(Symbols.STAR);

    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTable().should('exist');

    tableHeadersEn.forEach((el, index) => {
      allWaysSelectors.allWaysTable.getTable().find("th").contains(tableHeadersEn[index])
    });
    
  });

  it('NoAuth_AllWaysTable_LinkToOwner', () => {
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    const checkOwnerLink = (userData: {userName: string, userId: string}) => {
      allWaysSelectors.allWaysTable.getOwnerLink(userData.userName).first().click();
      cy.url().should('include', userData.userId);
      userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
    }

    checkOwnerLink(testWayData.users.Dana);
    cy.visit(`/${allWayData.endpoint}`);

    checkOwnerLink(testWayData.users.Jane);
    cy.visit(`/${allWayData.endpoint}`);

    checkOwnerLink(testWayData.users.Ronnie);

  });

  it('NoAuth_AllWaysTable_LinkToWay', () => {
    allWaysSelectors.filterViewBlock.getTableViewButton().click();
    
    const checkWayLink = (wayData: {wayName: string, wayId: string}) => {
      allWaysSelectors.allWaysTable.getWayLink(wayData.wayName).first().click();
      cy.url().should('include', wayData.wayId);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', wayData.wayName);
    }
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();

    checkWayLink(testWayData.ways.danaWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.janeWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.ronnieWay);

  });

  it('NoAuth_AllWaysTable_LinkToMentor', () => {
    allWaysSelectors.filterViewBlock.getTableViewButton().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
    
    const checkMentorLink = (userData: {userName: string, userId: string}) => {
      allWaysSelectors.allWaysTable.getOwnerLink(userData.userName).first().click();
      cy.url().should('include', userData.userId);
      userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
    }
    
    checkMentorLink(testWayData.users.Alice);
    cy.visit(`/${allWayData.endpoint}`);

    checkMentorLink(testWayData.users.Jane);
    cy.visit(`/${allWayData.endpoint}`);

    checkMentorLink(testWayData.users.Dana);

  });

  it('NoAuth_AllWaysCardsClick', () => {
    
    const checkWayLink = (wayData: {wayName: string, wayId: string}) => {
      allWaysSelectors.allWaysCard.getCardLink(wayData.wayName).first().click();
      cy.url().should('include', wayData.wayId);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', wayData.wayName);
    }
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();

    checkWayLink(testWayData.ways.danaWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.janeWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.ronnieWay);

  });

});
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import allWayData from "cypress/fixtures/allWaysFixture.json";

afterEach(() => {
  cy.clearAllStorage();
});

describe('NoAuth All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
  });

  it('NoAuth_AllWays_SelectTableView', () => {
    const tableHeadersEn = Object.values(allWaysPageContent.waysTable.columns).map(column => column.en);
    tableHeadersEn.push(Symbols.STAR);

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTable().should('exist');

    allWaysSelectors.allWaysTable.getTableTh().each((el, index) => {
      cy.wrap(el).contains(tableHeadersEn[index])      
    });
  });

  it('NoAuth_AllWaysTable_LinkToOwner', () => {
    const owners: Record<string, string> = testWayData.owners;

    Object.keys(owners).forEach(expectedOwnerName => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getOwnerLink(expectedOwnerName).first().invoke('text').should('eq', expectedOwnerName);

      allWaysSelectors.allWaysTable.getOwnerLink(expectedOwnerName).first().click();

      cy.url().should('include', `${owners[expectedOwnerName]}`);
      userPersonalSelectors.descriptionSection.getName().should('have.text', expectedOwnerName);
          
      cy.visit(`/${allWayData.endpoint}`);
    });
  });

  it('NoAuth_AllWaysTable_LinkToWay', () => {
    const ways: Record<string, string> = testWayData.ways;

    Object.keys(ways).forEach(expectedWayTitle => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getWayLink(expectedWayTitle).first().invoke('text').should('eq', expectedWayTitle);

      allWaysSelectors.allWaysTable.getWayLink(expectedWayTitle).first().click();

      cy.url().should('include', `${ways[expectedWayTitle]}`);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', expectedWayTitle);
          
      cy.visit(`/${allWayData.endpoint}`);
    });
  });

  it('NoAuth_AllWaysTable_LinkToMentor', () => {
    const mentors: Record<string, string> = testWayData.mentors;

    Object.keys(mentors).forEach(expectedMentorName => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getMentorLink(expectedMentorName).first().invoke('text').should('eq', expectedMentorName);

      allWaysSelectors.allWaysTable.getMentorLink(expectedMentorName).first().click();

      cy.url().should('include', `${mentors[expectedMentorName]}`);
      userPersonalSelectors.descriptionSection.getName().should('have.text', expectedMentorName);
          
      cy.visit(`/${allWayData.endpoint}`);
    });
  });

  it('NoAuth_AllWaysCardsClick', () => {
    const ways: Record<string, string> = testWayData.ways;

    Object.keys(ways).forEach(expectedWayTitle => {
      allWaysSelectors.allWaysCard.getCardLink()
        .filter(`[href="/way/${ways[expectedWayTitle]}"]`)
        .contains(expectedWayTitle)
        .click();

      cy.url().should('include', `${ways[expectedWayTitle]}`);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', expectedWayTitle);
          
      cy.visit(`/${allWayData.endpoint}`);
    });
  });

});
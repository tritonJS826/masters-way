import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import allWayData from "cypress/fixtures/allWaysFixture.json";
import {AllWaysPage, MinDayReports} from "cypress/support/pages/AllWaysPage";
import {Navigation} from "cypress/support/Navigation";

beforeEach(() => {
  cy.resetGeneralDb();
  cy.visit('/');
  Navigation.openAllWaysPage();
});

afterEach(() => {
  cy.clearAllStorage();
});

describe('NoAuth All Ways scope tests', () => {

  const allWaysPage = new AllWaysPage();

  it('NoAuth_AllWays_SelectTableView', () => {
    const tableHeadersEn = Object.values(allWaysPageContent.waysTable.columns).map(column => column.en);
    tableHeadersEn.push(Symbols.STAR);

    AllWaysPage.adjustWayFilterMinDayReports(MinDayReports.any);
    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTable().should('exist');

    tableHeadersEn.forEach((el, index) => {
      allWaysSelectors.allWaysTable.getTable().find("th").contains(tableHeadersEn[index])
    });
    
  });

  it('NoAuth_AllWaysTable_LinkToOwner', () => {
    const checkOwnerLink = (userData: {userName: string, userId: string}) => {
      allWaysSelectors.allWaysTable.getOwnerLink(userData.userName).first().click();
      cy.url().should('include', userData.userId);
      userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
    }

    AllWaysPage.adjustWayFilterMinDayReports(MinDayReports.any);
    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    checkOwnerLink(testWayData.users.Dana);
    cy.visit(`/${allWayData.endpoint}`);

    checkOwnerLink(testWayData.users.Alice);
    cy.visit(`/${allWayData.endpoint}`);

    checkOwnerLink(testWayData.users.Ronnie);

  });

  it('NoAuth_AllWaysTable_LinkToWay', () => {
    const checkWayLink = (wayData: {wayName: string, wayId: string}) => {
      allWaysSelectors.allWaysTable.getWayLink(wayData.wayName).first().click();
      cy.url().should('include', wayData.wayId);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', wayData.wayName);
    }
    
    AllWaysPage.adjustWayFilterMinDayReports(MinDayReports.any);
    allWaysSelectors.filterViewBlock.getTableViewButton().click();
  
    checkWayLink(testWayData.ways.danaWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.aliceWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.ronnieWay);

  });

  it('NoAuth_AllWaysTable_LinkToMentor', () => {    
    const checkMentorLink = (userData: {userName: string, userId: string}) => {
      allWaysSelectors.allWaysTable.getOwnerLink(userData.userName).first().click();
      cy.url().should('include', userData.userId);
      userPersonalSelectors.descriptionSection.getName().should('have.text', userData.userName);
    }

    allWaysSelectors.filterViewBlock.getTableViewButton().click();
    AllWaysPage.adjustWayFilterMinDayReports(MinDayReports.any);
    
    checkMentorLink(testWayData.users.Alice);
    cy.visit(`/${allWayData.endpoint}`);

    checkMentorLink(testWayData.users.Ronnie);
    cy.visit(`/${allWayData.endpoint}`);

    checkMentorLink(testWayData.users.Dana);

  });

  it('NoAuth_AllWays_CardsClick', () => {
    const checkWayLink = (wayData: {wayName: string, wayId: string}) => {
      allWaysSelectors.allWaysCard.getCardLink(wayData.wayName).first().click();
      cy.url().should('include', wayData.wayId);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', wayData.wayName);
    }
    
    AllWaysPage.adjustWayFilterMinDayReports(MinDayReports.any);

    checkWayLink(testWayData.ways.danaWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.aliceWay);
    cy.visit(`/${allWayData.endpoint}`);

    checkWayLink(testWayData.ways.ronnieWay);

  });

});
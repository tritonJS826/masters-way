import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {viewports, themes, matchImageSnapshotParam} from "cypress/testData/visualTestData";

describe('Visual regression test with themes', () => {

  viewports.forEach(({name: viewportName, width, height}) => {
    themes.forEach(({name: themeName, clicks}) => {
      it(`Visual snapshot on ${viewportName} viewport with ${themeName} theme`, () => {
        cy.viewport(width, height);
        cy.visit('/');
        cy.wait(2000);

        Cypress._.times(clicks, () => {
          headerSelectors.settings.getThemeSwitcher().click({force: true});
        });

        cy.matchImageSnapshot(`homepage-${viewportName}-${themeName}`, {
          failureThreshold: matchImageSnapshotParam.failureThreshold,
          failureThresholdType: matchImageSnapshotParam.failureThresholdType,
          capture: matchImageSnapshotParam.capture
        });
      });
    });
  });
});

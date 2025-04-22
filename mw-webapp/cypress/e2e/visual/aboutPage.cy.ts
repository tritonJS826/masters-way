import aboutProjectPageData from "cypress/fixtures/aboutProjectPageFixture.json";

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

describe('Visual Tests', () => {
  viewports.forEach((viewport) => {
    it(`About our project comparison (${viewport.name})`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit(aboutProjectPageData.endpoint);
      cy.wait(1000);
      cy.matchImageSnapshot({
        customSnapshotsDir: 'cypress/snapshots/base/aboutPage',
        customDiffDir: 'cypress/snapshots/diff',
        customSnapshotIdentifier: `aboutPage-${viewport.name}`,
        failureThreshold: 0.1,
        failureThresholdType: 'percent',
      });
    });
  });
});
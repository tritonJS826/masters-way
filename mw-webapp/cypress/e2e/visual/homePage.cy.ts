const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

//сделать очистку папки 1 раз перед запуском всех тестов из папки visual
// before(() => cy.task('clearSnapshots'));

describe('Visual Tests', () => {

  viewports.forEach((viewport) => {
    it(`Homepage comparison (${viewport.name})`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/");
      cy.wait(2000);

    // const scale = 1;
    // cy.document().then((doc) => {
    //   const body = doc.body;
    //   body.style.transform = `scale(${scale})`;
    //   body.style.transformOrigin = 'top left';
    //   body.style.width = `${100 / scale}%`; 
    //   body.style.overflow = 'hidden';
    // });

    // const scale = 0.3; 
    
    // cy.viewport(
    //   Math.ceil(viewport.width / scale), 
    //   Math.ceil(viewport.height / scale)
    // );

    // cy.visit("/");
    // cy.wait(1000);

    // cy.document().then((doc) => {
    //   const body = doc.body;
    //   body.style.transform = `scale(${scale})`;
    //   body.style.transformOrigin = 'top left';
    //   body.style.width = `${100 / scale}%`;
    //   body.style.height = `${doc.documentElement.scrollHeight / scale}px`;
    //   body.style.overflow = 'hidden';
    // });

      cy.matchImageSnapshot({
        capture: 'fullPage',
        customSnapshotsDir: 'cypress/snapshots/base/homePage',
        customDiffDir: 'cypress/snapshots/diff',
        customSnapshotIdentifier: `homepage-${viewport.name}`,
        failureThreshold: 0.1,
        failureThresholdType: 'percent',
      });
    });
  });
});
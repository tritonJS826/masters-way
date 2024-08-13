import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Theme, themedVariables} from "src/globalStore/ThemeStore";

const apiUrl = Cypress.env('API_BASE_PATH');

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('checkLinkAttributes', (selector, expectedHref: string) => {
  selector
    .should('have.attr', 'href', expectedHref)
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noopener noreferrer');
});

Cypress.Commands.add('checkLinkStatus', (selector, href: string) => {
  selector
    .then((link: { prop: (arg0: string) => string; }) => {
      cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
});

Cypress.Commands.add('checkThemeColors', (theme: string) => {
  Object.keys(themedVariables)
    .forEach(variableName => {
      const expectedColor = themedVariables[variableName][theme as Theme];

      cy.document().then((doc) => {
        const actualColor = getComputedStyle(doc.documentElement).getPropertyValue(`--${variableName}`).trim();
        assert.equal(actualColor, expectedColor);
      });
  });
});

Cypress.Commands.add('clearAllStorage', () => {
  cy.window().then(win => win.sessionStorage.clear());
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('login', (user: string) => {
  cy.visit(user);
});

Cypress.Commands.add('logout', () => {
  headerSelectors.getBurgerMenu().click();
  navigationMenuSelectors.getLogoutButton().click();
});

Cypress.Commands.add('resetDb', () => {
  cy.request('GET', `${apiUrl}/dev/reset-db`);
});

Cypress.Commands.add("getFirstLetters", (str: any) => {
  const words = str.trim().split(/\s+/);
  
  if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
  } else {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
});

export {};

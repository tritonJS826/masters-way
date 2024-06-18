/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      getByData(tag: string): Chainable<any>
      checkLinkAttributes(selector, expectedHref: string): Chainable<Element>
      checkLinkStatus(selector, href: string): Chainable<Element>
      checkThemeColors(theme: string): Chainable<Element>
      clearAllStorage(): Chainable<Element>
    }  
}
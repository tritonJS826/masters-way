/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      getByData(tag: string): Chainable<any>
      checkLinkAttributes(selector, expectedHref: string): void
      checkLinkStatus(selector, href: string): void
      checkThemeColors(theme: string): void
      clearAllStorage(): void
      login(user: string): void
      logout(): void
      resetDb(): void
    }  
}
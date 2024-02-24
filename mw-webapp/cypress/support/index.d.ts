/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      getByData(tag: string): Chainable<any>
    }
  }
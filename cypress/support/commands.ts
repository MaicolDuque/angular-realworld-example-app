// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: never[]): Chainable<Element>;
    login(email: string, password: string): Chainable<Element>;
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:4200')
  cy.contains('a', 'Sign in').click()
  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Password"]').type(password)
  cy.get('button').should('not.be.disabled')
  cy.get('button').click()
})
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

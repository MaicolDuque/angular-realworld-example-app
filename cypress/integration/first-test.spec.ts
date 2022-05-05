describe('Login', {
  env: {
    password: 'cypress123',
  }
}, () => {
  beforeEach(() => {
    // cy.visit('http://localhost:4200')
    // cy.contains('a', 'Sign in').click()
    cy.intercept('GET', 'https://api.realworld.io/api/tags', { fixture: 'tags', delay: 5000 }).as('tagsRequest')
  })

  it('Should visit login page', () => {
    cy.location('pathname').should('eq', '/login')
    cy.get('h1').should('contain', 'Sign in')
  })


  it('Should be button disabled', () => {
    cy.get('button').should('be.disabled')
  })

  it('Should be failed login', () => {
    cy.login('maicol.duque@qrvey.com', 'cypress12344')
    cy.contains('li','email or password is invalid').should('be.visible')
  })

  it('Should login succesful', () => {
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.contains('a', 'Your Feed').should('be.visible')
  })

  it('Should test shadow', () => {
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.contains('a', 'Shadow').click()
    cy.get('qui-input-v2').shadow().within(_ => {
      cy.get('input').type('Qrvey')
    })
    cy.get('qui-button').shadow().within(_ => {
      cy.contains('Qrvey')
    })
  })

  it.only('Should test shadow', () => {
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.wait('@tagsRequest')
    cy.contains('div', 'Popular Tags').find('a').as('popular')
    cy.get('@popular').should('have.length', 2)
    cy.get('@popular').should('contain', 'Qrvey')
  })
})

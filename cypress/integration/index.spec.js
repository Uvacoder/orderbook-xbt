describe('orderbook-xbt', () => {
  it('loads the websockets', () => {
    cy.visit('/')
    cy.get('svg').should('be.visible')
    cy.wait(500)
    cy.get('th').eq(0).should('have.text', 'PRICE')
  })
  it('selects another currency', () => {
    cy.get('select').select('PI_ETHUSD').should('have.value', 'PI_ETHUSD')
    cy.wait(500)
    cy.get('th').eq(0).should('have.text', 'PRICE')
  })
})

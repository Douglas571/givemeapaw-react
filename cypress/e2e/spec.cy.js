describe('empty spec', () => {
  beforeEach(() => {
    cy.viewport(360, 640)
    cy.visit('http://localhost:5173')

    let user = {
      username: 'midudev',
      password: 'lamidupassword'
    }
  })

  it('passes', () => {
    
  })
})
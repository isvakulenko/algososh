//Напишите тест, который будет проверять, что ваше приложение поднялось.

describe('app is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('')
  })
})


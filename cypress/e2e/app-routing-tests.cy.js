//Напишите тест для проверки работы роутинга. Необходимо удостовериться,
// что 6 страниц с визуализацией алгоритмов будут доступны пользователю.
describe("app works correctly with routes", () => {
  before(function () {
    cy.visit("");
  });
  it("should open main page", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("should route to page 'Line'", () => {
    cy.get('a[href ="/recursion"]').click();
    cy.get("h3").contains("Строка");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("should route to page 'Fibonacci'", () => {
    cy.get('a[href ="/fibonacci"]').click();
    cy.get("h3").contains("Последовательность Фибоначчи");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("should route to page 'Sorting'", () => {
    cy.get('a[href ="/sorting"]').click();
    cy.get("h3").contains("Сортировка массива");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("should route to page 'Stack'", () => {
    cy.get('a[href ="/stack"]').click();
    cy.get("h3").contains("Стек");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("should route to page 'Queue'", () => {
    cy.get('a[href ="/queue"]').click();
    cy.get("h3").contains("Очередь");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("should route to page 'Link list'", () => {
    cy.get('a[href ="/list"]').click();
    cy.get("h3").contains("Связный список");
    cy.get("a").click();
    cy.contains("МБОУ АЛГОСОШ");
  });
});

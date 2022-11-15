describe("Page with stack is right", () => {
  before(function () {
    cy.visit("http://localhost:3000/stack");
  });

  // Проверьте, что если в инпуте пусто, то кнопка
  // добавления недоступна.
  it("should disable button if input is empty", () => {
    if (cy.get("input").should("have.value", "")) {
      cy.contains("Добавить").should("be.disabled");
      cy.contains("Удалить").should("be.disabled");
      cy.contains("Очистить").should("be.disabled");
    }
  });
  // Проверьте правильность добавления элемента в стек.
  // Важно убедиться, что цвета элементов меняются
  // и каждый шаг анимации отрабатывает корректно.

  it("should elements add to stack correctly", () => {
    // Добавим в стек Q
    cy.get("input").type("Q");
    cy.get("input").should("have.value", "Q");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should("have.length", 1);
    cy.get("[class*=circle_content]").contains("Q");
    cy.get("[class*=circle_content]").contains("top");
    cy.get("[class*=circle_content]").children("[class*= circle_changing]");
    cy.wait(500);
    cy.get("[class*=circle_content]").children("[class*= circle_default]");
    // Добавим в стек W
    cy.get("input").type("W");
    cy.get("input").should("have.value", "W");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should("have.length", 2);
    cy.get("[class*=circle_content]").contains("W");
    cy.get("[class*=circle_content]").last().contains("top");
    cy.get("[class*=circle_content]")
      .last()
      .children("[class*= circle_changing]");
    cy.wait(500);
    cy.get("[class*=circle_content]").children("[class*= circle_default]");
    // Добавим в стек E
    cy.get("input").type("E");
    cy.get("input").should("have.value", "E");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").should("have.length", 3);
    cy.get("[class*=circle_content]").contains("E");
    cy.get("[class*=circle_content]").last().contains("top");
    cy.get("[class*=circle_content]")
      .last()
      .children("[class*= circle_changing]");
  });
  // Проверить правильность удаления элемента из стека.
  it("should element delete from stack correctly", () => {
    cy.contains("Удалить").click();
    cy.get("[class*=circle_content]")
      .last()
      .children("[class*= circle_changing]");
    cy.wait(1000);
    cy.get("[class*=circle_content]")
      .last()
      .children("[class*= circle_default]");
    cy.get("[class*=circle_content]").contains("W");
    cy.get("[class*=circle_content]").last().contains("top");
  });
  // Проверьте поведение кнопки «Очистить». Добавьте в стек
  // несколько элементов, по нажатию на кнопку «Очистить» длина стека
  // должна быть равна 0.
  it("should clear stack correctly", () => {
    cy.contains("Удалить").should("be.enabled");
    cy.contains("Очистить").click();
    cy.get("[class*=circle_content]").should("have.length", 0);
  });
});

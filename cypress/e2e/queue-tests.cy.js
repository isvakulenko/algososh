import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Page with queue is right", () => {
  before(function () {
    cy.visit("http://localhost:3000/queue");
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
  // Проверьте, правильность добавления элемента в очередь.
  // Необходимо убедиться, что цвета элементов меняются и каждый
  // шаг анимации отрабатывает корректно. Не забудьте проверить,
  // что курсоры head и tail отрисовываются корректно.

  it("should elements add to queue correctly", () => {
    // Добавим в очередь Q
    cy.get("input").type("Q").should("have.value", "Q");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").contains("Q");
    cy.get("[class*=circle_content]").contains("head");
    cy.get("[class*=circle_content]").contains("tail");
    cy.get("[class*=circle_content]").children("[class*= circle_changing]");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").children("[class*= circle_default]");
    // Добавим в очередь W
    cy.get("input").type("W").should("have.value", "W");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").contains("W");
    cy.get("[class*=circle_content]").first().contains("head");
    cy.get("[class*=circle_content]").eq(1).contains("tail");
    cy.get("[class*=circle_content]")
      .eq(1)
      .children("[class*= circle_changing]");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").children("[class*= circle_default]");
    // Добавим в стек E
    cy.get("input").type("E").should("have.value", "E");
    cy.contains("Добавить").click();
    cy.get("[class*=circle_content]").contains("W");
    cy.get("[class*=circle_content]").first().contains("head");
    cy.get("[class*=circle_content]").eq(2).contains("tail");
    cy.get("[class*=circle_content]")
      .eq(2)
      .children("[class*= circle_changing]");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").children("[class*= circle_default]");
  });
  //   // Проверить правильность удаления элемента из очереди.
  it("should element delete from queue correctly", () => {
    cy.contains("Удалить").click();
    cy.get("[class*=circle_content]")
      .first()
      .children("[class*= circle_changing]");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]")
      .first()
      .children("[class*= circle_default]");
    cy.get("[class*=circle_content]").eq(1).contains("head");
    cy.get("[class*=circle_content]").eq(2).contains("tail");
  });
  // Проверьте поведение кнопки «Очистить». Добавьте в стек
  // несколько элементов, по нажатию на кнопку «Очистить» длина очереди
  // должна быть равна 0.
  it("should clear queue correctly", () => {
    cy.contains("Удалить").should("be.enabled");
    cy.contains("Очистить").click();
    cy.get("[class*=text_type_circle]").each(($element, index) => {
      cy.wrap($element).should("have.value", "");
    });
  });
});

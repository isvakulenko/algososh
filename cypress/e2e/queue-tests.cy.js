import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {CLASS_CIRCLE_CONTENT} from './constants';
import {CLASS_CIRCLE_CHANGING} from './constants';

describe("Page with queue is right", () => {
  before(function () {
    cy.visit("queue");
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
    cy.get(CLASS_CIRCLE_CONTENT).contains("Q");
    cy.get(CLASS_CIRCLE_CONTENT).contains("head");
    cy.get(CLASS_CIRCLE_CONTENT).contains("tail");
    cy.get(CLASS_CIRCLE_CONTENT).children(CLASS_CIRCLE_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).children('[class*= circle_default]');
    // Добавим в очередь W
    cy.get("input").type("W").should("have.value", "W");
    cy.contains("Добавить").click();
    cy.get(CLASS_CIRCLE_CONTENT).contains("W");
    cy.get(CLASS_CIRCLE_CONTENT).first().contains("head");
    cy.get(CLASS_CIRCLE_CONTENT).eq(1).contains("tail");
    cy.get(CLASS_CIRCLE_CONTENT)
      .eq(1)
      .children(CLASS_CIRCLE_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).children('[class*= circle_default]');
    // Добавим в стек E
    cy.get("input").type("E").should("have.value", "E");
    cy.contains("Добавить").click();
    cy.get(CLASS_CIRCLE_CONTENT).contains("W");
    cy.get(CLASS_CIRCLE_CONTENT).first().contains("head");
    cy.get(CLASS_CIRCLE_CONTENT).eq(2).contains("tail");
    cy.get(CLASS_CIRCLE_CONTENT)
      .eq(2)
      .children(CLASS_CIRCLE_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).children('[class*= circle_default]');
  });
  //   // Проверить правильность удаления элемента из очереди.
  it("should element delete from queue correctly", () => {
    cy.contains("Удалить").click();
    cy.get(CLASS_CIRCLE_CONTENT)
      .first()
      .children(CLASS_CIRCLE_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT)
      .first()
      .children('[class*= circle_default]');
    cy.get(CLASS_CIRCLE_CONTENT).eq(1).contains("head");
    cy.get(CLASS_CIRCLE_CONTENT).eq(2).contains("tail");
  });
  // Проверьте поведение кнопки «Очистить». Добавьте в стек
  // несколько элементов, по нажатию на кнопку «Очистить» длина очереди
  // должна быть равна 0.
  it("should clear queue correctly", () => {
    cy.contains("Удалить").should("be.enabled");
    cy.contains("Очистить").click();
    cy.get('[class*=text_type_circle]').each(($element, index) => {
      cy.wrap($element).should("have.value", "");
    });
  });
});

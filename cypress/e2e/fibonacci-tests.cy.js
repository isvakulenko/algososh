import { getFibonacciNumbersArr } from "../../src/components/fibonacci-page/utils";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {CLASS_CIRCLE_CONTENT} from './constants'

describe("Page with Fibonacci numbers app is right", () => {
  before(function () {
    cy.visit("fibonacci");
  });
  // Проверьте, что если в инпуте пусто, то кнопка
  // добавления недоступна.
  it("should disable button if input is empty", () => {
    if (cy.get("input").should("have.value", "")) {
      cy.contains("Рассчитать").as("button");
      cy.get("@button").should("be.disabled");
    }
  });
  // Проверьте, что числа генерируются корректно.
  it("should Fibonacci numbers get correctly", () => {
    cy.get("input").type("19");
    cy.get("input").should("have.value", "19");
    cy.get("button").contains("Рассчитать").click();
// Максимальное расчетное число чисел Фибоначчи - 19
    const FibonacciNumbersArr = getFibonacciNumbersArr(19);
// Дадим задержку на вычисление всех чисел Фибоначчи
    cy.wait(19*SHORT_DELAY_IN_MS );
      cy.get(CLASS_CIRCLE_CONTENT).each(($number, index) => {
        cy.wrap($number).contains(FibonacciNumbersArr[index]);
       }
    );
    });
});

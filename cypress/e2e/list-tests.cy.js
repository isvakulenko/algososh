import { initialArr } from "../../src/components/list-page/utils";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {CLASS_CIRCLE_CONTENT} from './constants';
import {CLASS_CIRCLE_CHANGING} from './constants';
import {CLASS_CIRCLE_MODIFIED} from './constants';

let listLength = initialArr.length;
describe("Page with linked list is right", () => {
  before(function () {
    cy.visit("list");
  });
  // Проверьте, что если в инпуте пусто, то кнопка добавления недоступна,
  // кнопки добавления по индексу и удаления по индексу недоступны тоже.
  it("should disable button if input is empty", () => {
    if (cy.get("input").should("have.value", "")) {
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
      cy.contains("Удалить из head").should("be.enabled");
      cy.contains("Удалить из tail").should("be.enabled");
    }
  });
  // Проверьте корректность:
  // отрисовки дефолтного списка.
  it("should render default linked list correctly", () => {
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .each(($number, index) => {
        if (index === 0) {
          expect($number).to.contain("head");
        }
        if (index === 3) {
          expect($number).to.contain("tail");
        }
        cy.wrap($number).contains(initialArr[index]);
      });
  });
  //   добавления элемента в head.
  it("should add element to head of linked list correctly", () => {
    // Добавим в список Q
    cy.get("input").eq(0).type("Q").should("have.value", "Q");
    cy.contains("Добавить в head").click();
    listLength++;
    cy.get(CLASS_CIRCLE_CONTENT).contains("Q");
    cy.get('[class*=circle_changing]').should("be.visible");
    cy.get('[class*=circle_small]').contains("Q");
    cy.get('[class*=circle_modified]').should("be.visible");
    cy.get(CLASS_CIRCLE_CONTENT).first().contains("Q");
    cy.get(CLASS_CIRCLE_CONTENT).first().contains("head");
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .each(($number, index) => {
        cy.wrap($number).children('[class*= circle_default]');
      });
  });
  //   добавления элемента в tail.
  it("should add element to tail of linked list correctly", () => {
    // Добавим в список W
    cy.get("input").eq(0).type("W").should("have.value", "W");
    cy.contains("Добавить в tail").click();
    listLength++;
    cy.get(CLASS_CIRCLE_CONTENT).contains("W");
    cy.get('[class*=circle_changing]').should("be.visible");
    cy.get('[class*=circle_small]').contains("W");
    cy.get('[class*=circle_modified]').should("be.visible");
    cy.get(CLASS_CIRCLE_CONTENT).last().contains("W");
    cy.get(CLASS_CIRCLE_CONTENT).last().contains("tail");
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .each(($number, index) => {
        cy.wrap($number).children('[class*= circle_default]');
      });
  });
  //   добавления элемента по индексу.
  it("should add element to linked list by index correctly", () => {
    // Добавим в список E
    cy.get("input").eq(0).type("E").should("have.value", "E");
    let indexValue = 2;
    // cy.get("input").eq(0);
    cy.get("input").eq(1).type(indexValue);
    cy.get("input").eq(1).should("have.value", indexValue);
    cy.contains("Добавить по индексу").click();
    //  cy.get(CLASS_CIRCLE_CONTENT).siblings().find('[class*=circle_small]').should("have.text", "E")
    // Проверим изменение состояния малого и большого круга
    for (let i = 0; i <= indexValue; i++) {
      cy.get(CLASS_CIRCLE_CONTENT).each(($element, index) => {
        if (index === i) {
          cy.wrap($element)
            .siblings()
            .find('[class*=circle_small]')
            .should("have.text", "E");
        }
        if (index < i) {
          cy.wrap($element).children(CLASS_CIRCLE_CHANGING);
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
    //убедимся, что элемент стал зеленым
    cy.get(CLASS_CIRCLE_CONTENT)
      .eq(indexValue)
      .children(CLASS_CIRCLE_MODIFIED);
    listLength++;
    cy.wait(SHORT_DELAY_IN_MS);
    //убедимся, что элементы перешли в исходное состояние
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .each(($element, index) => {
        cy.wrap($element).children('[class*= circle_default]');
      });
  });
  //   удаления элемента из head.
  it("should delete element from head of linked list correctly", () => {
    cy.contains("Удалить из head").click();
    listLength--;
    cy.get(CLASS_CIRCLE_CONTENT)
      .eq(1)
      .children(CLASS_CIRCLE_CHANGING)
      .should("have.text", "Q");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .children('[class*= circle_default]');
  });
  //   удаления элемента из tail.
  it("should delete element from tail of linked list correctly", () => {
    cy.contains("Удалить из tail").click();
    listLength--;
    cy.get(CLASS_CIRCLE_CONTENT)
      .last()
      .children(CLASS_CIRCLE_CHANGING)
      .should("have.text", "W");
    cy.wait(500);
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .children('[class*= circle_default]');
  });
  //   удаления элемента по индексу.
  it("should delete element from linked list by index correctly", () => {
    cy.get("input").clear();
    let indexValue = 2;
    cy.get("input").eq(1).type(indexValue);
    cy.get("input").eq(1).should("have.value", indexValue);
    cy.contains("Удалить по индексу").click();
    listLength--;
    for (let i = 0; i <= indexValue; i++) {
      cy.get(CLASS_CIRCLE_CONTENT).each(($element, index) => {
        if (index <= i) {
          cy.wrap($element).children(CLASS_CIRCLE_CHANGING);
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.get(CLASS_CIRCLE_CONTENT).each(($element, index) => {
      if (index === indexValue) {
        cy.wrap($element)
          .siblings()
          .find('[class*=circle_small]')
          .should("have.text", "34");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", listLength)
      .children('[class*= circle_default]');
  });
});

import { DELAY_IN_MS } from "../../src/constants/delays";
import {CLASS_CIRCLE_CONTENT} from './constants';
import {CLASS_CIRCLE_CHANGING} from './constants';
import {CLASS_CIRCLE_MODIFIED} from './constants';

// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.

describe("Page with String reverse app is right", () => {
  before(function () {
    cy.visit("recursion");
  });

  it("should disable button if input is empty", () => {
    if (cy.get("input").should("have.value", "")) {
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
    }
  });

  // Проверьте, что строка разворачивается корректно.
  // Важно, чтобы у вас на каждом шаге анимации были проверки на
  // корректность выполненной операции и корректность стилей.

  it("should string reverse correctly", () => {
    cy.get("input").type("pages");
    cy.get("input").should("have.value", "pages");
    cy.get("button").contains("Развернуть").click();
    cy.get(CLASS_CIRCLE_CONTENT)
      .should("have.length", 5)
      .each(($letter, index) => {
        if (index === 0 || index === 4) {
          cy.wrap($letter).children(CLASS_CIRCLE_CHANGING);
        }
        if (index === 0) cy.wrap($letter).should("have.text", "p");
        if (index === 4) cy.wrap($letter).should("have.text", "s");
      });

    cy.wait(DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).each(($letter, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($letter).children(CLASS_CIRCLE_MODIFIED);
      }
      if (index === 0) cy.wrap($letter).should("have.text", "s");
      if (index === 4) cy.wrap($letter).should("have.text", "p");
      if (index === 1 || index === 3) {
        cy.wrap($letter).children(CLASS_CIRCLE_CHANGING);
      }
      if (index === 1) cy.wrap($letter).should("have.text", "a");
      if (index === 3) cy.wrap($letter).should("have.text", "e");
    });
    cy.wait(DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).each(($letter, index) => {
      if (index === 1 || index === 3) {
        cy.wrap($letter).children(CLASS_CIRCLE_MODIFIED);
      }
      if (index === 1) cy.wrap($letter).should("have.text", "e");
      if (index === 2) cy.wrap($letter).should("have.text", "g");
      if (index === 3) cy.wrap($letter).should("have.text", "a");
    });
    cy.wait(DELAY_IN_MS);
    cy.get(CLASS_CIRCLE_CONTENT).each(($letter, index) => {
      cy.wrap($letter).children(CLASS_CIRCLE_MODIFIED);
    });
  });
});

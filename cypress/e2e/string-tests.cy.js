import { DELAY_IN_MS } from "../../src/constants/delays";
// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.

describe("Page with String reverse app is right", () => {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
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
    cy.get("[class*=circle_content]")
      .should("have.length", 5)
      .each(($letter, index) => {
        if (index === 0 || index === 4) {
          cy.wrap($letter).children("[class*= circle_changing]");
        }
        if (index === 0) cy.wrap($letter).should("have.text", "p");
        if (index === 4) cy.wrap($letter).should("have.text", "s");
      });

    cy.wait(DELAY_IN_MS);
    cy.get("[class*=circle_content]").each(($letter, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($letter).children("[class*= circle_modified]");
      }
      if (index === 0) cy.wrap($letter).should("have.text", "s");
      if (index === 4) cy.wrap($letter).should("have.text", "p");
      if (index === 1 || index === 3) {
        cy.wrap($letter).children("[class*= circle_changing]");
      }
      if (index === 1) cy.wrap($letter).should("have.text", "a");
      if (index === 3) cy.wrap($letter).should("have.text", "e");
    });
    cy.wait(DELAY_IN_MS);
    cy.get("[class*=circle_content]").each(($letter, index) => {
      if (index === 1 || index === 3) {
        cy.wrap($letter).children("[class*= circle_modified]");
      }
      if (index === 1) cy.wrap($letter).should("have.text", "e");
      if (index === 2) cy.wrap($letter).should("have.text", "g");
      if (index === 3) cy.wrap($letter).should("have.text", "a");
    });
    cy.wait(DELAY_IN_MS);
    cy.get("[class*=circle_content]").each(($letter, index) => {
      cy.wrap($letter).children("[class*= circle_modified]");
    });
  });
});

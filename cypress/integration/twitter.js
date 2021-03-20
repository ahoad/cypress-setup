/// <reference types="Cypress" />

describe("Twitter Tests", () => {
  beforeEach(() => {
    cy.visit("https://twitter.com/");
    cy.get("[data-testid=signupButton]").should("be.visible");
    cy.get("[data-testid=loginButton]").should("be.visible");
  });

  it("Should see create account pop up on clicking sign up button", () => {
    cy.get("[data-testid=signupButton]").click();
    cy.url().should("include", "/signup");
    cy.contains("Create your account").should("be.visible");
    cy.contains("Next").should("be.visible");
    cy.contains("Name").should("be.visible");
    cy.contains("Phone").should("be.visible");
    cy.contains("Date of birth").should("be.visible");
  });

  it("Should be able to select date in account creation form", () => {
    cy.get("[data-testid=signupButton]").click();

    cy.get("select#Month").select("March");
    cy.get("select#Day").select("12");

    cy.get("select#Year").select("2000");

    cy.get("select#Month option:selected").should("have.text", "March");
    cy.get("select#Day option:selected").should("have.text", "12");
    cy.get("select#Year option:selected").should("have.text", "2000");
  });

  it("Should not be able to submit invalid form with invalid phone number", () => {
    cy.get("[data-testid=signupButton]").click();
    cy.contains("Phone").type("123");
    cy.contains("Next").click();
    cy.contains("Please enter a valid phone number.").should("be.visible");
  });
});

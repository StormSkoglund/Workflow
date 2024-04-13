describe("LoginDenied", () => {
  it("denies user access, if the wrong credentials are used", () => {
    cy.visit("https://stormskoglund.github.io/Workflow/");
    cy.wait(500);

    cy.get("#registerForm button")
      .contains("login", { matchCase: false })
      .should("be.visible")
      .click();
    cy.wait(500);

    cy.get("#loginForm").should("exist").should("be.visible");
    cy.get("#loginEmail").type("badtest@noroff.com");

    cy.get("#loginPassword").type("lowercase", { log: false });

    cy.get("#loginModal .btn-outline-success").should("be.visible").click();
    cy.wait(500);
    cy.on("window:alert", (alert) => {
      expect(alert).to.contain(
        "The provided username or password is incorrect. Please try again.",
      );
    });
  });
});

describe("Login", () => {
  it("will log-in user, if the correct credentials are used", () => {
    cy.visit("https://stormskoglund.github.io/Workflow/");
    cy.wait(1000);

    cy.get("#registerForm button")
      .contains("login", { matchCase: false })
      .should("be.visible")
      .click();
    cy.wait(1000);

    cy.get("#loginForm").should("exist").should("be.visible");
    cy.get("#loginEmail").type("test@noroff.no");
    cy.wait(200);
    cy.get("#loginPassword").type("Password", { log: false });
    cy.wait(200);
    cy.get("#loginModal .btn-outline-success").should("be.visible").click();
    cy.wait(1000);
    cy.location().then((location) => {
      cy.wrap(location.href).should(
        "contain",
        "https://stormskoglund.github.io/Workflow/",
      );
    });
  });
});

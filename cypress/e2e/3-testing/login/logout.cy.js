describe("logout", function () {
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("will log-in user, if the correct credentials are used and then log out the user, when the logout button has been pressed", function () {
    cy.visit("/");
    cy.wait(2500);

    cy.get("#registerForm button")
      .contains("login", { matchCase: false })
      .should("be.visible")
      .click();
    cy.wait(1000);

    cy.get("#loginForm").should("exist").should("be.visible");
    cy.get("#loginEmail").type(this.data.email);

    cy.get("#loginPassword").type(this.data.password, { log: false });

    cy.get("#loginForm button").contains("Login").click();
    cy.wait(500);

    cy.window().its("localStorage.token").should("exist");

    cy.window().its("localStorage.profile").should("exist");

    cy.get('a[data-visible="loggedIn"]').should("exist");
    cy.wait(500);
    cy.get("button.btn.btn-outline-warning.me-2").should("be.visible").click();
    cy.get('a[data-visible="loggedIn"]').should("not.be.selected");
  });
});

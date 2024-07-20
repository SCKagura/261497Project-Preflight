describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Backend", () => {
  it("checks get response", () => {
    const url = "http://localhost:3000";
    cy.request({
      method: "GET",
      url: `${url}/todo`,
    }).then((res) => {
      expect(res.body).to.be.a("array");
    });
  });
});

describe("Frontend", () => {
  it("creates todo", () => {
    const url = "http://localhost:5173";
    const text = new Date().getTime().toString();
    const deadline = "2024-07-20";
    cy.visit(url);
    cy.get("[data-cy='input-text']").type(text);
    cy.get("[data-cy='input-deadline']").type(deadline);
    cy.get("[data-cy='submit']").click();
    cy.contains(text);
    cy.contains(deadline);
  });
});
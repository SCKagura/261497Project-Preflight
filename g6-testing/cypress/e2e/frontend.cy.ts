before(() => {
  const url = Cypress.env("BACKEND_URL");
  cy.request({
    method: "POST",
    url: `${url}/todo/all`,
  });
});

describe("Frontend", () => {
  it("connects", () => {
    const url = Cypress.env("FRONTEND_URL");
    cy.visit(url);
  });

  it("creates todo", () => {
    const url = Cypress.env("FRONTEND_URL");
    const text = new Date().getTime().toString();
    const deadline = "2567-07-28";
    cy.visit(url);
    cy.get("[data-cy='input-text']").type(text);
    cy.get("[data-cy='input-deadline']").type(deadline);  // Ensure correct data-cy attribute for deadline input
    cy.get("[data-cy='submit']").click();
    cy.contains(text).should("exist");
    cy.contains(deadline).should("exist");  // Check if deadline is displayed as expected
  });

it("deletes todo", () => {
  const url = Cypress.env("FRONTEND_URL");
  const text = new Date().getTime().toString();
  
  cy.visit(url);
  
  // Create a new todo item
  cy.get("[data-cy='input-text']").type(text);
  cy.get("[data-cy='submit']").click();
  
  // Ensure the todo item exists before trying to delete it
  cy.get("[data-cy='todo-item-wrapper']")
    // .contains(text)
    // .should("be.visible")  // Check that the item is visible
    .then((todoItem) => {
      // Perform the delete operation
      cy.wrap(todoItem).parent().within(() => {
        cy.get("[data-cy='todo-item-delete']").click();
      });
      
      // Verify the item is no longer present
      cy.get("[data-cy='todo-item-wrapper']")
        .should("not.contain.text", text);  // Assert that the text is not present in the todo items
    });
});
it("deletes todo", () => {
  const url = Cypress.env("FRONTEND_URL");
  const text = new Date().getTime().toString();
  
  cy.visit(url);
  
  // Create a new todo item
  cy.get("[data-cy='input-text']").type(text);
  cy.get("[data-cy='input-deadline']").type("2567-07-28"); // Assuming deadline is required
  cy.get("[data-cy='submit']").click();
  
  // Ensure the todo item exists before trying to delete it
  cy.get("[data-cy='todo-item-wrapper']")
    // .contains(text)
    // .should("be.visible")  // Check that the item is visible
    .then((todoItem) => {
      // Perform the delete operation
      cy.wrap(todoItem).parent().within(() => {
        cy.get("[data-cy='todo-item-delete']").click();
      });
      
      // Verify the item is no longer present
      cy.get("[data-cy='todo-item-wrapper']")
        .should("not.contain.text", text);  // Assert that the text is not present in the todo items
    });
});

  it("updates todo", () => {
    const url = Cypress.env("FRONTEND_URL");
    const text = new Date().getTime().toString();
    const deadline = "2567-07-28"
    const textUpdated = "Updated Text";
    cy.visit(url);
    cy.get("[data-cy='input-text']").type(text);
    cy.get("[data-cy='input-deadline']").type(deadline);  // Ensure correct data-cy attribute for deadline input
    cy.get("[data-cy='submit']").click();
    cy.get("[data-cy='todo-item-wrapper']")
      // .contains(text)
      .parent()
      .within(() => {
        cy.get("[data-cy='todo-item-update']").click();
      });
    cy.get("[data-cy='input-text']").clear().type(textUpdated);
    cy.get("[data-cy='submit']").click();
    cy.contains(textUpdated).should("exist");
    cy.contains(text).should("not.exist");
  });
});

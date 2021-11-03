describe("Home", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Should list Cypress as a feature", () => {
        cy.findByText("Cypress (with Testing Library)").should("exist");
    });
});

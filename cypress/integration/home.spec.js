import usersFixture from "../fixtures/users.json";

describe("Home", () => {
    beforeEach(() => {
        cy.intercept("GET", "/users*", usersFixture);

        cy.visit("/");
    });

    it("Should list users", () => {
        usersFixture.data.forEach(({ id, firstName, lastName, avatar }) => {
            cy.findByText(`${firstName} ${lastName}`).should("exist");
            cy.findByTestId(`avatar_${id}`).should("have.attr", "src", avatar);
        });
    });
});

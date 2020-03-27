describe("Test our inputs and submit our form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza");
    });
    it("Add test to inputs and submit form", function() {
        cy.get('input[name="name"]').type("Ke").should("have.value", "Ke");
        cy.get('select[name="size"]').select('large');
        cy.get("input[name='email']").type("email@email.com").should("have.value", "email@email.com"); //grabbaing attribute from input which is name= whatever it is.
        cy.get("textarea").type("Half the toppings on one side").should("have.value", "Half the toppings on one side");
        cy.get('[type="checkbox"]').check().should('be.checked');
        cy.get('select[name="sauce"]').select('garlic ranch');
        cy.get("button").click();


    });
 

});
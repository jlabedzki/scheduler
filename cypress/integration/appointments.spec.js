describe("appointments", () => {
  xit("should book an interview", () => {
    //reset db before starting test
    cy.request("GET", "/api/debug/reset")

    //visits root of web server
    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");

    //clicks on the first add appointment button
    cy.get("[alt=Add]")
      .first()
      .click();

    //inputs a name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")

    //selects an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();

    //saves the appointment
    cy.contains("Save")
      .click();

    //check to see if appointment was booked
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");  
  });

  xit("should edit an interview", () => {
     //reset db before starting test
     cy.request("GET", "/api/debug/reset")

     //visits root of web server
     cy.visit("/");
 
     cy.contains("[data-testid=day]", "Monday");

     //clicks on edit button in Archie Cohen's appointment
     cy.get("[alt=Edit]")
      .first()
      .click({force: true})

    //clear student and input new name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones")

    //select a new interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();

    //saves the appointment
    cy.contains("Save")
      .click();

    //check to see if appointment was updated
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");   
  });

  it("should cancel an interview", () => {
    //reset db before starting test
    cy.request("GET", "/api/debug/reset")

    //visits root of web server
    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");

    //clicks on delete button in Archie Cohen's appointment
    cy.get("[alt=Delete]")
     .first()
     .click({force: true})

    //clicks on confirm button
    cy.contains(".button--danger", "Confirm")
      .click();

    //confirm that the deleting message appears and then disappears
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    //confirm that Archie Cohen's appointment is no longer present
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});
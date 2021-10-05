import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement,
  waitForElementToBeRemoved, 
  fireEvent, 
  getByText,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText, 
  prettyDOM 
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), { 
      target: { value: "Lydia Miller-Jones" } 
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => (getByText(appointment, "Saving")));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day =  getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {container} = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    //click the delete button on the appointment with Archie Cohen
    fireEvent.click(getByAltText(appointment, "Delete"));

    //check that the confirmation message is shown
    expect(getByText(appointment, /are you sure you would like to delete this appointment?/i)).toBeInTheDocument();

    //click the confirm button on the confirm element
    fireEvent.click(getByText(appointment, "Confirm"));

    //check that the element with the text "deleting" is dipslayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //wait until the element with the "add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    //check that the daylistitem with the text "Monday" has the text 2 spots remaining
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  });

  xit("shows the save error when failing to save an appointment", async () => {

  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {

  });

})


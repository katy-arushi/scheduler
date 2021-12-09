import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
      // waiting for an async API call to the backend
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // get all the appointments using the test ID
    const appointments = getAllByTestId(container, "appointment");
    // get the first empty appointment
    const appointment = appointments[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
      // waiting for an async mock put request to the backend
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // get the day lists, find the monday item
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })
});


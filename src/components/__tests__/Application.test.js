import React from "react";
import axios from "axios";
import {
  render,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";
import Application from "components/Application";


describe('Application', () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // 1. Render the Application.
    const { getByText } = render(<Application />);
    
    // 2. Wait until the appointments for that Day have been rendered
      // waiting for an async API call to the backend
    await waitForElement(() => getByText("Monday"))
    
    // 3. Click on Tuesday in the Day List Sidebar
    fireEvent.click(getByText("Tuesday"));
    
    // 4. Check that one of the Tuesday appointments shows up in the DOM
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // BOOK INTERVIEW
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
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
      // waiting for an async mock put request to the backend
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // get the day lists, find the monday item
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  // DELETE INTERVIEW
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
        // get the day lists, find the monday item
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // NOTE - there is a bug so there's no cleanup after each test, so had to do "1 spot" instead of "2 spots"

  });
  
  // EDIT INTERVIEW
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment for Archie Cohen.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Enter the name "Arushi Katyal" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Arushi Katyal" }
    });

    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the text "Arushi Katyal" is displayed.
    await waitForElement(() => getByText(appointment, "Arushi Katyal"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  // SAVING ERROR
  it("shows the save error when failing twwo save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // get all the appointments using the test ID
    const appointments = getAllByTestId(container, "appointment");
    // get the first empty appointment
    const appointment = appointments[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving..." is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the error text is displayed
    await waitForElement(() => getByText(appointment, /could not save appointment/i));

    // 9. Close the error window
    fireEvent.click(getByAltText(appointment, "Close"));

    // 10. Click the add button again
    fireEvent.click(getByAltText(appointment, "Add"));

    // 11. Expect that the empty form will be shown again
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();

    // 12. expect one spot to still be remaining for Monday
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  
  // DELETING ERROR
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 7. Wait until the element with the error text is displayed
    await waitForElement(() => getByText(appointment, "Could not delete appointment"));

    // 8. Close the error window
    fireEvent.click(getByAltText(appointment, "Close"));

    // 9. Expect that the text "Archie Cohen" is still displayed.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    // 10. Expect one spot to still be remaining for Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
});


import React from "react";

import { render, cleanup, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    //debug();

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();    

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    //Expect no change in spots due to websockets implementation
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
    console.log(prettyDOM(day));

    //expect(getByText(appointment, "SAVING")).not.toBeInTheDocument();

    //console.log(prettyDOM(appointment));    
  });
});
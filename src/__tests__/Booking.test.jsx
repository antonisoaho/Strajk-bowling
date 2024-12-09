import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { expect } from "vitest";
import Booking from "../views/Booking";

describe("Booking", () => {
  let dateInput, timeInput, peopleInput, lanesInput, addShoeButton, bookButton;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    dateInput = screen.getByLabelText("Date");
    timeInput = screen.getByLabelText("Time");
    peopleInput = screen.getByLabelText("Number of awesome bowlers");
    lanesInput = screen.getByLabelText("Number of lanes");
    addShoeButton = screen.getByText("+");
    bookButton = screen.getByText("strIIIIIike!");
  });

  it("should show error when some field is missing", async () => {
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Alla fälten måste vara ifyllda")
      ).toBeInTheDocument();
    });
  });

  it("should show error when no shoes is selected", async () => {
    const players = 5;
    const lanes = Math.ceil(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(
        screen.queryByText(
          "Antalet skor måste stämma överens med antal spelare"
        )
      ).toBeInTheDocument();
    });
  });

  it("should show error when not all shoes are filled with value", async () => {
    const players = 5;
    const lanes = Math.ceil(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    for (let i = 0; i < players; i++) {
      fireEvent.click(addShoeButton);
    }

    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Alla skor måste vara ifyllda")
      ).toBeInTheDocument();
    });
  });

  it("should show error when to many players for 1 lane", async () => {
    const players = 5;
    const lanes = Math.floor(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    for (let i = 0; i < players; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "42" } });
    });

    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Det får max vara 4 spelare per bana")
      ).toBeInTheDocument();
    });
  });

  it("should be able to put shoesize and see all shoesizes", async () => {
    const players = 5;
    const lanes = Math.ceil(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    for (let i = 0; i < 5; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "42" } });
    });

    fireEvent.click(bookButton);

    await waitFor(() => {
      shoeInputs.forEach((input) => {
        expect(input.value).toBe("42");
      });
    });
  });

  it("should be able remove one shoeinput", async () => {
    const players = 5;
    const lanes = Math.ceil(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    for (let i = 0; i < 5 + 1; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "42" } });
    });

    expect(shoeInputs.length).toBe(players + 1);
    const removeShoeButtons = screen.getAllByText("-");
    fireEvent.click(removeShoeButtons[0]);

    const updatedShoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    expect(updatedShoeInputs.length).toBe(players);
  });
});

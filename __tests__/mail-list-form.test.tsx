import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { addToMailList } from "@/actions/email";
import { MailingListForm } from "@/components/ui/mail-list-form";
import { act } from "react-dom/test-utils";

// Mock the addToMailList function
jest.mock("@/actions/email", () => ({
  addToMailList: jest.fn(),
}));

describe("MailingListForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with all fields and submit button", () => {
    render(<MailingListForm />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign up!" }),
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<MailingListForm />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign up!" }));

    await waitFor(() => {
      expect(addToMailList).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      });
    });

    expect(
      screen.getByRole("button", { name: "Thank you!" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays validation errors for empty fields", async () => {
    render(<MailingListForm />);

    fireEvent.click(screen.getByRole("button", { name: "Sign up!" }));

    await waitFor(() => {
      expect(screen.getAllByText("Required")).toHaveLength(3);
    });

    expect(addToMailList).not.toHaveBeenCalled();
  });

  it("displays validation error for invalid email", async () => {
    render(<MailingListForm />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign up!" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });

    expect(addToMailList).not.toHaveBeenCalled();
  });

  it('changes button text to "Signing up..." during submission', async () => {
    render(<MailingListForm />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });

    const submitButton = screen.getByRole("button", { name: "Sign up!" });

    // Use act to wrap the state-changing event
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for the button text to change
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Signing up..." }),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    ); // Increase timeout if necessary
  });
});

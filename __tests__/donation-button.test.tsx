import DonationButton from "@/components/ui/donation-button";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the global.open function
const mockOpen = jest.fn();
global.open = mockOpen;

describe("DonationButton", () => {
  it("renders with default text", () => {
    render(<DonationButton />);
    expect(screen.getByText("Donation")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<DonationButton className="custom-class" />);
    const button = screen.getByText("Donation");
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("font-semibold");
    expect(button).toHaveClass("uppercase");
    expect(button).toHaveClass("tracking-widest");
  });

  it("opens donation link when clicked", () => {
    render(<DonationButton />);
    const button = screen.getByText("Donation");
    fireEvent.click(button);
    expect(mockOpen).toHaveBeenCalledWith(
      "https://donorbox.org/mathaniyy-2024",
    );
  });

  it("passes through additional props", () => {
    render(
      <DonationButton
        data-testid="donation-btn"
        aria-label="Make a donation"
      />,
    );
    const button = screen.getByTestId("donation-btn");
    expect(button).toHaveAttribute("aria-label", "Make a donation");
  });
});

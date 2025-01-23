import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import useInterfaceStore from "@/store/interface";
import MenuOverlay from "@/components/ui/menu-overlay";

// Mock the useInterfaceStore hook
jest.mock("@/store/interface", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("MenuOverlay", () => {
  const mockSetMenuBarOpen = jest.fn();

  beforeEach(() => {
    (useInterfaceStore as unknown as jest.Mock).mockReturnValue({
      menuBarOpen: true,
      setMenuBarOpen: mockSetMenuBarOpen,
    });
  });

  it("renders correctly when menu is open", () => {
    render(<MenuOverlay />);
    expect(screen.getByRole("navigation")).toHaveClass(
      "translate-x-0 opacity-100",
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders correctly when menu is closed", () => {
    (useInterfaceStore as unknown as jest.Mock).mockReturnValue({
      menuBarOpen: false,
      setMenuBarOpen: mockSetMenuBarOpen,
    });
    render(<MenuOverlay />);
    expect(screen.getByRole("navigation")).toHaveClass(
      "-translate-x-full opacity-0",
    );
  });

  it("closes menu when a link is clicked", () => {
    render(<MenuOverlay />);
    fireEvent.click(screen.getByText("Home"));
    expect(mockSetMenuBarOpen).toHaveBeenCalledWith(false);
  });

  it("renders donation button", () => {
    render(<MenuOverlay />);
    expect(
      screen.getByRole("button", { name: /donation/i }),
    ).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<MenuOverlay />);
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
  });
});

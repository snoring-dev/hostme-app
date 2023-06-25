/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { render } from "@testing-library/react";
import Avatar from "./Avatar";

// Mock next/image
jest.mock("next/image", () => {
  return (props: any) => <img {...props} />;
});

describe("Avatar", () => {
  test("renders avatar image", () => {
    const { container } = render(<Avatar src="https://i.pravatar.cc/300" />);
    const imageElement = container.querySelector("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "https://i.pravatar.cc/300");
    expect(imageElement).toHaveAttribute("alt", "user avatar");
  });

  test("renders default avatar image if src is undefined", () => {
    const { container } = render(<Avatar src={undefined} />);
    const imageElement = container.querySelector("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/mjemmoudi/image/upload/v1686768538/avatar-g01c9b1e39_1280_qtppuw.png"
    );
    expect(imageElement).toHaveAttribute("alt", "user avatar");
  });

  test("renders default avatar image if src is null", () => {
    const { container } = render(<Avatar src={null} />);
    const imageElement = container.querySelector("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/mjemmoudi/image/upload/v1686768538/avatar-g01c9b1e39_1280_qtppuw.png"
    );
    expect(imageElement).toHaveAttribute("alt", "user avatar");
  });
});

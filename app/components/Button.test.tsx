import { render, fireEvent } from "@testing-library/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Button from "./Button";

describe("Button", () => {
  test("renders button with label", () => {
    const label = "Click me";
    const { getByText } = render(<Button label={label} onClick={() => {}} />);
    const buttonElement = getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={onClickMock} />
    );
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("renders disabled button", () => {
    const { getByText } = render(
      <Button label="Disabled" disabled onClick={() => {}} />
    );
    const buttonElement = getByText("Disabled");
    expect(buttonElement).toBeDisabled();
  });

  test("renders button with icon", () => {
    const { getByText, container } = render(
      <Button label="Button with Icon" icon={RiArrowRightSLine} onClick={() => {}} />
    );
    const buttonElement = getByText("Button with Icon");
    expect(buttonElement).toBeInTheDocument();

    const iconElement = container.querySelector(".absolute.left-4.top-3");
    expect(iconElement).toBeInTheDocument();
  });

  test("renders outline button", () => {
    const { container } = render(
      <Button label="Outline Button" outline onClick={() => {}} />
    );
    const buttonElement = container.querySelector(".bg-white");
    expect(buttonElement).toBeInTheDocument();
  });
});

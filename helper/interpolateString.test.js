import { render } from "@testing-library/react";
import { interpolateString } from "./interpolateString";

describe("Test interpolateString function", () => {
  test("Return empty element if no text to be interpolated", () => {
    const text = "";
    const reference = {};
    const { container } = render(interpolateString(text, reference));

    expect(container.innerHTML).toHaveLength(0);
  });

  test("Return original text if no curly bracket in text", () => {
    const text = "Lorem ipsum dolorLink sit amet";
    const reference = {};

    const container = render(interpolateString(text, reference));
    expect(container.getByText(text).textContent).toEqual(text);
  });

  test("Return anchor element if there is keyword 'link' or 'url' (without link/url text)", () => {
    const text = "Lorem ipsum {dolorLink} sit amet";
    const reference = {
      dolorLink: "https://www.smartapes.sg/",
    };

    const container = render(interpolateString(text, reference));
    const element = container.getByRole("link");

    expect(element.textContent).toEqual("link");
    expect(element.href).toEqual(reference.dolorLink);
  });

  test("Return anchor element if there is keyword 'link' or 'url' (with link/url text)", () => {
    const text = "Lorem ipsum {dolorLink} sit amet";
    const reference = {
      dolorLink: "https://www.smartapes.sg/",
      dolorLinkText: "dolor",
    };

    const container = render(interpolateString(text, reference));
    const element = container.getByRole("link");

    expect(element.textContent).toEqual(reference.dolorLinkText);
    expect(element.href).toEqual(reference.dolorLink);
  });

  test("Return mailto anchor if there is keyword 'mail' or 'email'", () => {
    const text = "Lorem ipsum {dolorEmail} sit amet";
    const reference = {
      dolorEmail: "cs@smartapes.sg",
    };

    const container = render(interpolateString(text, reference));
    const element = container.getByText(reference.dolorEmail);

    expect(element.textContent).toEqual(reference.dolorEmail);
    expect(element.href).toEqual(`mailto:${reference.dolorEmail}`);
  });

  test("Return bold text if there is keyword 'bold' ", () => {
    const text = "Lorem ipsum {dolorBold} sit amet";
    const reference = {
      dolorBold: "dolor",
    };

    const container = render(interpolateString(text, reference));

    expect(
      container.getByText(reference.dolorBold).getElementsByTagName("strong")
    ).toBeTruthy();
  });

  test("Return italic text if there is keyword 'italic' ", () => {
    const text = "Lorem ipsum {dolorItalic} sit amet";
    const reference = {
      dolorItalic: "dolor",
    };

    const container = render(interpolateString(text, reference));

    expect(
      container.getByText(reference.dolorItalic).getElementsByTagName("i")
    ).toBeTruthy();
  });
});

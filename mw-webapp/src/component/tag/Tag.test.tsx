import {render, screen} from "@testing-library/react";
import {Tag, TagType} from "src/component/tag/Tag";

const tag = (
  <Tag
    tagName="react"
    type={TagType.PRIMARY_TAG}
  />);

describe("Tag component", () => {
  it("should render primary tag", () => {
    render(tag);
    const linkElement = screen.getByText(/react/i);
    expect(linkElement).toBeInTheDocument();
  });
});

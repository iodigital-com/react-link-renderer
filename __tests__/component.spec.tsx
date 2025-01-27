import * as React from "react";
import {LinkRenderer, LinkRendererProps, LinkRendererProvider} from "../src";
import {render, screen} from "@testing-library/react";

+test("LinkRenderer should render the default linkRenderer when no linkRenderer has been set", () => {
    const {container} = render(<LinkRenderer href='/test'>Test link</LinkRenderer>);

    const linkElement = screen.getByText('Test link');
    expect(linkElement.getAttribute('href')).toBe('/test');
    expect(linkElement.textContent).toBe('Test link');
    expect(container).toMatchInlineSnapshot(`
<div>
  <a
    href="/test"
  >
    Test link
  </a>
</div>
`);
});

const customLinkRenderer = ({href, children}: LinkRendererProps) => {
    return (
        <div className='this is a custom renderer'>
            <a href={href}>{children}</a>
        </div>
    )
}

test("LinkRenderer should render the custom linkRenderer when a linkRenderer has been provided", () => {
    const {container} = render(<LinkRendererProvider linkRenderer={customLinkRenderer}>
        <LinkRenderer href='/test'>Test link</LinkRenderer>
    </LinkRendererProvider>);

    const linkElement = screen.getByText('Test link');
    expect(linkElement.getAttribute('href')).toBe('/test');
    expect(linkElement.textContent).toBe('Test link');

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="this is a custom renderer"
  >
    <a
      href="/test"
    >
      Test link
    </a>
  </div>
</div>
`);
});
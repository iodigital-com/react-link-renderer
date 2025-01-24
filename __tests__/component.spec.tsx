import * as React from "react";
import { LinkRendererProvider, LinkRenderer, LinkRendererProps } from "../src";
import renderer from "react-test-renderer";

test("LinkRenderer should render the default linkRenderer when no linkRenderer has been set", () => {
  const component = renderer.create(
    <LinkRenderer href='/test'>Test link</LinkRenderer>
  );

  const testInstance = component.root;

  expect(testInstance.findByType(LinkRenderer).props.href).toBe("/test");
  expect(testInstance.findByType(LinkRenderer).props.children).toBe("Test link");

  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <a
      href="/test"
    >
      Test link
    </a>
  `);
});

const customLinkRenderer = ({ href, children }: LinkRendererProps) => {
  return (
    <div className='this is a custom renderer'>
      <a href={href}>{children}</a>
    </div>
  )
}

test("LinkRenderer should render the custom linkRenderer when a linkRenderer has been provided", () => {
  const component = renderer.create(
    <LinkRendererProvider linkRenderer={customLinkRenderer}>
      <LinkRenderer href='/test'>Test link</LinkRenderer>
    </LinkRendererProvider>
  );

  const testInstance = component.root;

  expect(testInstance.findByType(LinkRenderer).props.href).toBe("/test");
  expect(testInstance.findByType(LinkRenderer).props.children).toBe("Test link");

  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
      <div
        className="this is a custom renderer"
      >
        <a
          href="/test"
        >
          Test link
        </a>
      </div>
  `);
});
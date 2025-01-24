# react-link-renderer
This package will enable you to render a custom link component within a component library for example.

## Install

```sh
yarn add @weprovide/react-link-renderer
```

## Example usage using a custom link renderer (for example using next/link)

```jsx
import {LinkRenderer, LinkRendererProvider, LinkRendererProps} from '@weprovide/react-link-renderer';
import Link from "next/link";

const nextLinkRenderer = ({ href, extraOptions, children }: LinkRendererProps) => {
    return (
        <Link href={href} {...extraOptions}>
            <a>{children}</a>
        </Link>
    );
}
```

Surround your main app with a LinkRendererProvider
```jsx
<LinkRendererProvider linkRenderer={nextLinkRenderer}>
    <App />
</LinkRendererProvider>
```

Now you can use the LinkRenderer component inside your component library to render a link
```jsx
<LinkRenderer 
    href="/page-1" 
    extraOptions={{
        prefetch: false, // You can add any option you want and use it in your custom link renderer
    }}
>
    Go to page 1
</LinkRenderer>
```
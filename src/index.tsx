import React from "react";

type LinkRendererType = (props: LinkRendererProps) => React.ReactElement

interface LinkContextType {
    linkRenderer?: LinkRendererType
}

interface LinkRendererProviderProps {
    linkRenderer: LinkRendererType,
    children: React.PropsWithChildren<React.ReactNode | React.ReactElement>
}

export interface LinkRendererProps {
    children: React.PropsWithChildren<React.ReactNode | React.ReactElement>,
    href: string,
    target?: string,
    rel?: string,
    title?: string,
    extraOptions?: object
}

const LinkRendererContext = React.createContext<LinkContextType>({});

const LinkRendererProvider = ({ linkRenderer: LinkRendererType, children }: LinkRendererProviderProps) => {
    return (
        <LinkRendererContext.Provider value={{ linkRenderer: LinkRendererType ?? null }}>
            {children}
        </LinkRendererContext.Provider>
    );
};

const DefaultLinkRenderer = (props: LinkRendererProps) => <a {...props} />

const Link = (props: LinkRendererProps) => {
    const { linkRenderer } = React.useContext(LinkRendererContext);
    const LinkComponent = linkRenderer ?? DefaultLinkRenderer;
    return (<LinkComponent {...props} />)
}

export {
    Link as LinkRenderer,
    LinkRendererProvider
}
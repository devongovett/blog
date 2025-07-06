import type { PageProps } from '@parcel/rsc';
import { cloneElement, type ReactNode } from 'react';
import '../page.css';
// import '../client';
// @ts-ignore
import avatar from 'url:../avatar.jpg';
import treeSitter from 'tree-sitter-highlight';

interface LayoutProps extends PageProps {
  children: ReactNode
}

export default function Layout({children, pages, currentPage}: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{currentPage.tableOfContents?.[0].title}</title>
        <meta name="description" content={currentPage?.exports?.description} />
        <meta property="og:title" content={currentPage.tableOfContents?.[0].title} />
        <meta property="og:description" content={currentPage?.exports?.description} />
        <meta property="og:url" content={`https://devongovett.me${currentPage.url}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@devongovett" />
      </head>
      <body>
        <header>
          <img src={avatar} className="avatar" alt="" />
          <a href="/index.html">Devon's Blog</a>
        </header>
        <main>
          <article>
            {cloneElement(children as any, {
              components: {
                h1: (props: any) => (
                  <>
                    <h1 {...props} />
                    <time dateTime={currentPage.exports?.date}>{new Date(currentPage.exports?.date + 'T00:00').toLocaleDateString()}</time>
                  </>
                ),
                CodeBlock: (props: any) => (
                  <pre {...props}>
                    <code dangerouslySetInnerHTML={{__html: treeSitter.highlight(props.children, treeSitter.Language[props.lang?.toUpperCase() || 'JS'])}} />
                  </pre>
                )
              }
            })}
          </article>
        </main>
      </body>
    </html>
  );
}

import type { PageProps } from '@parcel/rsc';
import { Nav } from '../components/Nav';
import '../page.css';
// import '../client';
// @ts-ignore
import avatar from 'url:../avatar.jpg';

export default function Index({pages, currentPage}: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Devon's Blog</title>
        <link rel="alternate" type="application/rss+xml" title="Devon's Blog RSS Feed" href="/feed.xml" />
      </head>
      <body>
        <header>
          <img src={avatar} className="avatar" />
          <h1>Devon's Blog</h1>
        </header>
        <Nav pages={pages} currentPage={currentPage} />
      </body>
    </html>
  );
}

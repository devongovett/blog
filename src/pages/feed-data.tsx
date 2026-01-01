import type { PageProps } from '@parcel/rsc';

/**
 * RSC-native feed data page
 * 
 * This server component outputs blog metadata as JSON, leveraging Parcel's
 * built-in page metadata extraction (the same `pages` prop used by Nav.tsx).
 * 
 * The RSS generator script reads this pre-extracted data instead of
 * manually parsing MDX files, ensuring a single source of truth for metadata.
 */

interface BlogPost {
  url: string;
  title: string;
  description: string;
  date: string;
  slug: string;
}

export default function FeedData({ pages }: PageProps) {
  // Filter and transform blog posts using Parcel's pre-extracted metadata
  const blogPosts: BlogPost[] = pages
    .filter(p => p.url.startsWith('/blog'))
    .filter(p => p.exports?.date) // Only include posts with dates
    .map(page => ({
      url: page.url,
      title: page.tableOfContents?.[0]?.title ?? page.name,
      description: page.exports?.description ?? '',
      date: page.exports?.date ?? '',
      slug: page.url.replace(/^\/blog\//, '').replace(/\.html$/, ''),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const feedData = JSON.stringify(blogPosts, null, 2);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Feed Data</title>
      </head>
      <body>
        {/* 
          JSON data embedded in a script tag for easy extraction.
          The RSS generator reads this instead of parsing MDX files.
        */}
        <script
          id="feed-data"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: feedData }}
        />
      </body>
    </html>
  );
}

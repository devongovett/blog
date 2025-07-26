import type { PageProps } from "@parcel/rsc";
import './Nav.css';

export function Nav({pages, currentPage}: PageProps) {
  return (
    <nav>
      <ul>
        {pages.filter(p => p.url.startsWith('/blog')).sort((a, b) => b.exports!.date.localeCompare(a.exports!.date)).map(page => (
          <li key={page.url}>
            <h2><a href={page.url} aria-current={page.url === currentPage.url ? 'page' : undefined}>
              {page.exports?.title ?? page.tableOfContents?.[0].title ?? page.name}
            </a></h2>
            <time dateTime={page.exports?.date}>{new Date(page.exports?.date + 'T00:00').toLocaleDateString()}</time>
            <p>{page.exports?.description}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import React from "react";

type FeedItem = {
  guid: string;
  link: string;
  description: string;
  pubDate: string;
  media: {
    url: string;
    medium: string;
    description?: string;
  }[];
};

function getText(parent: Element, selector: string) {
  return parent.querySelector(selector)?.textContent ?? "";
}

function parseFeed(xml: string): FeedItem[] {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, "application/xml");
  const parserError = document.querySelector("parsererror");
  if (parserError) {
    throw new Error("Failed to parse Mastodon RSS feed");
  }

  return Array.from(document.querySelectorAll("item")).map((item) => ({
    guid: getText(item, "guid"),
    link: getText(item, "link"),
    description: getText(item, "description"),
    pubDate: getText(item, "pubDate"),
    media: Array.from(item.getElementsByTagName("media:content")).map((media) => ({
      url: media.getAttribute("url") ?? "",
      medium: media.getAttribute("medium") ?? "",
      description: media.getElementsByTagName("media:description")[0]?.textContent ?? undefined
    })).filter((media) => media.url)
  }));
}

export default function Feed() {
  const [items, setItems] = React.useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    async function fetchFeed() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetch("https://mastodon.online/@csiew.rss", {
          signal: abortController.signal
        });
        if (!result.ok) throw new Error(result.statusText);
        const feed = parseFeed(await result.text());
        setItems(feed);
      } catch (err) {
        if (abortController.signal.aborted) return;
        console.error(err);
        setError("Failed to load feed. Try reloading this page.");
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchFeed();

    return () => abortController.abort();
  }, []);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="feed-posts-list">
      <ul>
        {items.map((item) => (
          <li key={item.guid || item.link}>
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
            {!!item.media.length && (
              <div className="carousel">
                {item.media
                  .filter((media) => media.medium === "image")
                  .map((media) => (
                    <div key={media.url} className="image-group">
                      <a href={media.url}>
                        <img
                          src={media.url}
                          alt={media.description ?? ""}
                          title={media.description ?? ""}
                        />
                      </a>
                      {media.description && <span>{media.description}</span>}
                    </div>
                  ))}
              </div>
            )}
            <div>
              <sub className="timestamp">
                <a href={item.link}>{new Date(item.pubDate).toLocaleDateString()}</a>
              </sub>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

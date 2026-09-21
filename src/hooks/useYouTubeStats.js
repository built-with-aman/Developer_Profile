import { useEffect, useState } from "react";

const CACHE_KEY = "yt-stats-cache";
const CACHE_TTL = 10 * 60 * 1000;

export function useYouTubeStats() {
  const [stats, setStats] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState(!stats);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stats) return;

    const proxyUrl = import.meta.env.VITE_YT_PROXY_URL;
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

    let url = null;
    if (proxyUrl) {
      url = proxyUrl;
    } else if (apiKey && channelId) {
      url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    }

    if (!url) {
      setError("missing-config");
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        const raw = json?.items?.[0]?.statistics;
        const data = raw
          ? {
              subscribers: parseInt(raw.subscriberCount || "0", 10),
              views: parseInt(raw.viewCount || "0", 10),
              videos: parseInt(raw.videoCount || "0", 10),
            }
          : json?.subscribers != null
            ? json
            : null;

        if (!data) throw new Error("no-data");

        setStats(data);
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, ts: Date.now() })
          );
        } catch {}
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || "fetch-failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [stats]);

  return { stats, loading, error };
}
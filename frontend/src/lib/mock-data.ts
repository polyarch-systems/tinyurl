export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  status: "active" | "expired" | "disabled";
}

export interface Visit {
  date: string;
  visits: number;
}

export interface TopLink {
  id: string;
  url: string;
  shortUrl: string;
  clicks: number;
}

export interface RecentVisitor {
  country: string;
  city: string;
  device: string;
  browser: string;
  time: string;
}

export const mockLinks: Link[] = [
  {
    id: "1",
    originalUrl: "https://example.com/very-long-page-name-that-goes-on-and-on",
    shortUrl: "tiny.url/abc123",
    clicks: 1247,
    createdAt: "2026-06-15",
    status: "active",
  },
  {
    id: "2",
    originalUrl: "https://docs.example.com/getting-started/installation",
    shortUrl: "tiny.url/def456",
    clicks: 892,
    createdAt: "2026-06-18",
    status: "active",
  },
  {
    id: "3",
    originalUrl: "https://blog.example.com/posts/why-url-shortening-matters",
    shortUrl: "tiny.url/ghi789",
    clicks: 2103,
    createdAt: "2026-06-20",
    status: "active",
  },
  {
    id: "4",
    originalUrl: "https://shop.example.com/products/limited-edition-item",
    shortUrl: "tiny.url/jkl012",
    clicks: 456,
    createdAt: "2026-06-22",
    status: "active",
  },
  {
    id: "5",
    originalUrl: "https://landing.example.com/campaign/summer-2026",
    shortUrl: "tiny.url/mno345",
    clicks: 3102,
    createdAt: "2026-06-25",
    status: "active",
  },
  {
    id: "6",
    originalUrl: "https://newsletter.example.com/edition/july-2026",
    shortUrl: "tiny.url/pqr678",
    clicks: 678,
    createdAt: "2026-07-01",
    status: "active",
  },
  {
    id: "7",
    originalUrl: "https://old-campaign.example.com/spring-sale",
    shortUrl: "tiny.url/stu901",
    clicks: 12309,
    createdAt: "2026-03-10",
    status: "expired",
  },
  {
    id: "8",
    originalUrl: "https://temporary.example.com/temp-link",
    shortUrl: "tiny.url/vwx234",
    clicks: 89,
    createdAt: "2026-07-05",
    status: "disabled",
  },
];

export const visitsOverTime: Visit[] = [
  { date: "Jul 7", visits: 1240 },
  { date: "Jul 8", visits: 1890 },
  { date: "Jul 9", visits: 1560 },
  { date: "Jul 10", visits: 2100 },
  { date: "Jul 11", visits: 1780 },
  { date: "Jul 12", visits: 2450 },
  { date: "Jul 13", visits: 1980 },
];

export const topLinks: TopLink[] = [
  {
    id: "1",
    url: "landing.example.com/campaign/summer-2026",
    shortUrl: "tiny.url/mno345",
    clicks: 3102,
  },
  {
    id: "2",
    url: "blog.example.com/posts/why-url-shortening-matters",
    shortUrl: "tiny.url/ghi789",
    clicks: 2103,
  },
  {
    id: "3",
    url: "example.com/very-long-page-name-that-goes-on-and-on",
    shortUrl: "tiny.url/abc123",
    clicks: 1247,
  },
  {
    id: "4",
    url: "docs.example.com/getting-started/installation",
    shortUrl: "tiny.url/def456",
    clicks: 892,
  },
  {
    id: "5",
    url: "newsletter.example.com/edition/july-2026",
    shortUrl: "tiny.url/pqr678",
    clicks: 678,
  },
];

export const recentVisitors: RecentVisitor[] = [
  { country: "US", city: "San Francisco", device: "Desktop", browser: "Chrome", time: "2 min ago" },
  { country: "DE", city: "Berlin", device: "Mobile", browser: "Safari", time: "5 min ago" },
  { country: "JP", city: "Tokyo", device: "Desktop", browser: "Chrome", time: "8 min ago" },
  { country: "GB", city: "London", device: "Mobile", browser: "Firefox", time: "12 min ago" },
  { country: "CA", city: "Toronto", device: "Desktop", browser: "Edge", time: "15 min ago" },
  { country: "AU", city: "Sydney", device: "Mobile", browser: "Chrome", time: "22 min ago" },
  { country: "FR", city: "Paris", device: "Desktop", browser: "Safari", time: "28 min ago" },
];

export const ctrStats = {
  average: 4.8,
  best: 12.3,
  change: "+0.6",
};

export const accountInfo = {
  plan: "Pro",
  email: "user@tinyurl.com",
  joined: "January 2026",
  linksUsed: 1247,
  linkLimit: 50000,
  teamMembers: 3,
};
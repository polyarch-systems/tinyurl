import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed plans
  const plans = await Promise.all([
    prisma.plan.upsert({
      where: { name: "Free" },
      update: {},
      create: {
        name: "Free",
        description: "Perfect for getting started with link shortening.",
        priceMonthlyCents: 0,
        priceAnnuallyCents: 0,
        linkLimit: 1000,
        features: ["1,000 links per month", "Basic click analytics", "Standard short links", "24-hour link history", "Community support"],
        isPopular: false,
      },
    }),
    prisma.plan.upsert({
      where: { name: "Pro" },
      update: {},
      create: {
        name: "Pro",
        description: "For professionals and small teams who need more power.",
        priceMonthlyCents: 2900,
        priceAnnuallyCents: 2400,
        linkLimit: 50000,
        features: ["50,000 links per month", "Advanced analytics & insights", "Custom branded domains", "Link expiration & passwords", "API access (5,000 req/hr)", "Priority email support"],
        isPopular: true,
      },
    }),
    prisma.plan.upsert({
      where: { name: "Business" },
      update: {},
      create: {
        name: "Business",
        description: "For growing teams that need enterprise-level control.",
        priceMonthlyCents: 9900,
        priceAnnuallyCents: 7900,
        linkLimit: 999999999,
        features: ["Unlimited links", "Real-time analytics dashboard", "Multiple custom domains", "Team collaboration & roles", "API access (50,000 req/hr)", "SSO & SAML", "Dedicated account manager", "99.99% SLA guarantee"],
        isPopular: false,
      },
    }),
  ]);

  console.log("Plans seeded:", plans.map(p => p.name));

  // Seed demo user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@tinyurl.com" },
    update: {},
    create: {
      email: "demo@tinyurl.com",
      name: "Demo User",
      passwordHash,
      planId: plans[1].id, // Pro plan
      linksUsed: 1247,
      linkLimit: 50000,
      teamMembers: 3,
    },
  });

  console.log("Demo user seeded:", user.email);

  // Seed demo links
  const demoLinks = [
    { originalUrl: "https://example.com/very-long-page-name-that-goes-on-and-on", shortCode: "abc123", clicks: 1247, status: "active" as const },
    { originalUrl: "https://docs.example.com/getting-started/installation", shortCode: "def456", clicks: 892, status: "active" as const },
    { originalUrl: "https://blog.example.com/posts/why-url-shortening-matters", shortCode: "ghi789", clicks: 2103, status: "active" as const },
    { originalUrl: "https://shop.example.com/products/limited-edition-item", shortCode: "jkl012", clicks: 456, status: "active" as const },
    { originalUrl: "https://landing.example.com/campaign/summer-2026", shortCode: "mno345", clicks: 3102, status: "active" as const },
    { originalUrl: "https://newsletter.example.com/edition/july-2026", shortCode: "pqr678", clicks: 678, status: "active" as const },
    { originalUrl: "https://old-campaign.example.com/spring-sale", shortCode: "stu901", clicks: 12309, status: "expired" as const },
    { originalUrl: "https://temporary.example.com/temp-link", shortCode: "vwx234", clicks: 89, status: "disabled" as const },
  ];

  for (const linkData of demoLinks) {
    await prisma.link.upsert({
      where: { shortCode: linkData.shortCode },
      update: {},
      create: {
        ...linkData,
        userId: user.id,
      },
    });
  }

  console.log("Demo links seeded:", demoLinks.length);

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
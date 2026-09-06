import { Armchair, BedDouble, Coffee, Home, Leaf, Package, Trees, Wifi, Zap } from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";
import dbConnect from "../lib/dbConnect.js";
import { Page } from "../lib/models/index.js";
import { getDefaultStayContent, normalizeStayContent } from "../lib/stay-content.js";

export const metadata = {
  title: "Best Cottages near Shirdi | The Native Place",
  description:
    "Book the best cottages near Shirdi at The Native Place and enjoy cozy rooms, peaceful greenery, garden views and a relaxing nature stay.",
  keywords: [
    "best cottages near shirdi",
    "cottages near shirdi temple",
    "family cottages near shirdi",
    "nature cottages near shirdi",
    "private cottages near shirdi",
    "cottages with swimming pool near shirdi",
  ],
  alternates: {
    canonical: "/cottages",
  },
  openGraph: {
    type: "website",
    url: "/cottages",
    siteName: "The Native Place",
    title: "Best Cottages near Shirdi | The Native Place",
    description:
      "Book the best cottages near Shirdi at The Native Place and enjoy cozy rooms, peaceful greenery, garden views and a relaxing nature stay.",
    images: [
      {
        url: "/images/banners/villas.jpeg",
        alt: "Best cottages near Shirdi at The Native Place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Cottages near Shirdi | The Native Place",
    description:
      "Book the best cottages near Shirdi at The Native Place and enjoy cozy rooms, peaceful greenery, garden views and a relaxing nature stay.",
    images: ["/images/banners/villas.jpeg"],
  },
};

export const dynamic = "force-dynamic";

const cottageAmenities = [
  { icon: Armchair, label: "Cozy Sit-out" },
  { icon: Trees, label: "Green Surroundings" },
  { icon: Leaf, label: "Nature Feel" },
  { icon: Wifi, label: "Wi-Fi Access" },
  { icon: Coffee, label: "Tea / Coffee Maker" },
  { icon: BedDouble, label: "Comfortable Rooms" },
  { icon: Package, label: "Mini Fridge" },
  { icon: Package, label: "Compact Storage" },
  { icon: Zap, label: "Power Backup" },
  { icon: Home, label: "Housekeeping" },
];

const cottageHighlights = [
  { icon: Armchair, label: "Cozy Sit-out" },
  { icon: Trees, label: "Garden Views" },
  { icon: Leaf, label: "Nature Feel" },
];

async function getCottagesPageContent() {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug: "cottages" }).lean();

    return normalizeStayContent("cottages", page?.content || getDefaultStayContent("cottages"));
  } catch (_error) {
    return getDefaultStayContent("cottages");
  }
}

export default async function CottagesPage() {
  const stayContent = await getCottagesPageContent();

  return (
    <StayDetailPage
      stayLabel="All Cottages"
      stayTitle="Cottages"
      bannerTitle="Cottages"
      bannerDescription="Cozy stays surrounded by greenery, calm spaces, and a slower pace of living."
      bannerImage={stayContent.bannerImage}
      heroImage={stayContent.heroImages?.[0] || stayContent.bannerImage}
      heroThumbs={stayContent.heroImages}
      introImage={stayContent.introImage}
      galleryImages={stayContent.galleryImages}
      amenities={cottageAmenities}
      highlights={cottageHighlights}
      amenityEyebrow="Cottage Amenities"
      amenityTitle="Comfort. Calm. Every Detail."
      amenityDescription="Thoughtfully curated amenities to make your cottage stay relaxing, comfortable and truly memorable."
    />
  );
}

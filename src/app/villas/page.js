import {
  Armchair,
  BedDouble,
  Coffee,
  Home,
  Leaf,
  Package,
  Trees,
  Wifi,
  Zap,
} from "lucide-react";
import StayDetailPage from "../components/StayDetailPage.jsx";
import dbConnect from "../lib/dbConnect.js";
import { Page } from "../lib/models/index.js";
import { getDefaultStayContent, normalizeStayContent } from "../lib/stay-content.js";

export const metadata = {
  title: "Best Villas near Shirdi | The Native Place",
  description:
    "Stay in the best villas near Shirdi at The Native Place, with spacious 2 BHK villas, private sit-outs, garden views and peaceful nature surroundings.",
  keywords: [
    "best villas near shirdi",
    "best villas near shirdi temple",
    "best villas near shirdi water park",
    "pool villas near shirdi",
    "2 BHK villas near shirdi",
    "private villas near shirdi",
    "family villas near shirdi",
  ],
  alternates: {
    canonical: "/villas",
  },
  openGraph: {
    type: "website",
    url: "/villas",
    siteName: "The Native Place",
    title: "Best Villas near Shirdi | The Native Place",
    description:
      "Stay in the best villas near Shirdi at The Native Place, with spacious 2 BHK villas, private sit-outs, garden views and peaceful nature surroundings.",
    images: [
      {
        url: "/images/banners/villas.jpeg",
        alt: "Best villas near Shirdi at The Native Place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Villas near Shirdi | The Native Place",
    description:
      "Stay in the best villas near Shirdi at The Native Place, with spacious 2 BHK villas, private sit-outs, garden views and peaceful nature surroundings.",
    images: ["/images/banners/villas.jpeg"],
  },
};

export const dynamic = "force-dynamic";

const villaAmenities = [
  { icon: Armchair, label: "Cozy Sit-out" },
  { icon: Trees, label: "Green Surroundings" },
  { icon: Leaf, label: "Nature Feel" },
  { icon: Wifi, label: "Wi-Fi Access" },
  { icon: Coffee, label: "Tea / Coffee Maker" },
  { icon: BedDouble, label: "Wardrobe Space" },
  { icon: Package, label: "Mini Fridge" },
  { icon: Package, label: "Compact Storage" },
  { icon: Zap, label: "Power Backup" },
  { icon: Home, label: "Housekeeping" },
];

const villaHighlights = [
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Armchair, label: "Private Sit-out" },
  { icon: Trees, label: "Garden Views" },
];

async function getVillasPageContent() {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug: "villas" }).lean();

    return normalizeStayContent("villas", page?.content || getDefaultStayContent("villas"));
  } catch (_error) {
    return getDefaultStayContent("villas");
  }
}

export default async function VillasPage() {
  const stayContent = await getVillasPageContent();

  return (
    <StayDetailPage
      stayLabel="All Villas"
      stayTitle="2 BHK Villas"
      bannerTitle="2 BHK Villas"
      bannerDescription="Spacious villas designed for relaxed family stays, private gatherings, and peaceful weekends."
      bannerImage={stayContent.bannerImage}
      heroImage={stayContent.heroImages?.[0] || stayContent.bannerImage}
      heroThumbs={stayContent.heroImages}
      introImage={stayContent.introImage}
      galleryImages={stayContent.galleryImages}
      amenities={villaAmenities}
      highlights={villaHighlights}
      amenityEyebrow="Villa Amenities"
      amenityTitle="Comfort. Nature. Every Detail."
      amenityDescription="Thoughtfully curated amenities to make your villa stay relaxing, comfortable and truly memorable."
    />
  );
}

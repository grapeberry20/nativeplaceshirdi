import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import FacilitiesSection from "./components/FacilitiesSection";
import ExperienceSection from "./components/ExperienceSection";
import ResortFacilities from "./components/ResortFacilities";
import WhyChooseSection from "./components/WhyChooseSection";
import BookingSection from "./components/BookingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import IntroSection from "./components/IntroSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import VillasCottages from "./components/VillasCottages";

export const metadata = {
  title: {
    absolute: "Best Resort near shirdi | The native place",
  },
  description:
    "Discover the best resort near Shirdi at The Native Place, a peaceful nature resort with comfortable villas, cottages, swimming pool and memorable stays.",
  keywords: [
    "best resort near shirdi",
    "best nature resort near shirdi",
    "best veg and non veg resort near shirdi",
    "the native place shirdi",
    "the native place",
    "pet friendly resort near shirdi",
    "family friendly resort near shirdi",
    "couple friendly resort near shirdi",
    "best villas near shirdi",
    "best cottages near shirdi",
    "resort with swimming pool near shirdi",
    "nature stay near shirdi",
    "luxury resort near shirdi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "The Native Place",
    title: "Best Resort near shirdi | The native place",
    description:
      "Discover the best resort near Shirdi at The Native Place, a peaceful nature resort with comfortable villas, cottages, swimming pool and memorable stays.",
    images: [
      {
        url: "/images/banners/newbanner.jpeg",
        alt: "The Native Place resort near Shirdi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Resort near shirdi | The native place",
    description:
      "Discover the best resort near Shirdi at The Native Place, a peaceful nature resort with comfortable villas, cottages, swimming pool and memorable stays.",
    images: ["/images/banners/newbanner.jpeg"],
  },
};

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <BannerCarousel />
      <IntroSection />
      <VillasCottages />
      <FacilitiesSection />
      <ExperienceSection />
      <ResortFacilities />
      <WhyChooseSection />
      <BookingSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}

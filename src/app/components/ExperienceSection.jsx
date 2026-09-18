"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import {
  Coffee,
  Mountain,
  Sparkles,
  Users,
} from "lucide-react";

const experienceFeatures = [
  { icon: Mountain, label: "Expansive Greenery" },
  { icon: Sparkles, label: "Peaceful Ambience" },
  { icon: Coffee, label: "Nature & Comfort" },
  { icon: Users, label: "Memorable Moments" },
];

function FeaturePill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.3rem] bg-white/72 px-3.5 py-3.5 shadow-[0_10px_30px_rgba(31,46,26,0.06)] backdrop-blur-sm sm:rounded-[1.5rem] sm:px-4 sm:py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f1e3] text-[#768f54] sm:h-11 sm:w-11">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
      </span>
      <span className="text-[14px] leading-6 text-[#48554d] sm:text-[15px]">{label}</span>
    </div>
  );
}

export default function ExperienceSection() {
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#fbf8ef] px-4 py-12 sm:px-6 sm:py-16 lg:px-0 lg:py-0">
      <div className="mx-auto grid min-h-screen max-w-[1600px] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
        <div
          className="relative z-10 flex flex-col justify-center px-2 py-6 sm:px-6 lg:px-16 xl:px-20"
          data-aos={isMobile ? undefined : "fade-right"}
        >
          <div className="max-w-[650px]">
            <div className="flex items-center gap-4 text-[#6b8444]">
              <span className="h-px w-10 bg-[#d9d2c4]" />
              <span className="font-subheading text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[12px] sm:tracking-[0.35em]">
                Resort Experience
              </span>
              <span className="h-px w-10 bg-[#d9d2c4]" />
            </div>

            <h2 className="mt-5 font-heading text-[clamp(2.2rem,7vw,4.4rem)] leading-[1.02] text-[#20342b] sm:mt-6 sm:text-6xl lg:text-[4.4rem]">
              More Than a Stay.
              <br />
              It&apos;s an Experience.
            </h2>

            <div className="mt-5 h-px w-14 bg-[#d9d2c4]" />

            <p className="mt-5 max-w-[470px] text-[14px] leading-7 text-[#5b655d] sm:text-[17px] sm:leading-8">
              Tucked away in nature&apos;s embrace, The Native Place Shirdi offers a refreshing
              escape from the everyday. Wake up to birdsong, breathe in the fresh air, and
              unwind in the lap of nature.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {experienceFeatures.map((feature) => (
                <FeaturePill key={feature.label} icon={feature.icon} label={feature.label} />
              ))}
            </div>

            <p className="mt-8 text-sm text-[#5b655d] sm:mt-10">
              A glimpse of serenity and unforgettable moments
            </p>
          </div>
        </div>

        <div
          className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-screen"
          data-aos={isMobile ? undefined : "fade-left"}
        >
          <Image
            src="/images/amenities/pool2.jpeg"
            alt="Resort experience"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
            priority={false}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,239,0.98)_0%,rgba(251,248,239,0.88)_14%,rgba(251,248,239,0.5)_28%,rgba(251,248,239,0.12)_48%,rgba(251,248,239,0)_62%)]" />


        </div>
      </div>



    </section>
  );
}

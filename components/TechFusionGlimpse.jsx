"use client";
// import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/custom/apple-cards-carousel";
import { cn } from "@/lib/utils";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

const TechFusionGlimpse = ({ renderPlace, photos, sponsors }) => {
  const cards = photos.map((card, index) => (
    <Card
      key={card.src}
      card={card}
      isRedirect={true}
      redirectPath={"/glimpse-tf-24"}
      index={index}
    />
  ));

  return (
    <div className="techfusion-glimpse">
      <h2
        className={cn(
          `flex justify-center text-5xl text-center leading-normal mb-6 animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
        )}
      >
        TechFusion&apos;24 Highlights
      </h2>

      <div className="photos-section mb-12">
        {renderPlace === "home" ? (
          <Carousel items={cards} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className=" m-2 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <Card
                  key={photo.src}
                  card={photo}
                  index={index}
                  isRedirect={false}
                  className="overflow-hidden"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sponsors Section */}
      <div className="sponsors-section">
        <h3
          className={cn(
            `flex justify-center text-4xl text-center leading-normal mb-12 animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          TechFusion&apos;24 Sponsors
        </h3>
        <div className="my-10">
          <Marquee
            className="gap-[3rem] [--duration:5s]"
            innerClassName="gap-[3rem] [--gap:3rem]"
            fade={true}
            pauseOnHover={true}
          >
            {sponsors.map((sponsor, index) => (
              <div key={index} className="p-2">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-24 mx-auto"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TechFusionGlimpse;

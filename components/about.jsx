import React from "react";
import { NeonGradientCard } from "./ui/neon-gradient-card";

const About = () => {
  return (
    <div id="aboutus" className="w-11/12 my-10 mx-auto">
      <NeonGradientCard>
        <h2 className="text-5xl mb-10">About Us</h2>
        <section className="grid gap-5 lg:grid-cols-2 grid-cols-1">
          <div className="text-justify text-lg">
            <p className="md:hidden lg:hidden">
              TechFusion&apos;25, Katihar Engineering College&apos;s flagship
              event from January 09th to 12th, 2025, offers an enthralling mix
              of cutting-edge technology, competitions, workshops, and cultural
              festivities.
              <br />
              <br />
              The initial three days showcase technical competitions, workshops,
              and lectures, drawing 2,000+ participants from various engineering
              and technical institutes. It&apos;s a hub of innovation and
              creativity.
              <br />
              <br />
              The concluding day features vibrant cultural events, uniting
              students in art, music, and traditions. It&apos;s an invitation to
              explore the realms of innovation, technology, and culture.
              <br />
              <br />
              Join us at Katihar Engineering College for TechFusion&apos;25, a
              four-day extravaganza blending brilliance, innovation, and
              cultural vibrancy!
            </p>
            <p className="hidden md:block lg:block">
              TechFusion&apos;25, Katihar Engineering College&apos;s flagship
              event from January 09th to 12th, 2025, promises an immersive
              experience merging cutting-edge technology, intense competitions,
              enriching workshops, invigorating cultural events, and
              thought-provoking guest lectures. The initial three days spotlight
              technical competitions, exhibitions, hands-on workshops, and
              captivating guest lectures.
              <br />
              <br />
              Drawing over 2,000+ participants from engineering and technical
              institutes statewide and beyond, these days cultivate an
              environment where innovation thrives, igniting collisions of minds
              and sparking creativity. Shifting seamlessly to cultural
              celebrations on the fourth day, TechFusion&apos;25 amplifies
              vibrant cultural events, embracing diversity and talent.
              <br />
              <br />
              Showcasing captivating performances and artistic displays, these
              cultural days serve as a spectacle uniting students in a jubilant
              celebration of art, music, and tradition. Embrace the excitement,
              ignite curiosity, and delve into an unforgettable journey
              exploring the intersections of innovation, technology, and
              culture.
              <br />
              <br />
              Join us at Katihar Engineering College for TechFusion&apos;25, a
              four-day extravaganza where brilliance converges with innovation
              and fervent cultural expression!
            </p>
          </div>
          <div className="">
            <img
              className="w-full rounded-lg h-750 object-cover"
              src="/aboutUs.jpg"
              alt="About Us"
            />
          </div>
        </section>
      </NeonGradientCard>
    </div>
  );
};

export default About;

import React from "react";

const About = () => {
  return (
    <section className="min-h-screen w-9/10 mx-auto flex flex-col md:flex-row lg:flex-row items-center mb-10git  pr-2 pl-2">
      <div className="w-full md:w-1/2 lg:w-1/2 text-white text-lg pr-4">
        <p className="mb-8 p-2 font-light pt-5 md:hidden lg:hidden">
          TechFusion&apos;25, Katihar Engineering College&apos;s flagship event
          from January 09th to 12th, 2025, offers an enthralling mix of
          cutting-edge technology, competitions, workshops, and cultural
          festivities.
          <br />
          <br />
          The initial three days showcase technical competitions, workshops, and
          lectures, drawing 2,000+ participants from various engineering and
          technical institutes. It&apos;s a hub of innovation and creativity.
          <br />
          <br />
          The concluding day features vibrant cultural events, uniting students
          in art, music, and traditions. It&apos;s an invitation to explore the
          realms of innovation, technology, and culture.
          <br />
          <br />
          Join us at Katihar Engineering College for TechFusion&apos;25, a
          four-day extravaganza blending brilliance, innovation, and cultural
          vibrancy!
        </p>
        <p className="mb-2 pl-2 text-left font-light pt-5 hidden md:block lg:block">
          TechFusion&apos;25, Katihar Engineering College&apos;s flagship event
          from January 09th to 12th, 2025, promises an immersive experience
          merging cutting-edge technology, intense competitions, enriching
          workshops, invigorating cultural events, and thought-provoking guest
          lectures. The initial three days spotlight technical competitions,
          exhibitions, hands-on workshops, and captivating guest lectures.
          Drawing over 2,000+ participants from engineering and technical
          institutes statewide and beyond, these days cultivate an environment
          where innovation thrives, igniting collisions of minds and sparking
          creativity. Shifting seamlessly to cultural celebrations on the fourth
          day, TechFusion&apos;25 amplifies vibrant cultural events, embracing
          diversity and talent. Showcasing captivating performances and artistic
          displays, these cultural days serve as a spectacle uniting students in
          a jubilant celebration of art, music, and tradition. Embrace the
          excitement, ignite curiosity, and delve into an unforgettable journey
          exploring the intersections of innovation, technology, and culture.
          Join us at Katihar Engineering College for TechFusion&apos;25, a
          four-day extravaganza where brilliance converges with innovation and
          fervent cultural expression!
        </p>
      </div>
      <div className=" w-full md:w-1/2 lg:w-1/2">
        <img
          className="w-full h-750 object-cover rounded-lg"
          src="/aboutUs.jpg"
          alt="About Us"
        />
      </div>
    </section>
  );
};

export default About;

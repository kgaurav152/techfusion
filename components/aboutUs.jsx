import React from "react";
import Link from "next/link";

function AboutUs({ clampAbout }) {
  return (
    <div className="flex min-h-screen bg-[#00040F]">
      <div className="flex-1 flex lg:flex-row flex-col justify-center items-center">
        <div className="mx-auto p-2 lg:px-8 bg-[#00040F]">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-gray-50 mb-2">About Us</h1>
            <br />
            {clampAbout ? (
              <>
                <p className="text-xl text-left text-gray-200 mb-5 line-clamp-5">
                  Welcome to the annual celebration of innovation and creativity
                  - The Technical cum Cultural Fest of Katihar Engineering
                  College, Katihar! <br />
                  TechFusion&apos;25 is the flagship event organized by the
                  ingenious minds at Katihar Engineering College, scheduled to
                  unfold over four captivating days from 10th to 13th January
                  2025. This year&apos;s TechFusion promises an exhilarating
                  amalgamation of cutting-edge technology, intense competitions,
                  enlightening workshops, invigorating cultural events, and
                  thought-provoking guest lectures. The first three days of
                  TechFusion&apos;25 will be dedicated to a spectrum of
                  technical competitions, exhibitions, hands-on workshops, and
                  riveting guest lectures, attracting over 2,000+ participants
                  from engineering and technical institutes across the state and
                  outside also. It&apos;s a melting pot of innovation, where
                  minds collide, ideas spark, and creativity flourishes.
                  Transitioning seamlessly from technology to culture, the final
                  and 4th day of TechFusion&apos;25 will transform the ambiance
                  with vibrant cultural events, fostering a celebration of
                  diversity and talent. From captivating performances to
                  artistic displays, these cultural days promise to be a
                  spectacle of talent, uniting students in a celebration of art,
                  music, and traditions. Embrace the excitement, fuel your
                  curiosity, and immerse yourself in an unforgettable journey
                  into the realms of innovation, technology, and culture. Join
                  us at Katihar Engineering College, Katihar for
                  TechFusion&apos;25 - a four-day extravaganza where brilliance
                  meets innovation and cultural fervor! Mark your calendars, for
                  this is where the future unfolds - TechFusion&apos;25, where
                  technology meets culture in a harmony of excellence!
                </p>
                <br />
                <div>
                  <Link
                    className="rounded-md btn btn-primary relative z-10"
                    href="/about-us"
                  >
                    View More
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-xl text-left text-gray-200 mb-5">
                Welcome to the annual celebration of innovation and creativity -
                The Technical cum Cultural Fest of Katihar Engineering College,
                Katihar! <br />
                TechFusion&apos;25 is the flagship event organized by the
                ingenious minds at Katihar Engineering College, scheduled to
                unfold over four captivating days from 10th to 13th January
                2025. This year&apos;s TechFusion promises an exhilarating
                amalgamation of cutting-edge technology, intense competitions,
                enlightening workshops, invigorating cultural events, and
                thought-provoking guest lectures. The first three days of
                TechFusion&apos;25 will be dedicated to a spectrum of technical
                competitions, exhibitions, hands-on workshops, and riveting
                guest lectures, attracting over 2,000+ participants from
                engineering and technical institutes across the state and
                outside also. It&apos;s a melting pot of innovation, where minds
                collide, ideas spark, and creativity flourishes. Transitioning
                seamlessly from technology to culture, the final and 4th day of
                TechFusion&apos;25 will transform the ambiance with vibrant
                cultural events, fostering a celebration of diversity and
                talent. From captivating performances to artistic displays,
                these cultural days promise to be a spectacle of talent, uniting
                students in a celebration of art, music, and traditions. Embrace
                the excitement, fuel your curiosity, and immerse yourself in an
                unforgettable journey into the realms of innovation, technology,
                and culture. Join us at Katihar Engineering College, Katihar for
                TechFusion&apos;25 - a four-day extravaganza where brilliance
                meets innovation and cultural fervor! Mark your calendars, for
                this is where the future unfolds - TechFusion&apos;25, where
                technology meets culture in a harmony of excellence!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#00040F]">
        <div className="mx-auto p-2 lg:px-4 bg-[#00040F]">
          <div className="flex justify-center items-center">
            <img
              src="/aboutUs.webp"
              alt="TechFusion'25 Hero Poster"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

import Image from "next/image";
import React from "react";

const Sponsors = () => {
  return (
    <section className="my-5">
      <div>
        <h2 className=" text-5xl mb-10">Sponsors</h2>
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl mt-2 mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Title Sponsor
          </h2>
          <Image
            src="/assets/sponsor/chicagoPizza.jpg"
            width={550}
            height={140}
            alt="Chicago Pizza Logo"
          />
        </div>
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl mt-2 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            The Ultimate Electronics Partner
          </h2>
          <Image
            src="/assets/sponsor/RelianceDigital.png"
            width={350}
            height={60}
            alt="Reliance Digital"
          />
        </div>
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl mt-2 mb-8 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Internship Partner
          </h2>
          <Image
            src="/assets/sponsor/internbee.jpg"
            width={350}
            height={60}
            alt="internbee"
          />
        </div>
        {/* <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl mt-2 mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Skill Partner
          </h2>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <Image
              src="/assets/sponsor/nds.jpg"
              width={250}
              height={40}
              alt="NDS"
            />
            <Image
              src="/assets/sponsor/skilldarpan.png"
              width={250}
              height={40}
              alt="Skill Darpan"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Food Partner
          </h2>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 sm:items-center">
            <Image
              src="/assets/sponsor/dominos.png"
              width={250}
              height={40}
              alt="Dominos"
            />
            <Image
              src="/assets/sponsor/thegardenkitchen.png"
              width={250}
              height={25}
              alt="The Garden Kitchen"
            />
            <Image
              src="/assets/sponsor/gameoffoods.jpg"
              width={250}
              height={40}
              alt="Game of Foods"
            />
          </div>
        </div> */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl mt-2 mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Eyewear Partner
          </h2>
          <Image
            src="/assets/sponsor/kalimandsons.jpg"
            width={250}
            height={40}
            alt="Kalim and Sons"
          />
        </div>
      </div>
    </section>
  );
};

export default Sponsors;

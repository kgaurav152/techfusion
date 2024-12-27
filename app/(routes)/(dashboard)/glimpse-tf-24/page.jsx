import React from "react";
import TechFusionGlimpse from "@/components/TechFusionGlimpse";
import { shuffleArray } from "@/lib/utils";
import { carouselData, sponsorData } from "@/public/constants";

export const GlimpsePage = () => {
  return (
    <div className="my-8">
      <TechFusionGlimpse
        renderPlace={"dedicated"}
        photos={shuffleArray(carouselData)}
        sponsors={sponsorData}
      />
    </div>
  );
};

export default GlimpsePage;

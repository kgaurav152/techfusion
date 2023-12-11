"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';


const LandingPage = () => {

  const router=useRouter();
  const handleClick = (e,path) => {
    e.preventDefault()
    router.push(path)
  };

  return (
    <div>
      <div className="text-white text-center min-h-[100vh] bg-[#00040F] relative" >
        <NavBar />
        {/* Provided Decorative Elements */}
        <div className="relative text-center">
          <div className="z-0">
            <div>
                <h1 className="font-bold text-[3rem]">Techfest 2023</h1>
                <p className="text-[1.5rem] mb-5">Tentative Date: 20-25 January 2024</p>
                  <Button variant="" type="button" className="bg-white text-[#00040F] font-bold pt-2 pb-2 pr-4 pl-4 rounded-lg" onClick={(e) => handleClick(e, "/register")}>
                  Register Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
            </div>
            <div className="bg-primary-radial-gradient sm:w-[130px] w-[80px] h-[80px] sm:h-[130px] rounded-full absolute top-[25%] left-[15%] lg:top-[25%] lg:left-[15%]"></div>
            <div className="bg-primary-radial-gradient sm:w-[130px] w-[80px] h-[80px] sm:h-[130px] rounded-full absolute top-[20%] left-[65%] lg:top-[15%] lg:left-[75%]"></div>
            <div className="bg-primary-radial-gradient w-[50px] h-[50px] sm:w-[90px] sm:h-[90px] rounded-full absolute top-[75%] left-[40%]"></div>
            <div className="bg-primary-radial-gradient w-[50px] h-[50px] sm:w-[90px] sm:h-[90px] rounded-full absolute top-[75%] left-[80%]"></div>
            <div className="bg-primary-radial-gradient w-[30px] h-[30px] sm:w-[42px] sm:h-[42px] rounded-full absolute top-[85%] left-[18%]"></div>
            <div className="bg-primary-radial-gradient w-[30px] h-[30px] sm:w-[42px] sm:h-[42px] rounded-full absolute top-[85%] left-[60%]"></div>
            <div className="blur-gradient w-[40%] h-[42%] rounded-full absolute top-[35%] left-[50%] translate-x-[-50%]"></div>
            
          </div>
        </div>
        {/* About Us Section */}
        <section style={{ marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>About Us</h2>
            {/* Brief Info */}
            <p>Insert your about us information here.</p>
          </div>
        </section>

        {/* Events Section */}
        <section style={{ marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Events</h2>
            {/* Brief Info of Events */}
            <div>
              {/* Event Cards/Posters */}
              {/* Example: */}
              {/* <EventCard title="Event 1" poster="poster1.jpg" /> */}
              {/* <EventCard title="Event 2" poster="poster2.jpg" /> */}
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section style={{ marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Sponsors</h2>
            {/* Sponsor Details */}
            <div>
              {/* Sponsor Logos */}
              {/* Example: */}
              {/* <SponsorLogo src="sponsor1.png" /> */}
              {/* <SponsorLogo src="sponsor2.png" /> */}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default LandingPage;

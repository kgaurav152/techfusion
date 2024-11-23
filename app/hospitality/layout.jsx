import HospitalityNavBar from "@/components/hospitalityNavbar";
import Footer from "@/components/footer";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="bg-[#00040F] relative">
        <HospitalityNavBar />
        <main className="w-11/12 min-h-screen mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;

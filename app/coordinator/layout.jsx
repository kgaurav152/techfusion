import CoordinatorNavBar from "@/components/coordinatorNavbar";
import Footer from "@/components/footer";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="bg-[#00040F] relative">
        <CoordinatorNavBar />
        <main className="w-11/12 min-h-screen mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;

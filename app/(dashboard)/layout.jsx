import NavBar from "@/components/navbar";
import Footer from '@/components/footer'; 
 

const DashboardLayout = ({ children }) => {

  return (      
    <div>
      <div className="min-h-[100vh] bg-[#00040F] relative" >
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;

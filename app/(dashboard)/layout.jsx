import NavBar from "@/components/navbar";
import Footer from '@/components/footer'; 
import BottomBar from "@/components/bottom-bar";
 

const DashboardLayout = ({ children }) => {

  return (      
    <div>
      <div className="min-h-[100vh] bg-[#00040F] relative" >
        <NavBar />
        {children}
        <Footer />
        <BottomBar/>
      </div>
    </div>
  );
};

export default DashboardLayout;

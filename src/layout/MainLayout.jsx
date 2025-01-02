import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";


const MainLayout = () => {

  return (
    <div>
       
        <Navbar/>
        <main>
          <Outlet/>  
        </main>
        
    </div>
  );
};

export default MainLayout;
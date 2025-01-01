import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";


const MainLayout = () => {

  return (
    <div>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <Navbar/>
        <main>
          <Outlet/>  
        </main>
        
    </div>
  );
};

export default MainLayout;
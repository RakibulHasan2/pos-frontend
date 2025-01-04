
import { Outlet} from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import useUser from '../Shared/getUser/GetUser';
import Login from "../Pages/Authentication/Login";
const MainLayout = () => {
  const user = useUser();

  return (
    <div>
      {user ? <div className="flex">
        <Navbar />
        <main className="border border-red-300 w-full ml-64">
          <Outlet />  
        </main>
      </div> : <><Login/></>}
    </div>
  );
};

export default MainLayout;

import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import NotFound from "../Shared/notFound/NotFound";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import AddProduct from "../Pages/AddProduct/AddProduct";
import AllProducts from "../Pages/AllProducts/AllProducts";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Pos from "../Pages/Sale/Pos";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element:<Home/>,
            },
            {
                path: '/',
                element:<Home/>,
            },
            {
                path: '/addProduct',
                element:<AddProduct/>,
            },
            {
                path: '/allProducts',
                element:<AllProducts/>,
            },
            {
                path: '/myProfile',
                element:<MyProfile/>,
            },
            {
                path: '/pos',
                element:<Pos/>,
            },
            {
                path: '*',
                element: <NotFound/>,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
       },
    {
        path: "/login",
        element: <Login />,
       }
]);

export default routes;
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import NotFound from "../Shared/notFound/NotFound";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element:<Home/>,
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
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import NotFound from "../Shared/notFound/NotFound";
import Register from "../Pages/Authentication/Register";

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
       }
]);

export default routes;
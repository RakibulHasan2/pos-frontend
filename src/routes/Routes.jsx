import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element:<Home/>,
            },

        ],
    }
]);

export default routes;
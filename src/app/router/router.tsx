import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/UI/Layout/Layout";
import Index from "@/pages/Index/Index";
import Edit from "@/pages/Employee/Edit/Edit";
import New from "@/pages/Employee/New/New";
import NotFound from "@/pages/NotFound/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: 'employee/edit/:id',
                element: <Edit />,
            },

            {
                path: 'employee/new',
                element: <New />,
            },

            {
                path: '*',
                element: <NotFound />,
            },
        ]
    }
])
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AddItem from "../Components/AddItem";
import AllItems from "../Components/AllItems";
import Cart from "../Components/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path:'addItem',
            element: <AddItem></AddItem>
        },
       {
        path: 'allItems',
        element:<AllItems></AllItems>
       },
       {
         path:'cart',
         element:<Cart></Cart>
       }
    ]
  },
]);

export default router
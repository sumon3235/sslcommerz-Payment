import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AddItem from "../Components/AddItem";
import AllItems from "../Components/AllItems";
import Cart from "../Components/Cart";
import PaymentSuccess from "../Pages/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            index: true,
            element: <AllItems></AllItems>
        },
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
       },
       { path: "payment/success", element: <PaymentSuccess /> }
    ]
  },
]);

export default router
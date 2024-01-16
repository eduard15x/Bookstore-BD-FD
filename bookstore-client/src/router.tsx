import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/Error/ErrorPage";
import AboutPage from "./pages/About/AboutPage";
import AccountPage from "./pages/Account/AccountPage";
import ContactPage from "./pages/Contact/ContactPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

export enum Routes {
    Home = '/home',
    About = '/about',
    Account = '/account',
    Cart = '/cart',
    Checkout = '/checkout',
    Contact = '/contact',
    Default = '*'
}

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, // private layout? here should be outlet
      errorElement: <ErrorPage />,
      // children: [
      //   {
      //     path: "contacts/:contactId",
      //     element: <Contact />,
      //   },
      // ],
      children: [
        {
          path: Routes.Home,
          element: <Home />,
        },
        {
          path: Routes.About,
          element: <AboutPage />,
        },
        {
          path: Routes.Account,
          element: <AccountPage />,
        },
        {
          path: Routes.Cart,
          element: <CartPage />,
        },
        {
          path: Routes.Checkout,
          element: <CheckoutPage />,
        },
        {
          path: Routes.Contact,
          element: <ContactPage />,
        },
        {
          path: Routes.Default,
          element: <ErrorPage />,
        },
      ],
    },
  ]);
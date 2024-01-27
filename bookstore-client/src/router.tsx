import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home/Home";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { AboutPage } from "./pages/About/AboutPage";
import { AccountPage } from "./pages/Account/AccountPage";
import { ContactPage } from "./pages/Contact/ContactPage";
import { CartPage } from "./pages/Cart/CartPage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { AdminPage } from "./pages/Admin/AdminPage";
// import TestComponentLoader from "./TestComponentLoader";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProducts } from "./components/admin/AdminProducts";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminOrders } from "./components/admin/AdminOrders";
import { AdminSettings } from "./components/admin/AdminSettings";

export enum Routes {
  Admin = "/admin", // TODO user list, user orders, order details, CRUD operations for books
  AdminDashboard = "/admin/dashboard",
  AdminProducts = "/admin/products",
  AdminOrders = "/admin/orders",
  AdminUsers = "/admin/users",
  Home = "/home",
  About = "/about",
  Account = "/account", // TODO orders for current user, order details / CRUD operations on account,
  Cart = "/cart",
  Checkout = "/checkout",
  Contact = "/contact",
  Default = "*",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // private layout? here should be outlet
    // errorElement: <ErrorPage />,
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
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "/admin",
        // element: <TestComponentLoader />,
        element: <AdminDashboard />,
        loader: ({ params, request }) => {
          console.log(params);
          console.log(request);
          console.log("awaiting a request");

          const fetchTodos = async () => {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos"
            );
            const data = await response.json();
            console.log(response);
            console.log(data);
            return data;
          };

          // fetch user
          // return result
          // return fetch ('/api/users/' + params.userId);
          return fetchTodos();
        },
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/settings",
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: Routes.Default,
    element: <ErrorPage />,
  },
]);

// TODO
// homepage
// search bar
// filtering results
// product details
// book request for item details
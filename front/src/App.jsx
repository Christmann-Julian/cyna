import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import cookies from "js-cookie";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductGrid from "./pages/ProductGrid";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Account from "./pages/account/Account";
import OrderAccount from "./pages/account/OrderAccount";
import AdminPanel from "./pages/admin/AdminPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/*",
    element: <AdminPanel />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account/order",
    element: <OrderAccount />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <ProductGrid />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  document.documentElement.lang = cookies.get("i18next") || "en";

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import cookies from "js-cookie";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import ProductGrid from "./pages/ProductGrid";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product",
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import cookies from "js-cookie";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
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
    path: "/product",
    element: <Product />,
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

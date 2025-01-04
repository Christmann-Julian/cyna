import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import cookies from "js-cookie";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import TermsFooter from "./pages/TermsFooter";
import LegalNotice from "./pages/LegalNotice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mentions-legales",
    element: <LegalNotice />,
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

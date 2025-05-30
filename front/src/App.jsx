import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import cookies from 'js-cookie';
import ErrorPage from './pages/ErrorPage';
import Homepage from './pages/Homepage';
import CGU from './pages/CGU';
import LegalNotice from './pages/LegalNotice';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductGrid from './pages/ProductGrid';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Account from './pages/account/Account';
import OrderAccount from './pages/account/OrderAccount';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import Category from './pages/Category';
import Contact from './pages/Contact';
import About from './pages/About';
import Checkout from './pages/checkout/Checkout';
import CreateAddress from './pages/account/CreateAddress';
import CreatePaymentMethod from './pages/account/CreatePaymentMethod';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OnlyPublicRoute from './components/OnlyPublicRoute';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetails from './pages/account/OrderDetails';
import CheckoutSubscription from './pages/checkout/CheckoutSubscription';

const stripePromise = loadStripe(
  'pk_test_51Il6qJHdav6xRf1DJBGOrXYvW49czc6ATRvtf9oZyFKyZNDnjHwUEGHu9Xk4JgjfKFsQm0vfOfG3uBNAxK1XkU5200tiv5MIl2'
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/*',
    element: <AdminPanel />,
  },
  {
    path: '/login',
    element: (
      <OnlyPublicRoute>
        <Login />
      </OnlyPublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'confirm-email',
    element: <ConfirmEmail />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: (
      <OnlyPublicRoute>
        <Register />
      </OnlyPublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account/order',
    element: (
      <ProtectedRoute>
        <OrderAccount />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account/order/:id',
    element: (
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/product/:id',
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search',
    element: <ProductGrid />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cart',
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact',
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/category/:id',
    element: <Category />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/legal-notice',
    element: <LegalNotice />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cgu',
    element: <CGU />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/order/checkout',
    element: (
      <ProtectedRoute isRedirectToOrigin={true}>
        <Checkout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/order/checkout/subscription',
    element: (
      <ProtectedRoute isRedirectToOrigin={true}>
        <CheckoutSubscription />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/order/success',
    element: (
      <ProtectedRoute isRedirectToOrigin={true}>
        <OrderSuccess />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account/address',
    element: (
      <ProtectedRoute isRedirectToOrigin={true}>
        <CreateAddress />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account/payment-method',
    element: (
      <ProtectedRoute isRedirectToOrigin={true}>
        <Elements stripe={stripePromise}>
          <CreatePaymentMethod />
        </Elements>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  document.documentElement.lang = cookies.get('i18next') || 'en';

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

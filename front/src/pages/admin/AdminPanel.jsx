import React from "react";
import { defaultTheme, CustomRoutes } from "react-admin";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import { ProductList } from "./list/ProductList";
import UserEdit from "./edit/UserEdit";
import UserCreate from "./create/UserCreate";
import { ProductCreate } from "./create/ProductCreate";
import { ProductEdit } from "./edit/ProductEdit";
import { ProductShow } from "./show/ProductShow";
import { UserList } from "./list/UserList";
import { useState } from "react";
import { Navigate, Route } from "react-router-dom";
import {
  fetchHydra as baseFetchHydra,
  hydraDataProvider as baseHydraDataProvider,
  useIntrospection,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import authProvider from "../../utils/authProvider";
import { CategoryList } from "./list/CategoryList";
import CategoryCreate from "./create/CategoryCreate";
import CategoryEdit from "./edit/CategoryEdit";
import { CategoryShow } from "./show/CategoryShow";
import { HomepageCreate } from "./create/HomepageCreate";
import { HomepageList } from "./list/HomepageList";
import { HomepageShow } from "./show/HomepageShow";
import { HomepageEdit } from "./edit/HomepageEdit";
import { MediaObjectCreate } from "./create/MediaObjectCreate";
import { MediaObjectList } from "./list/MediaObjetcList";
import { MediaObjectEdit } from "./edit/MediaObjectEdit";
import { MediaObjectShow } from "./show/MediaObjectShow";
import { ContactList } from "./list/ContactList";
import { useSelector } from "react-redux";
import CustomLayout from "./CustomLayout"
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import HomeIcon from '@mui/icons-material/Home';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SellIcon from '@mui/icons-material/Sell';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import Dashboard from './Dashboard'
import { LogActivityList } from "./list/LogActivityList";
import { LogActivityShow } from "./show/LogActivityShow";
import useUserPermissions from "../../hooks/useUserPermissions";
import { PromoList } from "./list/PromoList";
import { OrderList } from "./list/OrderList";
import { OrderShow } from "./show/OrderShow";
import OrderEdit from "./edit/OrderEdit";
import { SubscriptionList } from "./list/SubscriptionList";
import { SubscriptionShow } from "./show/SubscriptionShow";
import { SubscriptionCreate } from "./create/SubscriptionCreate";
import { SubscriptionEdit } from "./edit/SubscriptionEdit";

const ENTRYPOINT = "http://127.0.0.1:8000/api";

const AdminPanel = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const permissions = useUserPermissions();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const getHeaders = () => {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return {};
  };
    
  
  const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
      ...options,
      headers: getHeaders,
    });
  
  const RedirectToLogin = () => {
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    const introspect = useIntrospection();
    introspect();
    return <></>;
  };
  
  const apiDocumentationParser = (setRedirectToLogin) => async () => {
    try {
      setRedirectToLogin(false);
  
      return await parseHydraDocumentation(ENTRYPOINT, { headers: getHeaders });
    } catch (result) {
      const { api, response, status } = result;
      if (status !== 401 || !response) {
        throw result;
      }
      authProvider.logout();
      setRedirectToLogin(true);
  
      return {
        api,
        response,
        status,
      };
    }
  };
  
  const dataProvider = (setRedirectToLogin) =>
    baseHydraDataProvider({
      entrypoint: ENTRYPOINT,
      httpClient: fetchHydra,
      apiDocumentationParser: apiDocumentationParser(setRedirectToLogin),
    });
  
  const lightTheme = defaultTheme;
  const darkTheme = { ...defaultTheme, palette: { mode: "dark" } };

  return (
    <HydraAdmin
      dataProvider={dataProvider(setRedirectToLogin)}
      authProvider={authProvider}
      basename="/admin"
      docEntrypoint={ENTRYPOINT +"/docs.jsonld"}
      entrypoint={ENTRYPOINT}
      theme={lightTheme}
      darkTheme={darkTheme}
      layout={CustomLayout}
      dashboard={Dashboard}
    >
      {redirectToLogin ? (
        <CustomRoutes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/:any" element={<RedirectToLogin />} />
        </CustomRoutes>
      ) : (
        <>
          <CustomRoutes>
              <Route  path="/dashboard"  element= {<Dashboard/>}/>
          </CustomRoutes>

          <ResourceGuesser
            name="homepages"
            icon={HomeIcon}
            list={HomepageList}
            edit={HomepageEdit}
            create={HomepageCreate}
            show={HomepageShow}
          />
          <ResourceGuesser
            name="products"
            icon={BookmarkIcon}
            list={ProductList}
            edit={ProductEdit}
            create={ProductCreate}
            show={ProductShow}
          />
          <ResourceGuesser
            name="subscriptions"
            icon={ContactsIcon}
            list={SubscriptionList}
            edit={SubscriptionEdit}
            create={SubscriptionCreate}
            show={SubscriptionShow}
          />
          <ResourceGuesser
            name="categories"
            icon={CategoryIcon}
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
            show={CategoryShow}
          />
          <ResourceGuesser
            name="promotional_codes"
            icon={SellIcon}
            list={PromoList}
          />  
          <ResourceGuesser
            name="users"
            icon={PeopleIcon}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
          <ResourceGuesser
            name="orders"
            icon={ShoppingBagIcon}
            list={OrderList}
            edit={OrderEdit}
            show={OrderShow}
          />
          <ResourceGuesser
            name="contacts"
            icon={MailIcon}
            list={ContactList}
            create={null}
          />
          <ResourceGuesser 
            name="media_objects"
            icon={PermMediaIcon} 
            list={MediaObjectList} 
            edit={MediaObjectEdit}
            create={MediaObjectCreate}
            show={MediaObjectShow}
          />
          {permissions.includes("ROLE_SUPER_ADMIN") && 
            <ResourceGuesser 
              name="log_activities"
              icon={HistoryIcon}
              list={LogActivityList}
              create={null}
              show={LogActivityShow}
            />
          }
        </>
      )}
    </HydraAdmin>
  );
};

export default AdminPanel;

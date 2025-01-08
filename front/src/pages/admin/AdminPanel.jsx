import React from "react";
import { defaultTheme } from "react-admin";
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
import { CustomRoutes } from "react-admin";
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

const ENTRYPOINT = "http://127.0.0.1:8000/api";

const getHeaders = () =>
  localStorage.getItem("token")
    ? {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    : {};

const fetchHydra = (url, options = {}) =>
  baseFetchHydra(url, {
    ...options,
    headers: getHeaders,
  });

const RedirectToLogin = () => {
  const introspect = useIntrospection();

  if (localStorage.getItem("token")) {
    introspect();
    return <></>;
  }
  return <Navigate to="/login" />;
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

    localStorage.removeItem("token");

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

const AdminPanel = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  return (
    <HydraAdmin
      dataProvider={dataProvider(setRedirectToLogin)}
      authProvider={authProvider}
      basename="/admin"
      docEntrypoint={ENTRYPOINT +"/docs.jsonld"}
      entrypoint={ENTRYPOINT}
      theme={lightTheme}
      darkTheme={darkTheme}
    >
      {redirectToLogin ? (
        <CustomRoutes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/:any" element={<RedirectToLogin />} />
        </CustomRoutes>
      ) : (
        <>
          <ResourceGuesser
            name="homepages"
            list={HomepageList}
            edit={HomepageEdit}
            create={HomepageCreate}
            show={HomepageShow}
          />
          <ResourceGuesser
            name="products"
            list={ProductList}
            edit={ProductEdit}
            create={ProductCreate}
            show={ProductShow}
          />
          <ResourceGuesser
            name="categories"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
            show={CategoryShow}
          /> 
          <ResourceGuesser
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />  
        </>
      )}
    </HydraAdmin>
  );
};

export default AdminPanel;

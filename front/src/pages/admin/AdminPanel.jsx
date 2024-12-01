import React from 'react';
import { defaultTheme } from 'react-admin';
import { HydraAdmin, ResourceGuesser } from '@api-platform/admin'
import { ProductList } from './list/ProductList';
import UserEdit from './edit/UserEdit';
import UserCreate from './create/UserCreate';
import { ProductCreate } from './create/ProductCreate';
import { ProductEdit } from './edit/ProductEdit';
import { ProductShow } from './show/ProductShow';

const lightTheme = defaultTheme;
const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } };

function AdminPanel() {
  return (
    <HydraAdmin
      basename="/admin"
      docEntrypoint="http://127.0.0.1:8000/api/docs.jsonld"
      entrypoint="http://127.0.0.1:8000/api"
      theme={lightTheme}
      darkTheme={darkTheme}
    >
      <ResourceGuesser name='products' list={ProductList} edit={ProductEdit} create={ProductCreate} show={ProductShow} />
      <ResourceGuesser name="users" edit={UserEdit} create={UserCreate}/>
    </HydraAdmin>
  );
}

export default AdminPanel;
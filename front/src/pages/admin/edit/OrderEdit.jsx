import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export default OrderEdit;

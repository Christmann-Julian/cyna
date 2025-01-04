import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  PasswordInput,
  SelectArrayInput,
  maxLength,
  required,
  minLength,
  regex,
} from "react-admin";

const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="url_image"
        label="Url Image"
        required
        validate={[required(), minLength(2), maxLength(50)]}
      />      
    </SimpleForm>
  </Edit>
);

export default CategoryEdit;

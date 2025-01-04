import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  SelectArrayInput,
  maxLength,
  required,
  minLength,
  regex,
} from "react-admin";

const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="url_image"
        label="URL Image"
        required
        validate={[required(), minLength(2), maxLength(50)]}
      />      
    </SimpleForm>
  </Create>
);

export default CategoryCreate;

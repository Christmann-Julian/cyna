import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  PasswordInput,
  SelectArrayInput,
  maxLength,
  required,
  minLength,
  regex,
} from "react-admin";

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="firstname"
        label="First Name"
        required
        validate={[required(), minLength(2), maxLength(50)]}
      />
      <TextInput
        source="lastname"
        label="Last Name"
        required
        validate={[required(), minLength(2), maxLength(50)]}
      />
      <TextInput
        source="email"
        label="Email"
        required
        validate={[
          required(),
          regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
            "Email is not valid"
          ),
        ]}
      />
      <BooleanInput source="isEmailVerified" label="Is Email Verified" />
      <PasswordInput
        source="plainPassword"
        label="New Password (optional)"
        validate={[
          minLength(8),
          maxLength(255),
          regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Must contain uppercase, lowercase, number, and special character"
          ),
        ]}
      />
      <SelectArrayInput
        source="roles"
        label="Roles"
        choices={[
          { id: "ROLE_USER", name: "User" },
          { id: "ROLE_ADMIN", name: "Admin" },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

export default UserEdit;

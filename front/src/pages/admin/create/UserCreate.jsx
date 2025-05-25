import React from "react";
import {
  Create,
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
import useUserPermissions from "../../../hooks/useUserPermissions";

const UserCreate = () => {
  const permissions = useUserPermissions();
  const isLimitedAdmin = permissions.includes("ROLE_ADMIN") && !permissions.includes("ROLE_SUPER_ADMIN");

  return (
    <Create>
      <SimpleForm defaultValues={{ roles: ['ROLE_USER'] }}>
        <TextInput
          source="firstname"
          label="First Name"
          validate={[required(), minLength(2), maxLength(50)]}
        />
        <TextInput
          source="lastname"
          label="Last Name"
          validate={[required(), minLength(2), maxLength(50)]}
        />
        <TextInput
          source="email"
          label="Email"
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
          label="New Password"
          validate={[
            required(),
            minLength(8),
            maxLength(255),
            regex(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              "Must contain uppercase, lowercase, number, and special character"
            ),
          ]}
        />
        <SelectArrayInput
          disabled={isLimitedAdmin}
          source="roles"
          label="Roles"
          choices={[
            { id: "ROLE_USER", name: "User" },
            { id: "ROLE_ADMIN", name: "Admin" },
            { id: "ROLE_SUPER_ADMIN", name: "Super Admin" },
          ]}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
} 

export default UserCreate;

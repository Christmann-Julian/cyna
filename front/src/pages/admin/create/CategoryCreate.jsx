import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  minLength,
  SimpleFormIterator,
  SelectInput,
  ArrayInput,
} from "react-admin";

const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="url_image"
        label="URL Image"
        required
        validate={[minLength(2), maxLength(255)]}
      />
      <ArrayInput source="categoryTranslations">
        <SimpleFormIterator>
          <TextInput source="name" label="Name" required />
          <TextInput
            source="description"
            label="Description"
            multiline
            required
          />
          <SelectInput
            label="Locale"
            source="locale"
            required
            choices={[
              { id: "/api/locale_cynas/fr-FR", name: "fr-FR" },
              { id: "/api/locale_cynas/en-GB", name: "en-GB" },
              { id: "/api/locale_cynas/ar-SA", name: "ar-SA" },
            ]}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default CategoryCreate;

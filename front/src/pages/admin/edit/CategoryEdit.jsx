import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  maxLength,
  minLength,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
} from "react-admin";

const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="url_image"
        label="Url Image"
        required
        validate={[minLength(2), maxLength(50)]}
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
  </Edit>
);

export default CategoryEdit;

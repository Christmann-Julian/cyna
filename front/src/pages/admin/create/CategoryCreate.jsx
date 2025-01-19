import React from "react";
import {
  TextInput,
  SimpleFormIterator,
  SelectInput,
  ArrayInput,
  ReferenceInput,
} from "react-admin";
import { CreateGuesser } from "@api-platform/admin";

const CategoryCreate = () => (
  <CreateGuesser>
    <ReferenceInput 
      source="image" 
      reference="media_objects"
      sort={{ field: 'id', order: 'DESC' }}
    >
      <SelectInput
        optionText="contentUrl"
        optionValue="@id"
        required
      />
    </ReferenceInput>
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
  </CreateGuesser>
);

export default CategoryCreate;

import React from "react";
import {
  TextInput,
  NumberInput,
  SimpleFormIterator,
  SelectInput,
  ArrayInput,
  ReferenceInput,
  required, 
  minLength,
  maxLength
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
        validate={[required()]}
      />
    </ReferenceInput>
    <NumberInput source="priority" />
    <ArrayInput source="categoryTranslations">
      <SimpleFormIterator>
        <TextInput source="name" label="Name" validate={[required(), minLength(2), maxLength(255)]} />
        <TextInput
          source="description"
          label="Description"
          multiline
          validate={[required(), minLength(2)]}
        />
        <SelectInput
          label="Locale"
          source="locale"
          validate={[required()]}
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

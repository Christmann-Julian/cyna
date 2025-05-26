import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
  required,
  minLength,
  maxLength,
} from 'react-admin';

const transform = (data) => ({
  ...data,
  image: data.image?.['@id'], // Transforme en IRI
});

const CategoryEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput
        source="image.@id"
        reference="media_objects"
        sort={{ field: 'id', order: 'DESC' }}
      >
        <SelectInput optionText="contentUrl" optionValue="@id" />
      </ReferenceInput>
      <NumberInput source="priority" />
      <ArrayInput source="categoryTranslations">
        <SimpleFormIterator>
          <TextInput
            source="name"
            label="Name"
            validate={[required(), minLength(2), maxLength(255)]}
          />
          <TextInput
            source="description"
            label="Description"
            multiline
            validate={[required(), minLength(2)]}
          />
          <SelectInput
            label="Locale"
            source="locale"
            required
            choices={[
              { id: '/api/locale_cynas/fr-FR', name: 'fr-FR' },
              { id: '/api/locale_cynas/en-GB', name: 'en-GB' },
              { id: '/api/locale_cynas/ar-SA', name: 'ar-SA' },
            ]}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default CategoryEdit;

import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  Create,
  SelectInput,
  ReferenceInput,
  required, 
  minLength,
  maxLength
} from "react-admin";

export const HomepageCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="text" label="Homepage Description" multiline validate={[required(), minLength(2)]} />
      <SelectInput
        label="Locale"
        source="locale"
        validate={[required()]}
        choices={[
          { id: "fr-FR", name: "fr-FR" },
          { id: "en-GB", name: "en-GB" },
          { id: "ar-SA", name: "ar-SA" },
        ]}
      />
      <ArrayInput source="slides">
        <SimpleFormIterator>
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
          <TextInput source="title" label="Title" validate={[required(), minLength(2), maxLength(255)]} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

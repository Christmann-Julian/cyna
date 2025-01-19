import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  Create,
  SelectInput,
  ReferenceInput,
} from "react-admin";

export const HomepageCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="text" label="Homepage Description" multiline required />
      <SelectInput
        label="Locale"
        source="locale"
        required
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
              required
            />
          </ReferenceInput>
          <TextInput source="title" label="Title" required />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

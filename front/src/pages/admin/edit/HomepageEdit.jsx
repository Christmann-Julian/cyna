import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
  Edit,
} from "react-admin";

export const HomepageEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="text"
        label="Homepage Description"
        multiline
        required
      />
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
      <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="url_image" label="Url image" required />
          <TextInput source="text" label="Title" required />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

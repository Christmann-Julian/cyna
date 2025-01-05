import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  Create,
  SelectInput,
  BooleanInput,
  NumberInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="price" required/>
      <NumberInput source="priority" />
      <BooleanInput source="disponibility" />
      <TextInput
        source="url_image"
        label="URL Image"
        required
      />
      <ArrayInput source="productTranslations">
        <SimpleFormIterator>
          <TextInput source="name" label="Name" required />
          <TextInput
            source="description"
            label="Description"
            multiline
            required
          />
          <RichTextInput
            source="caracteristic"
            label="Characteristic"
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

import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  Edit,
  ReferenceInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

const transform = (data) => ({
  ...data,
  image: data.image?.['@id'], // Transforme en IRI
});

export const ProductEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      <ReferenceInput 
        source="image.@id" 
        reference="media_objects"
        sort={{ field: 'id', order: 'DESC' }}
      >
        <SelectInput
          optionText="contentUrl"
          optionValue="@id"
        />
      </ReferenceInput>
      <NumberInput source="price" required/>
      <NumberInput source="priority" />
      <BooleanInput source="disponibility" />
      <BooleanInput source="top_product" />
      <NumberInput source="position" defaultValue={0} label="Top product position"/>
      <BooleanInput source="promotionActive" />
      <TextInput source="promotionLabel"/>
      <NumberInput source="promotionPrice" />
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
  </Edit>
);

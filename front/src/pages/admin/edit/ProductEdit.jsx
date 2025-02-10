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
  required,
  minLength,
  maxLength
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
      <NumberInput source="price" validate={[required()]}/>
      <NumberInput source="priority" />
      <BooleanInput source="disponibility" />
      <BooleanInput source="top_product" />
      <NumberInput source="position" defaultValue={0} label="Top product position"/>
      <BooleanInput source="promotionActive" />
      <TextInput source="promotionLabel"/>
      <NumberInput source="promotionPrice" />
      <ArrayInput source="productTranslations">
        <SimpleFormIterator>
          <TextInput source="name" label="Name" validate={[required(), minLength(2), maxLength(255)]} />
          <TextInput
            source="description"
            label="Description"
            multiline
            validate={[required(), minLength(2)]}
          />
          <RichTextInput
            source="caracteristic"
            label="Characteristic"
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
    </SimpleForm>
  </Edit>
);

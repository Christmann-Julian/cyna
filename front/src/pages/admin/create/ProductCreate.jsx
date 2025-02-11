import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  Create,
  SelectInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
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
      <NumberInput source="price" required/>
      <NumberInput source="priority" />
      <BooleanInput source="disponibility" />
      <BooleanInput source="top_product" />
      <ReferenceInput
        source="category"
        reference="categories"
        sort={{ field: 'id', order: 'DESC' }}
      >
        <SelectInput optionText="categoryTranslations[0].name" optionValue="id" required />
      </ReferenceInput>
      <NumberInput source="position" defaultValue={0} label="Top product position" />
      <BooleanInput source="promotionActive" label="Promotion is active" />
      <TextInput source="promotionLabel" label="Promotion label" />
      <NumberInput source="promotionPrice" label="Promotion price"/>
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

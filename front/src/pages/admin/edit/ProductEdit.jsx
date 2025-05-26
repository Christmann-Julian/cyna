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
  maxLength,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const transform = (data) => {
  const transformedData = {
    ...data,
    image: data.image?.['@id'],
    category: data.category?.['id'],
  };

  if (data.productImages) {
    transformedData.productImages = data.productImages.map((productImage) => ({
      ...productImage,
      image: productImage.image?.['@id'], // Transforme en IRI chaque image des slides
    }));
  }

  return transformedData;
};

export const ProductEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      <ReferenceInput
        source="image.@id"
        reference="media_objects"
        sort={{ field: 'id', order: 'DESC' }}
      >
        <SelectInput optionText="contentUrl" optionValue="@id" />
      </ReferenceInput>
      <ArrayInput source="productImages">
        <SimpleFormIterator>
          <ReferenceInput
            source="image.@id"
            reference="media_objects"
            sort={{ field: 'id', order: 'DESC' }}
          >
            <SelectInput optionText="contentUrl" optionValue="@id" validate={[required()]} />
          </ReferenceInput>
          <TextInput
            source="alt"
            label="Alternative text"
            validate={[required(), minLength(2), maxLength(255)]}
          />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="price" validate={[required()]} />
      <NumberInput source="priority" />
      <BooleanInput source="disponibility" />
      <BooleanInput source="top_product" />
      <NumberInput source="position" defaultValue={0} label="Top product position" />
      <ReferenceInput
        source="category.id"
        reference="categories"
        sort={{ field: 'id', order: 'DESC' }}
      >
        <SelectInput optionText="categoryTranslations[0].name" optionValue="id" />
      </ReferenceInput>
      <BooleanInput source="promotionActive" />
      <TextInput source="promotionLabel" />
      <NumberInput source="promotionPrice" />
      <ArrayInput source="productTranslations">
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

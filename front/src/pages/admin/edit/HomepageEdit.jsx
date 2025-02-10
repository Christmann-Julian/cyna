import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
  Edit,
  ReferenceInput,
  required, 
  minLength,
  maxLength
} from "react-admin";

const transform = (data) => {
  const transformedData = {
    ...data,
  };

  if (data.slides) {
    transformedData.slides = data.slides.map(slide => ({
      ...slide,
      image: slide.image?.['@id'], // Transforme en IRI chaque image des slides
    }));
  }

  return transformedData;
};

export const HomepageEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      <TextInput
        source="text"
        label="Homepage Description"
        multiline
        validate={[required(), minLength(2)]}
      />
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
            source="image.@id" 
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
  </Edit>
);

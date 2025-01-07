import {
  Show,
  SimpleShowLayout,
  NumberField,
  BooleanField,
  ArrayField,
  Datagrid,
  TextField,
  RichTextField,
  ReferenceField,
  FunctionField,
} from "react-admin";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <NumberField source="price" />
      <NumberField source="priority" />
      <BooleanField source="disponibility" />
      <BooleanField source="top_product" />
      <NumberField source="position" />
      <TextField source="url_image" />
      <ArrayField source="productTranslations">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="name" label="Name" />
          <TextField source="description" label="Description" />
          <RichTextField
            source="caracteristic"
            label="Characteristic"
            stripTags
          />
          <ReferenceField
            source="locale"
            reference="locale_cynas"
            label="Locale"
          >
            <FunctionField render={(record) => record.code.split("/").pop()} />
          </ReferenceField>
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

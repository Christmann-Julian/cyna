import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  ReferenceField,
  FunctionField,
} from "react-admin";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="imageUrl" />
      <TextField source="priority" />
      <ArrayField source="categoryTranslations">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="name" label="Name" />
          <TextField source="description" label="Description" />
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

import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  ReferenceField,
  FunctionField,
} from "react-admin";

export const HomepageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="text" label="Homepage Description" />
      <TextField source="locale" label="Locale" />
      <ArrayField source="images">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="url_image" label="Url image" />
          <TextField source="text" label="Title" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

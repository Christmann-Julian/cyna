import { Show, SimpleShowLayout, TextField, ArrayField, Datagrid } from 'react-admin';

export const HomepageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="text" label="Homepage Description" />
      <TextField source="locale" label="Locale" />
      <ArrayField source="slides">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="imageUrl" label="Url image" />
          <TextField source="title" label="Title" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

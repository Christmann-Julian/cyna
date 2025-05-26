import { ShowGuesser, FieldGuesser } from '@api-platform/admin';
import { ArrayField, Datagrid, TextField } from 'react-admin';

export const LogActivityShow = () => (
  <ShowGuesser>
    <FieldGuesser source="user" />
    <FieldGuesser source="action" />
    <FieldGuesser source="entityType" />
    <FieldGuesser source="entityId" />
    <FieldGuesser source="createdAt" />
    <ArrayField source="logFields">
      <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
        <TextField source="field" />
      </Datagrid>
    </ArrayField>
  </ShowGuesser>
);

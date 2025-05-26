import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { TextInput } from 'react-admin';

const LogActivitySearch = [<TextInput label="Search by User" source="user" alwaysOn />];

export const LogActivityList = () => (
  <ListGuesser filters={LogActivitySearch} actions={false}>
    <FieldGuesser source="user" />
    <FieldGuesser source="action" />
    <FieldGuesser source="entityType" />
    <FieldGuesser source="entityId" />
    <FieldGuesser source="createdAt" />
  </ListGuesser>
);

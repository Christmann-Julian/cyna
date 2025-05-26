import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { TextInput } from 'react-admin';

const UserSearch = [<TextInput label="Search by email" source="email" alwaysOn />];

export const UserList = () => (
  <ListGuesser filters={UserSearch}>
    <FieldGuesser source="email" />
    <FieldGuesser source="roles" />
    <FieldGuesser source="firstname" />
    <FieldGuesser source="lastname" />
  </ListGuesser>
);

import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { TextInput } from 'react-admin';

const ContactSearch = [
  <TextInput label="Search by email" source="productTranslations.name" alwaysOn />,
];

export const ContactList = () => (
  <ListGuesser filters={ContactSearch} actions={false}>
    <FieldGuesser source="email" />
    <FieldGuesser source="subject" />
    <FieldGuesser source="message" />
    <FieldGuesser source="send_at" />
  </ListGuesser>
);

import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import { TextInput } from "react-admin";

const subscriptionSearch = [
  <TextInput label="Search by title" source="title" alwaysOn />,
];

export const SubscriptionList = () => (
  <ListGuesser filters={subscriptionSearch}>
    <FieldGuesser source="title" />
    <FieldGuesser source="subtitle" />
    <FieldGuesser source="locale" />
    <FieldGuesser source="price" />
    <FieldGuesser source="isActive" />
  </ListGuesser>
);

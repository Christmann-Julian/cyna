import { ListGuesser } from "@api-platform/admin";
import { TextInput, TextField, NumberField, BooleanField } from "react-admin";

const promoSearch = [
  <TextInput label="Search by name" source="name" alwaysOn />,
];

export const PromoList = () => (
  <ListGuesser filters={promoSearch}>
    <TextField source="name"/>
    <NumberField source="promotion" />
    <BooleanField source="isPercent" />
  </ListGuesser>
);

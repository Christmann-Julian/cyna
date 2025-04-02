import { ListGuesser } from "@api-platform/admin";
import { TextInput, TextField, NumberField, DateField } from "react-admin";

const orderSearch = [
  <TextInput label="Search by reference" source="order" alwaysOn />,
];

export const OrderList = () => (
  <ListGuesser filters={orderSearch} actions={false}>
    <TextField source="reference"/>
    <DateField source="date" />
    <TextField source="status" />
    <NumberField source="total" />
    <NumberField source="promotion" />
    <TextField source="address" />
    <TextField source="customerName" />
    <TextField source="customerEmail" />
  </ListGuesser>
);

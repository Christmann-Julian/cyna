import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  Datagrid,
} from "react-admin";

export const OrderShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="reference" />
      <DateField source="date" />
      <TextField source="status" />
      <NumberField source="total" />
      <NumberField source="promotion" />
      <TextField source="address" />
      <TextField source="customerName" />
      <TextField source="customerEmail" />
      <ArrayField source="orderLines">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="name" />
          <NumberField source="quantity" />
          <NumberField source="price" />
          <NumberField source="promotionPrice" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

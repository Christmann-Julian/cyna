import {
  Show,
  SimpleShowLayout,
  NumberField,
  BooleanField,
  ArrayField,
  Datagrid,
  TextField,
} from "react-admin";

export const SubscriptionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="subtitle" />
      <TextField source="locale" />
      <NumberField source="price" />
      <NumberField source="duration" label="Duration in months" />
      <NumberField source="position" />
      <BooleanField source="isActive" />
      <ArrayField source="subscriptionCaracteristics">
        <Datagrid bulkActionButtons={false} sort={false} rowClick={false}>
          <TextField source="text" />
          <NumberField source="position" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

import {
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  Edit,
  required,
  minLength,
  maxLength,
} from 'react-admin';

export const SubscriptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={[required(), minLength(2), maxLength(255)]} />
      <TextInput source="subtitle" validate={[required(), minLength(2), maxLength(255)]} />
      <SelectInput
        label="Locale"
        source="locale"
        validate={[required()]}
        choices={[
          { id: 'fr-FR', name: 'fr-FR' },
          { id: 'en-GB', name: 'en-GB' },
          { id: 'ar-SA', name: 'ar-SA' },
        ]}
      />
      <NumberInput source="price" validate={[required()]} />
      <NumberInput source="duration" label="Duration in months" validate={[required()]} />
      <NumberInput source="position" validate={[required()]} />
      <BooleanInput source="isActive" />
      <ArrayInput source="subscriptionCaracteristics">
        <SimpleFormIterator>
          <TextInput source="text" validate={[required(), minLength(2), maxLength(255)]} />
          <NumberInput source="position" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

import {
  Show,
  SimpleShowLayout,
  NumberField,
  BooleanField,
  ArrayField,
  Datagrid,
  TextField,
  RichTextField,
  ReferenceField,
  FunctionField,
} from "react-admin";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="url_image" />            
    </SimpleShowLayout>
  </Show>
);

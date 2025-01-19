import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import { FunctionField, TextInput, TextField } from "react-admin";

const CategorySearch = [
  <TextInput label="Search by name" source="productTranslations.name" alwaysOn />,
];

export const CategoryList = () => (
  <ListGuesser filters={CategorySearch}>
    <FunctionField label="ID" render={(record) => record.id.split("/").pop()} />  
    <FunctionField
      label="Name by locale"
      render={(record) =>
        record.categoryTranslations && record.categoryTranslations.length > 0 ? (
          record.categoryTranslations.map((translation, index) => (
            <div key={index}>
              {translation.name} ({translation.locale.split("/").pop() || "??-??"})
            </div>
          ))
        ) : (
          <div>No translations available</div>
        )
      }
    />
    <TextField source="imageUrl" />
  </ListGuesser>
);

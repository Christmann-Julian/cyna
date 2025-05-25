import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import {
  FunctionField,
  TextInput,
} from "react-admin";

const ProductSearch = [
  <TextInput label="Search by name" source="productTranslations.name" alwaysOn />,
];

export const ProductList = () => (
  <ListGuesser filters={ProductSearch}>
    <FunctionField label="ID" render={(record) => record.id.split("/").pop()} />
    <FunctionField
      label="Name by locale"
      render={(record) =>
        record.productTranslations && record.productTranslations.length > 0 ? (
          record.productTranslations.map((translation, index) => (
            <div key={index}>
              {translation.name} ({translation.locale.split("/").pop() || "??-??"})
            </div>
          ))
        ) : (
          <div>No translations available</div>
        )
      }
    />
    <FieldGuesser source="price" />
    <FieldGuesser source="priority" />
    <FieldGuesser source="disponibility" />
    <FieldGuesser source="top_product" />
    <FieldGuesser source="promotionActive" />
  </ListGuesser>
);

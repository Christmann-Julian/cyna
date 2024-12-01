import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import {
  FunctionField,
} from "react-admin";

export const ProductList = () => (
  <ListGuesser>
    <FunctionField label="ID" render={(record) => record.id.split("/").pop()} />
    <FunctionField
      label="Product Translations"
      render={(record) =>
        record.productTranslations.map((translation, index) => (
          <div key={index}>
            {translation.name} ({translation.locale.split("/").pop() || "??-??"}
            )
          </div>
        ))
      }
    />
    <FieldGuesser source="price" />
    <FieldGuesser source="priority" />
    <FieldGuesser source="disponibility" />
  </ListGuesser>
);

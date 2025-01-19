import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import { EditButton, ImageField, FunctionField } from "react-admin";

export const MediaObjectList = () => (
  <ListGuesser>
    <FieldGuesser source="contentUrl" label="Url" />
    <FunctionField
      label="Image"
      render={(record) => (
          <div>
              <img src={`http://127.0.0.1:8000${record.contentUrl}`} height="80px" alt="Image" />
          </div>
        )
      }
    />
    <EditButton />
  </ListGuesser>
);

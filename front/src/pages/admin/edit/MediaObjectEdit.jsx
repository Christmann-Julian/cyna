import { EditGuesser } from "@api-platform/admin";
import { FileInput, FileField } from "react-admin";

export const MediaObjectEdit = (props) => (
  <EditGuesser {...props}>
      <FileInput source="file" maxSize={2000000} accept={"image/*"}>
        <FileField source="contentUrl" />
      </FileInput>
  </EditGuesser>
);
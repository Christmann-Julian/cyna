import { CreateGuesser } from "@api-platform/admin";
import { FileField, FileInput } from "react-admin";

export const MediaObjectCreate = (props) => (
  <CreateGuesser {...props}>
    <FileInput source="file" maxSize={2000000} accept={"image/*"}>
      <FileField source="contentUrl" />
    </FileInput>
  </CreateGuesser>
);

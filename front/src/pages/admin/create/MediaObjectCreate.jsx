import { CreateGuesser } from "@api-platform/admin";
import { FileField, FileInput } from "react-admin";

export const MediaObjectCreate = (props) => (
  <CreateGuesser {...props}>
    <FileInput source="file">
      <FileField source="contentUrl" />
    </FileInput>
  </CreateGuesser>
);

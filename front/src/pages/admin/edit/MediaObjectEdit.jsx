import { EditGuesser } from "@api-platform/admin";
import { FileInput, FileField } from "react-admin";

export const MediaObjectEdit = (props) => (
  <EditGuesser {...props}>
      <FileInput source="file">
        <FileField source="contentUrl" />
      </FileInput>
  </EditGuesser>
);
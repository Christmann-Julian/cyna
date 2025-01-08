import { ListGuesser, FieldGuesser } from "@api-platform/admin";

export const HomepageList = () => (
  <ListGuesser>
    <FieldGuesser source="text" label="Homepage description" />
    <FieldGuesser source="locale" label="Locale" />
  </ListGuesser>
);

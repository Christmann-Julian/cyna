import { ListGuesser, FieldGuesser } from "@api-platform/admin";
import { TextInput } from "react-admin";

export const CategoryList = () => (
    <ListGuesser filters={UserSearch}>
        <FieldGuesser source="url_image" />       
    </ListGuesser>
);
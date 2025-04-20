import { Menu } from "react-admin";
import DashboardIcon from "@mui/icons-material/Dashboard";
import useUserPermissions from "../../hooks/useUserPermissions";

export const MyMenu = () => {
  const permissions = useUserPermissions();

  return (
    <Menu>
      <Menu.Item
        to="/admin/dashboard"
        primaryText="Dashboard"
        leftIcon={<DashboardIcon />}
      />
      <Menu.ResourceItem name="homepages" />
      <Menu.ResourceItem name="products" />
      <Menu.ResourceItem name="subscriptions" />
      <Menu.ResourceItem name="categories" />
      <Menu.ResourceItem name="promotional_codes" />
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="orders" />
      <Menu.ResourceItem name="contacts" />
      <Menu.ResourceItem name="media_objects" />
      {permissions.includes("ROLE_SUPER_ADMIN") && (
        <Menu.ResourceItem name="log_activities" />
      )}
    </Menu>
  );
};

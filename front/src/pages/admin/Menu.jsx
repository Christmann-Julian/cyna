import { Menu } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const MyMenu = () => (
    <Menu>
        <Menu.Item to="/admin/dashboard" primaryText="Dashboard" leftIcon={<DashboardIcon />}/>
        <Menu.ResourceItem name='homepages'/>
        <Menu.ResourceItem name='products'/>
        <Menu.ResourceItem name='categories'/>   
        <Menu.ResourceItem name="contacts" />
        <Menu.ResourceItem name="users" />
        <Menu.ResourceItem name="media_objects" />
    </Menu>
);

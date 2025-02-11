import { Layout } from 'react-admin';
import { AppBar } from 'react-admin';
import { Typography } from '@mui/material';
import { Box, useMediaQuery } from '@mui/material';
import Logo from '../../assets/img/cyna-logo-white.png';

const CustomAppBar = (props) => {
    const isMobile = useMediaQuery('(max-width:600px)'); 
    return (
        <AppBar {...props} sx={{ backgroundColor: "#302082" }}>
            <Typography variant="h6" color="inherit">
                Cyna Admin
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                 {!isMobile && (
                    <img src={Logo} alt="Logo" style={{ height: 40 }} />
                )}
            </Box>            
        </AppBar>
    )
}

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;

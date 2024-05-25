import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import stacklineLogo from "../../../assets/stackline_logo.svg";

const theme = createTheme({
    palette: {
        blue: {
            main: '#04345a',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
});

export default function ButtonAppBar() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: 'blue.main', height: 85, boxShadow: 0 }}>
                    <div style={{height: 200, width: 200, paddingLeft: 20, paddingTop: 20}}>
                        <img src={stacklineLogo} alt="logo"/>
                    </div>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}
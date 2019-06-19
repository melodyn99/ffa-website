// @material-ui
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    // ripple: {
    //     color: 'red',
    // },
    palette: {
        primary: {
            main_feature: '#1f2bae',
            main: '#fff200',
            light: '#67dbfc',
            dark: '#007a98',
            contrastText: '#000',
        },
        secondary: {
            main: '#02de72',
            light: '#64ffa2',
            dark: '#00ab44',
            contrastText: '#fff',
        },
    },
});
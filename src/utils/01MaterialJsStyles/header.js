export const HeaderStyles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginBottom: '70px',
    },
    requiredField: {
        color: 'red',
    },
    deleteButton: {
        [theme.breakpoints.up('md')]: {
            borderRadius: '10px',
            display: 'block',
            margin: '0 auto',
            marginTop: '10px',
            marginBottom: '10px',
            width: '360px',
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0px',
            bottom: '0px',
            position: 'relative',
            width: '100%',
            height: '60px',
            fontSize: '20px',
        },
        backgroundColor: theme.palette.secondary.main,
        color: 'blue',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
});
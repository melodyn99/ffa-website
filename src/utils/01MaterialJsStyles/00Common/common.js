export const CommonStyles = theme => ({
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
    createButton: {
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
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
        paper: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
        },
        table: {
            minWidth: 1020,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    },

});
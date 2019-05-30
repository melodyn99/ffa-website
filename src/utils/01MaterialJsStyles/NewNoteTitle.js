export const NewNoteTitleStyles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        height: '88vh',
        overflowY: 'hidden'
    },
    content: {
        padding: '10px'
    },
    divScroll: {
        height: 'calc(100vh - 150px)',
        overflowY: 'scroll',
    },
    input: {
        border: 'none',
        width: '100%',
        height: 'calc(80vh - 50px)',
        maxWidth: '96vw',
        '& :focus ': {
            border: 'none',
        },
    },
    list: {
        backgroundColor: '#fff',
        width: '100vw',
    },
    listItemText: {
        flex: 'none',
    },
    createButton: {
        [theme.breakpoints.up('md')]: {
            borderRadius: '10px',
            display: 'block',
            marginTop: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '200px',
            fontWeight: 'bold',
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0px',
            fontWeight: 'bold',
            position: 'fixed',
            bottom: '0px',
            width: '100%',
            height: '60px',
            fontSize: '20px',
        },
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
});
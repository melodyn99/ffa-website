export const DocumentStyles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    documentWrapper: {
        '&:nth-child(even)': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
    },
    documentWrapperOpen: {
        border: '1px solid black',
        backgroundColor: '#A9D0F5',
    },
    document: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '16px',
        paddingBottom: '16px',
        [theme.breakpoints.up('md')]: {
            width: '700px',
        },
    },
    documentInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rightDocumentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        flexGrow: '3',
        color: '#000'
    },
    editBar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'right',
        backgroundColor: '#A9D0F5',
        [theme.breakpoints.up('md')]: {
            width: '700px',
        },
    },
    label: {
        flexDirection: 'column',
        fontSize: '16px',
    },
    icon: {
        fontSize: '30px',
    },
    checkBox: {
        marginLeft: '10px',
        color: theme.palette.secondary.main,
    },
    iconSpeaker: {
        width: '32px',
    },
});
export const SchedulingStyles = theme => ({
    root: {
        flexShrink: '1',
        marginBottom: '120px',
    },
    content: {
        flexShrink: '1',
    },
    calendarWrapper: {
        maxWidth: '100%',
        [theme.breakpoints.up('md')]: {
            maxWidth: '36%',
        },
    },
    searchBar: {
        height: '30px',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // [theme.breakpoints.up('md')]: {
        //   display: 'none',
        // },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexFlow: 'row',
        },
    },
    middleContent: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: '50px',
            paddingRight: '50px',
        },
    },
    seminarTag: {
        display: 'flex',
        backgroundColor: '#E6E6FA',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '18px',
        paddingRight: '18px',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            width: '80%',
            float: 'right',
        },
    },
    wrapper: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            width: '80%',
            marginLeft: 'auto',
        },
    },
    cardWrapperCenter: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    frontCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'darkgrey',
        height: '80px',
        width: '100px',
        borderRadius: '0px',
        textAlign: 'center',
        '& > h3': {
            color: 'white',
            fontWeight: '300',
            '&:first-child': {
                marginBottom: '5px',
                fontSize: '18px',
            },
            '&:last-child': {
                marginTop: '5px',
                fontSize: '14px',
            },
        },
    },
    card: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
        flex: '1',
        flexGrow: '1',
        borderRadius: '0px',
        textDecoration: 'none',
        boxShadow: '0px 0px 0px',
    },
    rowWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80px',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    subToolbarText: {
        fontSize: '18px',
        width: '100px',
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightColumnTypography: {
        marginRight: '30px',
        color: 'darkgrey',
        fontSize: '18px',
        fontWeight: '100',
    },
    seminarItem: {
        display: 'flex',
        flexDirection: 'row',
        border: 'unset',
        margin: '2px 0',
        padding: '0',
    },
    wrapperCenter: {
        width: '100%',
        justifyContent: 'flex-end',
        [theme.breakpoints.up('md')]: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
});

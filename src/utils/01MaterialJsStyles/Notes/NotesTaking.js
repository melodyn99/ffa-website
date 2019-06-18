export const NotesTakingStyles = () => ({
    list: {
        padding: '10px',
    },
    listItem: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    listItemText: {
        marginLeft: '10px',
        '& p ': {
            padding: 0,
        },
    },
    typography: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '20px',
    },
});

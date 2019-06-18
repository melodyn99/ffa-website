export const StudentContainerStyles = ({
    container: {
        padding: 10,
    },
    expansionPanel: {
        width: '100%',
        margin: 0,
        backgroundColor: 'unset',
        borderBottom: "1px solid rgb(224, 224, 224)",
        boxShadow: 'unset',
        '&:nthOfType(even)': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&:before': { backgroundColor: 'unset' },
    },
    panelTitle: {
        fontSize: '18px',
        marginLeft: '5px',
    },
    zeroPadding: {
        padding: '0px',
        width: '100%',
    },
    listItem: {
        padding: '0px',
        marginLeft: '40px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    }
});

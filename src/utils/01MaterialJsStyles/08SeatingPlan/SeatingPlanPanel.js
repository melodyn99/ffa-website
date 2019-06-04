export const SeatingPlanPanelStyles = theme => ({
    studentsList: {
        maxHeight: "calc(100% - 56px)",
        height: "100%",
        overflowY: 'auto'
    },
    bottomBar: {
        background: 'rgb(242, 242, 242)',
        display: "flex",
        height: '56px',
        minWidth: '320px'
    },
    bottomButton: {
        width: '100%',
        borderRadius: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderTop: '2px solid rgba(0, 0, 0, 0.2)',
        borderRight: '2px solid rgba(0, 0, 0, 0.2)',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        flex: 'none',
        borderRight: '2px solid rgba(0, 0, 0, 0.1)',
        [theme.breakpoints.down('xs')]: {
            maxWidth: "unset"
        }
    }
});
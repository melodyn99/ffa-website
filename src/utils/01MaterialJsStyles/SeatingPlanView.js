export const SeatingPlanViewStyles = theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "auto",
        overflow: "auto",
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
    },
});
export const SeatBoardStyles = {
    rootSeatBoard: {
        overflow: "auto",
        flex: "auto",
        userSelect: "none"
    },
    child: {
        display: "grid",
        transformOrigin: "left top",
    },
    grid: {
        display: "grid",
        alignContent: "center",
        gridGap: "5px 20px",
        width: "100%",
        padding: 20,
        margin: "auto",
        transformOrigin: "50% 50%",
        transition: "all 0.4s ease 0s",
    }
};

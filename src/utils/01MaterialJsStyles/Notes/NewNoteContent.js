export const NewNoteContentStyles = () => ({
    root: {
        height: '100vh',
    },
    content: {
        flex: 1,
        padding: '10px'
    },
    input: {
        border: 'none',
        width: '100%',
        minHeight: '50vh',
        maxWidth: '96vw',
        '& :focus ': {
            border: 'none',
        },
    },
});
export const NotesContentStyles = () => ({
    root: {
        height: '88vh',
        overflowY: 'hidden',
        '& textarea': {
            '&:disabled': {
                background: 'white'
            }
        }
    },
    content: {
        flex: 1,
        padding: '10px',
        '&textarea:disabled': {
            background: 'white'
        }

    },
    divScroll: {
        height: 'calc(100vh - 150px)',
        overflowY: 'scroll',
    },
    title: {
        marginTop: '20px',
        padding: '8%'
    },
    input: {
        border: 'none',
        width: '100%',
        height: 'calc(80vh - 50px)',
        fontSize: '16px',
        maxWidth: '96vw',
        '& :focus ': {
            border: 'none',
        },
    },
});
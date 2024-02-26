const root = ReactDOM.createRoot(document.getElementById('root'));

function Note(){
    const [userNotes, setUseNotes] = React.useState()
    return (
        <textarea></textarea>
    )
}

root.render(<Note/>)
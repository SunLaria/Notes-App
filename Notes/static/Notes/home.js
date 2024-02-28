const root = ReactDOM.createRoot(document.getElementById('root'));
const csrfToken = document.cookie.split('csrftoken=')[1]
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

function Note(p) {
    const [text, setText] = React.useState(p.text);
    const [color,setColor] = React.useState(p.color);
    const [id,setId] = React.useState(p.id)
    const [edit,setEdit] = React.useState(false)
    const onFocus = (e) => {
        setEdit(true)
        console.log("Set Edit Mode");
    }
    const changeEvent = (e) => {
        if (text!=e.target.value || e.target.style.backgroundColor!=color){
            setText(e.target.value)
            setColor(e.target.style.backgroundColor)
        }
        setEdit(false);
    }
    const deleteEvent = (e) => {
        axios.post('/delete-Note',{body:{id:id} ,headers:{'Content-Type': 'application/json'}})
        .then((response)=>{ 
            if (response.data['result'] == 'Note Deleted'){
                console.log(`Note ${e.target.id} Deleted`);
                e.target.remove()
            }else {
                console.log(`Note ${e.target.id} Failed To Delete`);
            }})
    }

    React.useEffect(()=>{
        axios.post('/update-Note',{body:{id:id,text:text,color:color} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                return response.data['result']=="Note Updated"?console.log(`Note ${id}, Text Update: ${text}, Color Update: ${color}`):console.log('Failed to update the Note');})
    },[text,color])

    return (
        <div id="note-card">
            <textarea 
                style={{backgroundColor:color}}
                defaultValue={text} 
                onBlur={changeEvent}
                onFocus={onFocus}
                onDoubleClick={deleteEvent}
                id={p.id}
            />
            {edit?<button className="color-picker-button" >color</button>:""}
        </div>
    )
}

function Notes(){
    const [userNotes, setUseNotes] = React.useState(JSON.parse(user_notes.innerHTML))
    console.log(userNotes);
    return (
        <div id="user-notes">
        {userNotes.map((i)=>{
            return <Note id={i.id} text={i.text} color={i.color} updated={i.updated} created={i.created} />
        })}
        </div>
    )
}

root.render(<Notes/>)
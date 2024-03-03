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
        e.stopPropagation()
        setEdit(true)
        console.log("Set Edit Mode");
    }
    const changeEvent = (e) => {
        e.stopPropagation()
        setText(e.target.value)
        if (text!=e.target.value){
            axios.post('/update-Note/',{body:{id:id,text:e.target.value} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                response.data['result']=="Note Updated"?console.log(`Note ${id}, Text Update: ${e.target.value}`):console.log('Failed to update the Note');})
        setEdit(false);
        }
    }
    const deleteEvent = (e) => {
        e.stopPropagation()
        axios.post('/delete-Note/',{body:{id:id} ,headers:{'Content-Type': 'application/json'}})
        .then((response)=>{ 
            if (response.data['result'] == 'Note Deleted'){
                console.log(`Note ${e.target.id} Deleted`);
                e.target.parentElement.remove()
            }else {
                console.log(`Note ${e.target.id} Failed To Delete`);
            }})
    }
    return (
        <div className="note-card">
            <textarea 
                style={{backgroundColor:color}}
                defaultValue={text}
                onBlur={(e)=>{changeEvent(e)}}
                onFocus={(e)=>{onFocus(e)}}
                onDoubleClick={(e)=>{deleteEvent(e)}}
                id={p.id}
            />
            {/* {edit?<ColorPicker color={color} />:""} */}
            <ColorPicker color={color} id={id} colorEvent={setColor} />
        </div>
    )
}


// style={{position: 'absolute'}}
function ColorPicker(p) {
    const [color,setColor] = React.useState(p.color)
    const [id,setId] = React.useState(p.id)
    const changeEvent = (e) => {
        e.target.style.background= e.target.value
        p.colorEvent(e.target.value)
        setColor(e.target.value)
        axios.post('/update-Note/',{body:{id:id,color:e.target.value} ,headers:{'Content-Type': 'application/json'}})
        .then((response)=>{ 
            response.data['result']=="Note Updated"?console.log(`Note ${id},Color Update: ${e.target.value}`):console.log('Failed to update the Note');})
    }
    const colors = ["#FFFFFF",,"#ffe666","#f5c27d","#f6cebf","#e3b7d2","#bfe7f6"]
    return (
        <label>
            Color:
                <select defaultValue={color} style={{background:color}} onChange={(e)=>{changeEvent(e)}}>
                    {colors.map((i,index)=>{
                        return <option key={index} value={i} style={{background:i}}>&nbsp;&nbsp;</option>
                    })}
                </select>
        </label>
    )
}


function Notes(){
    const [userNotes, setUserNotes] = React.useState([])
    React.useEffect(()=>{
        axios.get('/get-Notes/')
        .then((response)=>{setUserNotes(JSON.parse(response.data.user_notes))})
    },[])
    const addEmptyNote = (e) => {
        axios.post('/add-Note/')
        .then((response)=>{
            if (response.data.result=="Note Created"){
                setUserNotes([...userNotes,{"id": response.data.id, "text": "", "color": ""}])
                console.log("Note Created");
            }
        })
    }
    return (
        <div id="user-notes" onDoubleClick={(e)=>{addEmptyNote(e)}}>
        {userNotes.map((i)=>{
            return <Note key={i.id} id={i.id} text={i.text} color={i.color} updated={i.updated} created={i.created} />
        })}
        </div>
    )
}

root.render(<Notes/>)
const root = ReactDOM.createRoot(document.getElementById('root'));

const cookiesDict = Object.fromEntries(document.cookie.split(";").map((i) => [i.split("=")[0].replaceAll(" ",""), i.split("=")[1]]));

const csrfToken  = cookiesDict.csrftoken

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


function Note(p) {
    const [text, setText] = React.useState(p.text);
    const [color,setColor] = React.useState(p.color);
    const [height, setHeight] = React.useState(p.height)
    const [width, setWidth] = React.useState(p.width)
    const [fontSize, setFontSize] = React.useState(p.fontSize)
    const [id,setId] = React.useState(p.id)
    const [edit,setEdit] = React.useState(false)
    const changeEvent = (e) => {
        e.stopPropagation()
        setText(e.target.value)
        if (text!=e.target.value){
            axios.post('/update-Note/',{body:{id:id,text:e.target.value} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                response.data['result']=="Note Updated"?console.log(`Note ${id}, Text Update: ${e.target.value}`):console.log('Failed to update the Note');})
        }
    }
    
    const dragEvent = (e)=>{
        e.stopPropagation()
        setHeight(e.target.style.height)
        setWidth(e.target.style.width)
        if (height!=e.target.style.height || width!=e.target.style.width){
            axios.post('/update-Note/',{body:{id:id,height:e.target.style.height,width:e.target.style.width} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                response.data['result']=="Note Updated"?console.log(`Note ${id}, Width Update: ${e.target.style.width}, Height Update: ${e.target.style.height}`):console.log('Failed to update the Note');})
        }
    }
    const deleteEvent = (e) => {
        e.stopPropagation()
        axios.post('/delete-Note/',{body:{id:id} ,headers:{'Content-Type': 'application/json'}})
        .then((response)=>{ 
            if (response.data['result'] == 'Note Deleted'){
                console.log(`Note ${e.target.id} Deleted`);
                e.target.parentElement.parentElement.remove()
            }else {
                console.log(`Note ${e.target.id} Failed To Delete`);
            }})
    }
    return (
        <div>
        <div className="note-card"  onMouseEnter={() => setEdit(true)} onMouseLeave={() => setEdit(false)}>
            {edit?<ColorPicker color={color} id={id} setColor={setColor}/>:""}
            {edit?<SizeTool fontSize={fontSize} id={id} setFontSize={setFontSize}/>:""}
            <textarea 
                style={{backgroundColor:color,width:width,height:height,minWidth:"233px",minHeight:'56px',fontSize:`${fontSize}px`,resize:edit?"":'none'}}
                defaultValue={text}
                onBlur={(e)=>{changeEvent(e)}}
                onDoubleClick={(e)=>{deleteEvent(e)}}
                id={p.id}
                onMouseUp={(e)=>{dragEvent(e)}}
                
            />
            {edit?<NoteDateInfo updated={p.updated} created={p.created} />:""}
        </div>
        </div>
    )
}


function NoteDateInfo(p) {
    return(
        <div className="note-date-info">
            <div className="date-divs">
                <div className="date-div">Created: {p.created}</div>
                {p.updated!=p.created?<div className="date-div">Updated: {p.updated}</div>:""}
            </div>
        </div>
    )
}

function ColorPicker(p) {
    const [color,setColor] = React.useState(p.color)
    const [id,setId] = React.useState(p.id)
    const changeEvent = (e) => {
        e.stopPropagation()
        if (color != e.target.value){
            setColor(e.target.value)
            axios.post('/update-Note/',{body:{id:id,color:e.target.value} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                response.data['result']=="Note Updated"?console.log(`Note ${id},Color Update: ${e.target.value}`):console.log('Failed to update the Note');})
        }
    }
    const changeLiveColor = (e) => {
        e.stopPropagation()
        if (color != e.target.value){ 
            p.setColor(e.target.value)
        }
    }
    return (
        <div style={{position:"relative",height:"0"}}>
            <input type="color" className="color-picker" defaultValue={color} onChange={(e)=>{changeLiveColor(e)}} onMouseLeave={(e)=>{changeEvent(e)}}/>
        </div>
    )
}


function SizeTool(p) {
    const [fontSize,setFontSize] = React.useState(p.fontSize)
    const [id,setId] = React.useState(p.id)
    const changeEvent = (e) => {
        e.stopPropagation()
        if (fontSize != e.target.value){
            setFontSize(e.target.value)
            axios.post('/update-Note/',{body:{id:id,font_size:e.target.value} ,headers:{'Content-Type': 'application/json'}})
            .then((response)=>{ 
                response.data['result']=="Note Updated"?console.log(`Note ${id},Font Size Update: ${e.target.value}`):console.log('Failed to update the Note');})
        }
    }
    const changeLiveSize = (e) => {  
        e.stopPropagation()
        if (fontSize != e.target.value){ 
            p.setFontSize(e.target.value)
        }
    }
    return (
        <div style={{position:"relative",height:"0"}}>
            <input type="number" min={10} max={30} className="size-tool" defaultValue={fontSize} onChange={(e)=>{changeLiveSize(e)}} onMouseLeave={(e)=>{changeEvent(e)}}/>
        </div>
    )
}

function Notes(){
    const [userNotes, setUserNotes] = React.useState([])
    React.useEffect(()=>{
        axios.get('/get-Notes/')
        .then((response)=>{
            setUserNotes(JSON.parse(response.data.user_notes));
            console.log(response.data.user_notes);
        })
    },[])
    const addEmptyNote = (e) => {
        const date = new Date()
        axios.post('/add-Note/')
        .then((response)=>{
            if (response.data.result=="Note Created"){
                setUserNotes([...userNotes,{"id": response.data.id, "text": "", "color": "#FFFFFF",'height':'233px','width':'250px','created':date.toLocaleDateString('en-GB').replaceAll("/","-"),'updated':date.toLocaleDateString('en-GB').replaceAll("/","-"),font_size:"14"}])
                console.log("Note Created");
            }
        })
    }
    return (
        <div id="content" onDoubleClick={(e)=>{addEmptyNote(e)}}>
            <div id="user-notes" >
                {userNotes.map((i)=>{
                    return <Note key={i.id} id={i.id} text={i.text} color={i.color} height={i.height} width={i.width} fontSize={i.font_size} updated={i.updated} created={i.created} />
                })}
            </div>
        </div>
    )
}

root.render(<Notes/>)
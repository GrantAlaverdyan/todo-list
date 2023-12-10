import React, { useState } from 'react';

function Hookes() {
const [todo, setTodo] = useState("")
    let saveInput = ()=>{
        fetch(`http://localhost:5000/save-input?todo=${todo}&&status=false`)
        .then((response) => response.json())
        .then((response) => console.log(response))
        
    }


    return (
        <>
            <div>
                <input id="save" onInput={(e)=> setTodo(e.target.value)}/>
                <button onClick={()=> saveInput()}>Save</button>
            </div>
        </>
    )
}

export default Hookes;
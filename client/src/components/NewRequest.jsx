import React, { useState, useEffect} from 'react';

function NewRequest() {

    const [data, setData] = useState([])

    const [isEdit, setIsEdit] = useState([]);
    const [changeTodo, setChangeTodo] = useState("");
    useEffect(()=>{
        fetch("http://localhost:5000/show-todo")
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setData(response.response)})
    }, [])
    
    const changeStatus = (id)=>{
        // data[0]
        let newData = [...data];
        newData = newData.map((item)=>{
             
            if (item.id === id) {
                item.status = !item.status
                return item
            }
            return item
        })
        setData(newData)
    }

    // const deleteTodo1 = (id)=>{
    //     let result = [];
    //     data.forEach((item)=>{
    //         if (item.id !== id) {
    //             result.push(item)
    //         }
    //     });
    //     setData(result)
    // }


    const saveDeletedTodo = async (id)=> {

        const deleteTodo = await fetch(
            'http://localhost:5000/delete-todo',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({id})
            });
        const arrSortUserId = await deleteTodo.json();
        console.log(arrSortUserId)
        if (arrSortUserId.response === "success") {
            // удалить с помощью фильтра по айдишнику в дате
        }
    }
    const editTodo = (id)=>{
        let newIsEdit = [...isEdit];
        newIsEdit.push(id);
        setIsEdit(newIsEdit)
    }
    const saveEdit = async (id)=>{

        const editTodo = await fetch(
            'http://localhost:5000/edit-todo',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({id, changeTodo})
            });
        const arrSortUserId = await editTodo.json();
        console.log(arrSortUserId)

        let newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].task = changeTodo
            }
        }
        let newIsEdit = [...isEdit];
        let result = newIsEdit.filter((item)=>
            item !== +id
        )
        console.log({id});
        console.log({newIsEdit});
        console.log(result);
        setIsEdit(result)
        setData(newData)
    }



    return (
        <>
        {data.map((item)=>{

            return <div>
                <input type='checkbox' onChange={()=> changeStatus(item.id)} /> <span style={{textDecoration: item.status ?  "line-through": "none"}}> 
                 
                 {!isEdit.includes(item.id) && item.task} {isEdit.includes(item.id) && <input type='text' placeholder={item.name} onInput={(e)=> setChangeTodo(e.target.value)}/>}
                 
                 </span> 
                 
                 {!isEdit.includes(item.id) && <span onClick={()=> editTodo(item.id)} style={{cursor: "pointer"}}>✏️</span>} 
                 {isEdit.includes(item.id) && <span onClick={()=> saveEdit(item.id)} style={{cursor: "pointer"}}> ✔️</span>}
                 {isEdit.includes(item.id) && <span onClick={()=> editTodo(item.id)} style={{cursor: "pointer"}}> ❌</span>}
                 
                 <span onClick={()=> saveDeletedTodo(item.id)} style={{cursor: "pointer"}}>🗑️</span>
            </div>
        })}
        </>
    )
}

export default NewRequest;
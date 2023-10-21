import React, { useEffect } from "react";
import "./Todo.css";
import { useState, useRef } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId,setEditId]=useState(0)

  const addToDo = () => {
   if(todo !==''){
    setTodos([...todos, {list:todo,id:Date.now(),status:false}]); 
    console.log(todos);
    setTodo(" ");
   }
   if(editId){
    const editTodo=todos.find((todo)=>todo.id===editId)
    const updateTodo=todos.map((to)=>to.id===editTodo.id
    ?(to={id:to.id,list:todo})
    :(to={id:to.id,list:to.list}))
    setTodos(updateTodo)
    setEditId(0);
    setTodo('')
   }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete=(id)=>{
    setTodos( todos.filter((to)=>to.id!==id)) 
  };

  const onComplete=(id)=> {
    let complete=todos.map((list)=>{
        if(list.id===id){
            return ({...list,status:!list.status})
        }
        return list
    })
    setTodos(complete)

  } ;
  const onEdit=(id)=>{
    const editTodo= todos.find((to)=>to.id===id) 
    setTodo(editTodo.list)
    setEditId(editTodo.id )

  };


  return (
    <div className="container">
      <h2>ToDo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        ></input>
        <button onClick={addToDo}>{editId?'EDIT':'ADD'}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items" key={to}>
              
              <div className="list-items-list" id={to.status?"list-item":''}> {to.list} </div>
              <span>
                <IoMdDoneAll
                  className="list-items-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(to.id) }
                />
                <FiEdit className="list-items-icons" id="edit" title="Edit"
                onClick={()=> onEdit(to.id)} />
                <MdDelete
                  className="list-items-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(to.id) }
                
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

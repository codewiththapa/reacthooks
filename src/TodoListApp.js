import React,{useState} from "react";
import {Button, Container, Form,Alert, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import {FaPlus,FaTrash} from 'react-icons/fa'

export default function TodoListApp (){
  const initialData = JSON.parse(localStorage.getItem('todos'));
  const [todoList,setTodolist] = useState([...initialData]);
  const [text,setText] = useState('');

const addTodo=()=>{
  
  const newTodo = [
    ...todoList,
    {data:text, date:new Date().toLocaleString().split(','), isCompleted:false}
  ];
  setText('');
  setTodolist(newTodo);
  localStorage.setItem('todos',JSON.stringify(newTodo))
}

const toggleTodoCompletetion = (idx) =>{
 const newTodo = todoList.map((todo,index)=>
(index === idx ) ? {...todo , isCompleted: !todo.isCompleted} : todo
 )
 setTodolist(newTodo);
 localStorage.setItem('todos',JSON.stringify(newTodo))
}

const deleteTodo =(idx)=>{
  const response = window.confirm('Do you want to Delete?');
if (response){
 const newTodo = todoList.filter(( _,index)=>
     index === idx ? false : true
      );
    setTodolist(newTodo);
    localStorage.setItem('todos',JSON.stringify(newTodo))
}
    };
  return(
    <Container className="mt-3 text-center">
      <h3>TodoList</h3>
    <Form.Control 
    type='text' 
    value={text} 
    onChange={(e)=>setText(e.target.value)}
    onKeyPress={(e)=> e.key==='Enter' && addTodo()}
    />
     <br/>
    <Button onClick={addTodo}>
    <FaPlus/>
    <label className="ms-2">Add</label>
    </Button>
    <br/>
    <br/>
    {todoList.length>0? todoList.map((todo,index)=>{
      return(
        <Row>
      <Col  xs={10}>
        <Alert 
      variant={todo.isCompleted?'danger':'primary'}
      className="text-start" 
      style={{
       cursor:'pointer', 
      textDecoration:todo.isCompleted?'line-through':'none'}}
      onClick={()=>toggleTodoCompletetion(index)} >
        <h3>{todo.data}</h3>
      
      <small> {todo.date} </small>
      </Alert>
      </Col>
      <Col className="mt-4" >
      <FaTrash 
      size='40' 
      color="red" 
      onClick={()=>deleteTodo(index)}/>
      </Col>
      </Row>
      );
    })
   :'NoTodo'
  }
    </Container>
  )
}
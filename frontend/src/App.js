import { useEffect, useState } from "react";
import Popup from "./components/popup/Popup";
import Todo from "./components/Todo/Todo";
import AddIcon from "./icons/add.svg";
import SerachIcon from "./icons/search.svg";
import FormAdd from "./components/form/FormAdd";
import FormCard from "./components/form/FormCard";
import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000/"

function App() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [infoPopup, setInfoPopup] = useState({name: '', description: '', id: 0});
  const [todos, setTodos] = useState([])

  
  useEffect(() =>{
    const fetchTodos = async ()=>{
      const {data} = await axios.get(`${BASE_URL}todos/`);

      data.sort((first, second) => first.status < second.status  || first.status === 1 && second.status === 2 ? 1 : -1)
      setTodos(data)
    }
    fetchTodos()

  }, [])


  const handleAddTodo = () => {
    setIsOpenAdd(true);
  };

  const handleAddTodoSubmit = ({name, description}) => {
    setIsOpenAdd(false);
    const fetchTodoAdd = async ()=>{
      const {data} = await axios.post(`${BASE_URL}todos/`, {
        name: name,
        description: description,
        deleted: 0 ,
        status: 1
      });
      setTodos([data, ...todos])
    }
    fetchTodoAdd()

  }

  const handleClosePopups = () => {
    setIsOpenAdd(false);
    setIsOpenCard(false);
  };

  const handleOpenTodo = ({name, description, id}) => {
    setIsOpenCard(true);
    setInfoPopup({name: name, description: description, id: id})
    
  };

  const handleDelete = ({id, name, description}) =>{
    const fetchTodoDelete = async ()=>{
      const {data} = await axios.put(`${BASE_URL}todos/${id}/`, {
        id: id,
        deleted: 1,
        name: name,
        description: description
      });
      const newTodo  = todos.filter(todo => todo.id !== id);
      setTodos(newTodo)
    }
    fetchTodoDelete()
  }

  const handleOkTodo = ({id, status, name, description}) =>{
    console.log(status)
    const fetchTodoOk = async ()=>{
      const {data} = await axios.put(`${BASE_URL}todos/${id}/`, {
        status: status,
        name: name,
        description: description,
        deleted: 0,
      });
      
      if(status === 1){
        const newTodos = [data, ...todos.filter(item => item.id !== data.id)]
        setTodos(newTodos)
      } else if (status === 0){
        const newTodos = [...todos.filter(item => item.id !== data.id), data]
        setTodos(newTodos);
      }
      
    }
    fetchTodoOk();
  }

  const handleInstallTodo = ({name, description, id}) =>{
    setIsOpenCard(false);
    const fetchTodoInstall = async ()=>{
      const {data} = await axios.put(`${BASE_URL}todos/${id}/`, {
        name: name,
        description: description,
        deleted: 0,
      });
      setInfoPopup({name: '', description: ''})
      const newTodos = todos.filter(todo => todo.id !== id)
      if (data.status === 1 || (data.status === 2 )){
        setTodos([data, ...newTodos])
      } else if (data.status === 0){
        setTodos([...newTodos, data])
      }
    }
    fetchTodoInstall()
  }

  
  return (
    <div className="page__container">
      <h1 className="title">Todo List</h1>
      <div className="setting-block">
        <div className="search-block">
          <input type="text" placeholder="Найти задачу" className="input" />
          <button type="button" className="button">
            <img src={SerachIcon} alt="найти" className="icon" />
          </button>
        </div>
        <button className="button" type="button" onClick={handleAddTodo}>
          <img src={AddIcon} alt="добавить" className="icon" />
        </button>
      </div>
      <div className="todos-container">
        <ul className="todos-list">
          {todos?.map((todo) => (
            <li key={todo.id} className="todo-item">
              <Todo
                infoTodo={todo}
                handleNameClick={handleOpenTodo}
                onDelete={handleDelete}
                onOk = {handleOkTodo}
              />
            </li>
          ))}
        </ul>
      </div>
      <Popup
        isOpen={isOpenAdd}
        onClose={handleClosePopups}
        title="Добавить задачу"
        children={<FormAdd onSubmit={handleAddTodoSubmit} />}
      />
      <Popup
        isOpen={isOpenCard}
        onClose={handleClosePopups}
        title="Редактировать задачу"
        children={<FormCard info={infoPopup} handleOnSubmit={handleInstallTodo}/>}
      />
    </div>
  );
}

export default App;

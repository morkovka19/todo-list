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
  const [infoPopup, setInfoPopup] = useState({name: '', description: ''});
  const [todos, setTodos] = useState([])

  
  useEffect(() =>{
    const fetchTodos = async ()=>{
      const {data} = await axios.get(`${BASE_URL}todos/`);

      data.sort((first, second) => first.status < second.status ? 1 : -1)
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

  const handleDelete = ({id}) =>{
    const fetchTodoDelete = async ()=>{
      const {data} = await axios.delete(`${BASE_URL}todos/${id}`, {
        id: id
      });
      const newTodo  = todos.filter(todo => todo.id !== id);
      setTodos(newTodo)
    }
    fetchTodoDelete()
  }

  const handleOkTodo = ({id, status}) =>{
    const fetchTodoOk = async ()=>{
      const {data} = await axios.patch(`${BASE_URL}todos/${id}/`, {
        status: status
      });
      
      if(status){
        console.log(data)
        const newTodos = [data, ...todos.filter(item => item.id !== data.id)]
        setTodos(newTodos)
      } else{
        const newTodos = [...todos.filter(item => item.id !== data.id), data]
        setTodos(newTodos);
      }
    }
    fetchTodoOk()
  }

  const handleInstallTodo = ({name, description, id}) =>{
    setIsOpenCard(false);
    const fetchTodoInstall = async ()=>{
      const {data} = await axios.patch(`${BASE_URL}todos/${id}/`, {
        name: name,
        description: description
      });
      setInfoPopup({name: '', description: ''})
      const newTodos = todos.filter(todo => todo.id !== id)
      if (data.status){
        setTodos([data, ...newTodos])
      } else{
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
          <input type="text" placeholder="Найти дело" className="input" />
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

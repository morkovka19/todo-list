import DeleteIcon from "../../icons/delete.svg";
import OkIcon from "../../icons/ok.svg";
import "./todo.css";
import { useState } from "react";

export default function Todo({handleNameClick, onDelete, infoTodo, onOk}) {
  const [info, setInfo] = useState(infoTodo)
  const [status, setStatus] = useState(info.status)
  const [name, setName] = useState(info.name)
  const [description, setDescription] = useState(info.description)
  
  const clickOnName = () => {
    handleNameClick({name, description, id: infoTodo.id});
  };

  const handleDelete = ()=>{
    onDelete({id: info.id})
  }

  const handleOk = () =>{
    setStatus(!status);
    onOk({id: info.id, status: !status})
  }

  return (
    <div className={`todo ${!status ? 'todo_ok' : null}`}>
      <div className="todo-info-block">
        <p className="todo-name" onClick={clickOnName}>
          {info.name}
        </p>
        <p className="todo-description">{info.description}</p>
        <p className="todo-description-date">{info.created_at.split('T')[0].split('-').reverse().join('.')}</p>
        <p className="todo-description-time">{info.created_at.split('T')[1].split('.')[0]}</p>
      </div>
      <div className="todo-block-buttons">
        <button type="button" className="button" onClick={handleOk}>
          <img className="icon" src={OkIcon} alt="сделано" />
        </button>
        <button type="button" className="button" onClick={handleDelete}>
          <img className="icon" src={DeleteIcon} alt="удалить" />
        </button>
      </div>
    </div>
  );
}

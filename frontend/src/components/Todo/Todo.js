import DeleteIcon from "../../icons/delete.svg";
import OkIcon from "../../icons/ok.svg";
import "./todo.css";
import { useState } from "react";
import WorkInProcess from '../../icons/work-in-process.svg';
import UpdateIcon from '../../icons/update.svg'

export default function Todo({ handleNameClick, onDelete, infoTodo, onOk }) {
  const [info, setInfo] = useState(infoTodo)
  const [status, setStatus] = useState(info.status)
  const [name, setName] = useState(info.name)
  const [description, setDescription] = useState(info.description)


  const clickOnName = () => {
    handleNameClick({ name, description, id: infoTodo.id, status });
  };

  const handleDelete = () => {
    setStatus(0)
    onDelete({ id: info.id, name, description })
  }

  const handleOk = () => {
    setStatus(0)
    onOk({ id: info.id, status: 0, name: name, description: description })
  }


  const handleWorkInProcess = () =>{
    setStatus(2);
    onOk({ id: info.id, status: 2, name: name, description: description });
  }

  const handleOpen =() =>{
    setStatus(1);
    onOk({ id: info.id, status: 1, name: name, description: description });
  }

  return (
    <div className={`todo ${status === 0  && 'todo_ok'} ${status === 2 && 'todo_work-on-status'}`}>
      <div className="todo-info-block">
        <p className="todo-name" onClick={clickOnName}>
          {info.name}
        </p>
        <p className="todo-description">{info.description}</p>
        <p className="todo-description-date">{info.created_at.split('T')[0].split('-').reverse().join('.')}</p>
        <p className="todo-description-time">{info.created_at.split('T')[1].split('.')[0]}</p>
      </div>
      <div className="todo__status">{`${status === 0 ? 'Решена' : ''} ${status === 1 ? 'Открыта' : ''} ${status === 2 ? 'В работе' : ''} `}</div>
      <div className="todo-block-buttons">
        <button type="button" className="button" onClick={handleOk}>
          <img className="icon" src={OkIcon} alt="сделано" />
        </button>
        <button type="button" className="button" onClick={handleWorkInProcess}>
          <img className="icon" src={WorkInProcess} alt="сделано" />
        </button>
        <button type="button" className="button" onClick={handleDelete}>
          <img className="icon" src={DeleteIcon} alt="удалить" />
        </button>
        <button type="button" className="button" onClick={handleOpen}>
          <img className="icon" src={UpdateIcon} alt="обновить" />
        </button>
        
      </div>
    </div>
  );
}

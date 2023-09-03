import { useState } from "react";
import "./form.css";

export default function FormAdd({ onSubmit }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')


  const handleOnSubmit = (e) => {
    e.preventDefault();
    setName('')
    setDescription('')
    onSubmit({name, description});
  }

  const handleChangeName = (e) =>{
    e.preventDefault();
    setName(e.target.value)
  }

  const handleChangeDescription = (e) =>{
    e.preventDefault();
    setDescription(e.target.value)
  }

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          placeholder="Название"
          name="name"
          id="name"
          onChange={handleChangeName}
          value={name}
          required
        />
        <input
          className="form__input"
          type="text"
          placeholder="Описание"
          name="description"
          id="description"
          onChange={handleChangeDescription}
          value={description}
          required
        />
      </fieldset>
      <button type="submit" className="form__submit">
        Добавить
      </button>
    </form>
  );
}

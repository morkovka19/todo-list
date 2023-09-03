import { useState } from "react";

export default function FormCard({handleOnSubmit, info}) {
  const [name, setName] = useState(info.name);
  const [description, setDescription] = useState(info.description);
  
  const handleChangeName = (e) =>{
    e.preventDefault();
    setName(e.target.value)
  }
  
  const handleChangeDescription = (e) =>{
    e.preventDefault();
    setDescription(e.target.value);
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    setName('');
    setDescription('')
    handleOnSubmit({name, description, id: info.id})
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          placeholder="Название"
          name="name"
          id="name"
          value={name}
          onChange={handleChangeName}
          required
        />
        <input
          className="form__input"
          type="text"
          placeholder="Описание"
          name="description"
          id="description"
          value={description}
          onChange={handleChangeDescription}
          required
        />
      </fieldset>
      <button type="submit" className="form__submit">
        Редактировать
      </button>
    </form>
  );
}

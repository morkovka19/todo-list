import CloseIcon from "../../icons/close.svg";
import "./popup.css";

export default function PopupWithForm({
  name,
  onClose,
  title,
  onSubmit,
  nameButton,
  isOpen,
  children,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <button className="popup__btn button" onClick={onClose} type="reset">
          <img className="icon" src={CloseIcon} alt="иконка крестик" />
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

// import { nanoid } from 'nanoid'
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ol className={css.list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={css.link}>
          {name} : {number}
          <button
            type="button"
            onClick={() => onDeleteContact(id)}
            className={css.btn}
          >
            delete
          </button>
        </li>
      ))}
    </ol>
  );
};

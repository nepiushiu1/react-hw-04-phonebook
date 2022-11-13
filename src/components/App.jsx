import css from './App.module.css';

import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contact')) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const hadleSubmit = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExistContact = contacts.find(
      newContact => newContact.name === contact.name
    );

    if (isExistContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const getFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm hadleSubmit={hadleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <ContactList
        onDeleteContact={deleteContact}
        contacts={getFilterContacts()}
      />
    </div>
  );
};
export default App;

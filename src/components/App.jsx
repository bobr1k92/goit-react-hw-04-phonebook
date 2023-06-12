import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Container from './GlobalContainer/Container';
import { Form } from './Form/Form';
import SearchContact from './SearchContact/SearchContact';
import { ContactList } from './ContactList/ContactList';
import initialContacts from './contacts.json';

export const App = () => {
  const getInitialContacts = () => {
    const saveContacts = localStorage.getItem('contacts');
    if (saveContacts !== null) {
      return JSON.parse(saveContacts);
    } else {
      return initialContacts;
    }
  };
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkContactName = checkedName => {
    const result = contacts.find(
      contact => contact.name.toLowerCase() === checkedName.toLowerCase()
    );
    return result;
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (checkContactName(name)) {
      return alert(`This contact ${contact.name} is already in the phonebook`);
    }

    setContacts([contact, ...contacts]);
  };

  const searchContact = e => {
    setFilter(e.currentTarget.value);
  };

  const checkSearchContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(item => item.id !== contactId));
  };

  const filterContact = checkSearchContact();

  return (
    <Container>
      <h2>Phonebook</h2>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <SearchContact value={filter} onSearch={searchContact} />
      <ContactList contacts={filterContact} onDelete={deleteContact} />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts,
//     filter: '',
//   };

//   checkContactName = checkedName => {
//     const { contacts } = this.state;
//     const result = contacts.find(
//       contact => contact.name.toLowerCase() === checkedName.toLowerCase()
//     );
//     return result;
//   };

//   addContact = ({ name, number }) => {
//     if (this.checkContactName(name)) {
//       return alert(`This contact ${name} is already in the phonebook`);
//     }

//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   searchContact = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   checkSearchContact = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);

//     if (contacts === null) {
//       this.setState(this.state.contacts);
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     } else {
//       this.setState({ contacts: parseContacts, ...contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const contactSearchResult = this.checkSearchContact();

//     return (
//       <Container>
//         <h2>Phonebook</h2>
//         <Form onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <SearchContact value={filter} onSearch={this.searchContact} />
//         <ContactList
//           contacts={contactSearchResult}
//           onDelete={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }

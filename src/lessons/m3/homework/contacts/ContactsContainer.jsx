/* eslint-disable */
import React, { useEffect, useState } from "react";

import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";

export const ContactsContainer = ({ service }) => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    service.getContacts().then((contacts) => {
      console.log("get", contacts);
      setContacts(contacts);
    });
  }, [service]);

  const newContact = () => {
    setSelected({
      name: "",
      details: "",
    });
  };

  const onSelect = (contact) => {
    console.log("onChange", contact);
    setSelected(contact);
  };

  const onSubmit = () => {
    console.log("contact", selected);
    service.saveContact(selected).then(() => {
      service.getContacts().then((contacts) => {
        setContacts(contacts);
      });
    });
  };

  const onCancel = () => {
    setSelected(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Contacts</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <ContactList
            contacts={contacts}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
        <div className="col-md-4">
          {selected ? (
            <ContactForm
              contact={selected}
              onChange={onSelect}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          ) : (
            <div>
              <button
                id="new-contact"
                onClick={newContact}
                className="btn btn-primary"
              >
                New contact
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Class Component
// export class ContactsContainerC extends React.Component {

//   constructor(props) {
//     super(props);

//     // ContactsService object
//     this.service = this.props.service;

//     this.state = {
//       contacts: [],
//       selected: null
//     };

//     this.service.getContacts().then((contacts) => {
//       this.setState({
//         contacts
//       });
//     });
//   }

//   newContact = () => {
//     this.setState({
//       selected: {
//         name: '',
//         details: ''
//       }
//     });
//   }

//   onSelect = (contact) => {
//     this.setState({
//       selected: contact
//     });
//   }

//   onSubmit = (contact) => {
//     this.service.saveContact(contact).then(()=>{
//       this.service.getContacts().then((contacts) => {
//         this.setState({
//           contacts
//         });
//       });
//     });
//   }

//   onCancel = () => {
//     this.setState({
//       selected: null
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <h1>Contacts</h1>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-4">
//             <ContactList
//               contacts={this.state.contacts}
//               selected={this.state.selected}
//               onSelect={this.onSelect}
//             />
//           </div>
//           <div className="col-md-4">
//             {this.state.selected
//             ? (
//               <ContactForm contact={this.state.selected}
//                 onChange={this.onSelect}
//                 onSubmit={this.onSubmit}
//                 onCancel={this.onCancel}
//               />
//             ) : (
//               <div>
//                 <button id="new-contact" onClick={this.newContact} className="btn btn-primary">New contact</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

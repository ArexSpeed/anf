/* eslint-disable */
import React, { useState } from "react";

export const ContactForm = ({ contact, onChange, onSubmit, onCancel }) => {
  const { name, details } = contact;
  const [value, setValue] = useState(contact);

  const handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    console.log(contact, name, value);
    onChange({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="d-block w-100">
          Name:
          <input
            className="form-control"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="d-block w-100">
          Contact details:
          <textarea
            className="form-control"
            name="details"
            value={details}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <input
          type="button"
          id="cancel-contact"
          className="btn btn-default"
          value="Cancel"
          onClick={onCancel}
        />
        <input
          type="submit"
          id="save-contact"
          className="btn btn-primary ml-2"
          value="Save"
        />
      </div>
    </form>
  );
};

// Class Component
// export class ContactForm extends React.Component {

//   static defaultProps = {
//     contact: {
//       name: '',
//       details: ''
//     }
//   }

//   onChange = (e) => {
//     let target = e.target;
//     let name = target.name;
//     let value = target.type === "checkbox" ? target.checked : target.value;

//     this.props.onChange({
//       ...this.props.contact,
//       [name]: value
//     });
//   }

//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.props.contact);
//   }

//   render() {
//     return (
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group">
//           <label className="d-block w-100">
//             Name:
//             <input
//               className="form-control"
//               name="name"
//               value={this.props.contact.name}
//               onChange={this.onChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label className="d-block w-100">
//             Contact details:
//             <textarea
//               className="form-control"
//               name="details"
//               value={this.props.contact.details}
//               onChange={this.onChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <input
//             type="button"
//             id="cancel-contact"
//             className="btn btn-default"
//             value="Cancel"
//             onClick={this.props.onCancel}
//           />
//           <input
//             type="submit"
//             id="save-contact"
//             className="btn btn-primary ml-2"
//             value="Save"
//           />
//         </div>
//       </form>
//     );
//   }
// }

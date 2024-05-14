import React from 'react'

const ContactList = ({ contacts, onEditContact, onDeleteContact }) => {
  return (
    <div>
      <div class="vertical-space"></div>
      <div class="vertical-space"></div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button onClick={() => onEditContact(contact)}>Update</button>
                <button onClick={() => onDeleteContact(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="vertical-space"></div>
    </div>
  )
}

export default ContactList

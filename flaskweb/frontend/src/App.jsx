import { useState, useEffect } from 'react'
import './App.css'
import ContactList from "./contact_list.jsx"
import ContactForm from "./contact_form.jsx"

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)  // State for editing contact
  const [deleteContact, setDeleteContact] = useState(null)  // State for contact to be deleted

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      console.log("Fetched contacts: ", data.contacts)
      setContacts(data.contacts)  // Directly set the fetched contacts
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingContact(null)
  }

  const openCreateModal = () => {
    setIsModalOpen(true)
    setEditingContact(null)
  }

  const openEditModal = (contact) => {
    setIsModalOpen(true)
    setEditingContact(contact)
  }

  const openDeleteModal = (contact) => {
    setDeleteContact(contact)
  }

  const closeDeleteModal = () => {
    setDeleteContact(null)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${deleteContact.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContacts(contacts.filter(contact => contact.id !== deleteContact.id))
      setDeleteContact(null)
    } catch (error) {
      console.error("Failed to delete contact:", error)
    }
  }

  console.log("App rendered with contacts: ", contacts)

  return (
    <>
      <header>
        <h1>Contact List</h1>
      </header>
      <main>
        <div>
          <ContactList contacts={contacts} onEditContact={openEditModal} onDeleteContact={openDeleteModal} />
          <button onClick={openCreateModal}>Create New Contact</button>
        </div>
      </main>
      {isModalOpen && (
        <div className='modal'>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm
              initialData={editingContact}
              onClose={closeModal}
              fetchContacts={fetchContacts}
            />
          </div>
        </div>
      )}
      {deleteContact && (
        <div className='modal'>
          <div className="modal-content">
            <span className="close" onClick={closeDeleteModal}>&times;</span>
            <p>Are you sure you want to delete the contact "{deleteContact.firstName} {deleteContact.lastName}"?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={closeDeleteModal}>X</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App

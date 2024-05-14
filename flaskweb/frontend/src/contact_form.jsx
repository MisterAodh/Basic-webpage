import { useState, useEffect } from "react"

const ContactForm = ({ initialData, onClose, fetchContacts }) => {
  const [firstName, setFirstName] = useState(initialData ? initialData.firstName : "")
  const [lastName, setLastName] = useState(initialData ? initialData.lastName : "")
  const [email, setEmail] = useState(initialData ? initialData.email : "")

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName)
      setLastName(initialData.lastName)
      setEmail(initialData.email)
    }
  }, [initialData])

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      firstName,
      lastName,
      email
    }

    const url = initialData
      ? `http://127.0.0.1:5000/update_contact/${initialData.id}`
      : "http://127.0.0.1:5000/create_contacts"

    const options = {
      method: initialData ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    const message = await response.json()

    if (response.status !== 201 && response.status !== 200) {
      alert(message.message)
    } else {
      alert(initialData ? "Contact updated successfully!" : "Contact created successfully!")
      fetchContacts()
      onClose()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{initialData ? "Update Contact" : "Create Contact"}</button>
    </form>
  )
}

export default ContactForm

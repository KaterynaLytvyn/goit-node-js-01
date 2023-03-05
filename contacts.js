const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join('db', 'contacts.json')

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    return contacts
    
  } catch (error) {
    return error.message
  }

  }
  
  async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      const contact = contacts.find(i => i.id == contactId)
      if(!contact){
          return null
      }
  
      return contact  

    } catch (error) {
      return error.message
    }
  }
  
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const contactIdx = contacts.findIndex(i => i.id == contactId)

      if(contactIdx >= 0) {
        const newContacts = contacts.filter(i => i.id != contactId)
  
        await fs.writeFile(contactsPath, JSON.stringify(newContacts))
        return contacts[contactIdx]
      }

      else {
        return null
      }
      

    } catch (error) {
      return error.message      
    }
  }
  
  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const contact = {
          "id": uuidv4(),
          "name": name,
          "email": email,
          "phone": phone
      }
      contacts.push(contact)
      await fs.writeFile(contactsPath, JSON.stringify(contacts))
      return contact
      
    } catch (error) {
      return error.message 
    }

  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}


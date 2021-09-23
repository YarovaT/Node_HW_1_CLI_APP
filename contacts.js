const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
};

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(result);
    return contacts;
  } catch (err) {
    throw err;
  }
};

// TODO: задокументировать каждую функцию
function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
}

function removeContact(contactId) {}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };

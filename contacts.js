// --unhandled-rejections=strict
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const chalk = require("chalk");

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

async function listContacts() {
  console.table(await readContacts());
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (contact) {
    console.log(chalk.green("Contact is found!"));
    console.table(contact);
  } else {
    console.log(chalk.red("Contact is not found!"));
  }
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  console.table(filteredContacts);
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  contacts.push({
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(chalk.green("New Contact added"));
  console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

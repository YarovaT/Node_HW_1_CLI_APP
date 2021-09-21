const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, content) => {
    if (err) {
      throw err;
    }
    console.log(content);
  });
}

console.log(listContacts());

function getContactById(contactId) {
  // ...твой код
}

//   function removeContact(contactId) {
//     // ...твой код
//   }

//   function addContact(name, email, phone) {
//     // ...твой код
//   }

const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");
const { Command } = require("commander");


const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const result = await listContacts()
      console.table(result)
      break;

    case "get":
      const contact = await getContactById(id)
      if (contact){
        console.log("contact:", contact)
      }
      else {
        console.log("no contact found with id", id)
      }
      break;

    case "add":
      const addedContact = await addContact(name, email, phone)
      console.log("addedContact:", addedContact)
      break;

    case "remove":
      const removedContact = await removeContact(id)
      if (removedContact) {
        console.log("removedContact:", removedContact)
      }
      else {
        console.log("no contact found with id", id)
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


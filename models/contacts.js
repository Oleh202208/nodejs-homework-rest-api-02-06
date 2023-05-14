const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contscts = await fs.readFile(contactsPath);
  return JSON.parse(contscts);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const result = contactList.find((contact) => contact.id === contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  return result || null;
};

const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  contactList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const editedContact = contactList.find((contact) => contact.id === contactId);
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  editedContact.name = body.name;
  editedContact.email = body.email;
  editedContact.phone = body.phone;
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return editedContact;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((contact) => contact.id === contactId);
  if (!index === -1) {
    throw new HttpError(404, "Not found");
  }
  const [removedContact] = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

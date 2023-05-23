const { HttpError } = require("../utils/HttpError");
const { Contact } = require("../models/contacts");

const listContacts = async () => {
  const contscts = await Contact.find({}, "-createdAt -updateAt");
  return contscts;
};

const getContactById = async (contactId) => {
  const result = Contact.findById(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  return result || null;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const editedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  return editedContact;
};

const updateStatusContact = async (contactId, body) => {
  const editedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  return editedContact;
};

const removeContact = async (contactId) => {
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw new HttpError(404, "Not found");
  }
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
};

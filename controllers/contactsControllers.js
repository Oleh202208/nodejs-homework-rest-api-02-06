const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const ctrWrapper = require("../decorators/ctrWrapper");

const getallContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const editedContact = await updateContact(contactId, req.body);
  res.status(200).json(editedContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: "contact delete" });
};

module.exports = {
  listContacts: ctrWrapper(getallContacts),
  getContactById: ctrWrapper(getContact),
  addContact: ctrWrapper(createContact),
  updateContact: ctrWrapper(changeContact),
  removeContact: ctrWrapper(deleteContact),
};

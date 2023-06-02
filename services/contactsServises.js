const { HttpError } = require("../utils/HttpError");
const { Contact } = require("../models/contacts");

const listContacts = async (user, query) => {
  const { _id: owner } = user;
  const defaultFavorite = { $in: [true, false] };
  const { page = 1, limit = 10, favorite = defaultFavorite } = query;
  const skip = (page - 1) * limit;

  const contscts = await Contact.find(
    { owner, favorite },
    "-createdAt -updateAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  return contscts;
};

const getContactById = async (contactId) => {
  const result = Contact.findById(contactId);
  if (!result) {
    throw new HttpError(404);
  }
  return result || null;
};

const addContact = async (body, user) => {
  const { _id: owner } = user;
  const newContact = await Contact.create(...body, owner);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const editedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404);
  }
  return editedContact;
};

const updateStatusContact = async (contactId, body) => {
  const editedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404);
  }
  return editedContact;
};

const removeContact = async (contactId) => {
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw new HttpError(404);
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

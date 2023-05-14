const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contactsControllers");
const { contactSchema } = require("../../schema/contactSchema");
const validateContact = require("../../decorators/validateContact");

const router = express.Router();

router
  .route("/")
  .get(listContacts)
  .post(validateContact(contactSchema), addContact);
router
  .route("/:contactId")
  .get(getContactById)
  .put(validateContact(contactSchema), updateContact)
  .delete(removeContact);

module.exports = router;

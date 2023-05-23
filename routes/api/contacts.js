const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../controllers/contactsControllers");

const { contactSchema } = require("../../schema/contactSchema");
const validateContact = require("../../decorators/validateContact");
const isValidId = require("../../decorators/isValidld");
const { updateFavoriteSchema } = require("../../schema/updateFavoriteSchema");

const router = express.Router();

router
  .route("/")
  .get(listContacts)
  .post(validateContact(contactSchema), addContact);
router
  .route("/:contactId")
  .get(isValidId, getContactById)
  .put(isValidId, validateContact(contactSchema), updateContact)
  .delete(isValidId, removeContact);
router
  .route("/:contactId/favorite")
  .patch(isValidId, validateContact(updateFavoriteSchema), updateStatusContact);

module.exports = router;

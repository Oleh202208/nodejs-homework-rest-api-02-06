const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../controllers/contactsControllers");

const contactSchema = require("../../schema/contactSchema");
const validateSchema = require("../../decorators/validateSchema");
const isValidId = require("../../decorators/isValidld");
const updateFavoriteSchema = require("../../schema/updateFavoriteSchema");
const authEnticate = require("../../decorators/authenticate");

const router = express.Router();

router
  .route("/")
  .get(authEnticate, listContacts)
  .post(authEnticate, validateSchema(contactSchema), addContact);
router
  .route("/:contactId")
  .get(authEnticate, isValidId, getContactById)
  .put(authEnticate, isValidId, validateSchema(contactSchema), updateContact)
  .delete(authEnticate, isValidId, removeContact);
router
  .route("/:contactId/favorite")
  .patch(
    authEnticate,
    isValidId,
    validateSchema(updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;

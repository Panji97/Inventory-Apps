var express = require("express");
var router = express.Router();

const propertyController = require("./../controllers/property.controller");

/* GET home page. */
router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(propertyController.createProperty);

router
  .route("/:id")
  .get(propertyController.getPropertyDetail)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;

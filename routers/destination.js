const { ApiEndpoints } = require("../common/apiEndpoints")
const DestinationControlles = require("../controlles/destination")
const router = require("express").Router()

// // update
// router.post(ApiEndpoints.DestinationEndpoints.update , DestinationControlles.Update)

// get
router.get(ApiEndpoints.DestinationEndpoints.get , DestinationControlles.Get)

module.exports = router
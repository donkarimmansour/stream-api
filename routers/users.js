const { ApiEndpoints } = require("../common/apiEndpoints")
const UserControlles = require("../controlles/users")
const router = require("express").Router()


// signup
router.post(ApiEndpoints.UserEndpoints.register, UserControlles.Register)

// login
router.post(ApiEndpoints.UserEndpoints.login , UserControlles.Login) 


// compareCode code
router.post(ApiEndpoints.UserEndpoints.compare , UserControlles.compareCode) 


// Update
router.post(ApiEndpoints.UserEndpoints.update , UserControlles.Update) 

// broadcastAccess
router.get(ApiEndpoints.UserEndpoints.access, UserControlles.broadcastAccess)
 
// User Went Live
router.post(ApiEndpoints.UserEndpoints.UserWentLive, UserControlles.UserWentLive)

module.exports = router 
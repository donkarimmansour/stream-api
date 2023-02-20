const UsersModel = require("../services/users")
const codes = require("../common/codes")


// Register
const Register = (req, res) => {
    const { email} = req.body ;

    UsersModel.Register( email).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    }) 
}

// Login
const Login = (req, res) => {
    const { email} = req.body ;

    UsersModel.Login( email).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// compare Code
const compareCode = (req, res) => {
    const { id , code} = req.body ;

    UsersModel.compareCode( id , code).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// Update
const Update = (req, res) => {
    const {id ,  youtubeAuthBool , facebookAuthBool} = req.body ;

    UsersModel.Update( id , youtubeAuthBool , facebookAuthBool).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}



// broadcastAccess
const broadcastAccess = (req, res) => {
    const { id} = req.params ;

    UsersModel.broadcastAccess( id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// User Went Live
const UserWentLive = (req, res) => {
    const { email , destinations } = req.body ;

    UsersModel.UserWentLive( email , destinations).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}




module.exports = { Login , Register , broadcastAccess , Update , compareCode , UserWentLive }
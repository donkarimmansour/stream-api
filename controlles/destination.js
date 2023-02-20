const DestinationModel = require("../services/destination")
const codes = require("../common/codes")


// Update
// const Update = (req, res) => {
//     const { userId , youtubeAccessToken} = req.query ;

//     DestinationModel.Update( userId , youtubeAccessToken).then(result => {
//         res.status(codes.ok).json({err: false, msg : result})
//     }).catch(result => {
//         res.status(codes.badRequest).json({err: true, msg : result})
//     })
// }
 
 
// Get
const Get = (req, res) => {
    const { id } = req.params ;
    
    DestinationModel.Get( id ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}
 


module.exports = { Get}
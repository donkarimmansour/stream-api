const YoutubeModel = require("../services/youtube")
const codes = require("../common/codes")


// Authorize
const Authorize = (req, res) => { 
    const { id, code } = req.body

    YoutubeModel.Authorize(id, code).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {        
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// Refresh
const Refresh = (req, res) => { 
    const { id, refreshToken } = req.body

    YoutubeModel.Refresh(id, refreshToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// ViewCount
const ViewCount = (req, res) => { 
    const { youtubeBroadcastId, youtubeAccessToken } = req.body

    YoutubeModel.ViewCount(youtubeBroadcastId, youtubeAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// Broadcast
const Broadcast = (req, res) => { 
    const { id ,youtubeRefreshToken ,  youtubeBroadcastTitle, youtubeBroadcastDescription, youtubePrivacyPolicy, youtubeAccessToken } = req.body

    YoutubeModel.Broadcast(id , youtubeRefreshToken , youtubeBroadcastTitle, youtubeBroadcastDescription, youtubePrivacyPolicy, youtubeAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// Live
const Live = (req, res) => { 
    const { youtubeBroadcastId, youtubeAccessToken } = req.body

    YoutubeModel.Live(youtubeBroadcastId, youtubeAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// End
const End = (req, res) => { 
    const { youtubeBroadcastId, youtubeAccessToken } = req.body

    YoutubeModel.End(youtubeBroadcastId, youtubeAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {

        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// // Update
// const Update = (req, res) => { 
//     const {id, youtubeAccessToken} = req.body

//     YoutubeModel.Update(id, youtubeAccessToken).then(result => {
//         res.status(codes.ok).json({err: false, msg : result})
//     }).catch(result => {
//         res.status(codes.badRequest).json({err: true, msg : result})
//     })
// }

 
// Remove
const Remove = (req, res) => { 
    const {id} = req.body

    YoutubeModel.Remove(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


module.exports = { Broadcast , ViewCount , End , Live , Refresh , Authorize , Remove }
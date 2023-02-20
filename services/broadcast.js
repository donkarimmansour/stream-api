const BroadcastRquest = require("../models/broadcasts")

// create
const Create = (youtubeTitle, youtubeDescription, youtubePrivacyPolicy, youtubeDestinationUrl,
    youtubeBroadcastId, youtubeStreamId, facebookTitle, facebookDescription, facebookLiveVideoId,
    facebookDestinationUrl, id, customRtmpServer, customRtmpStreamKey) => {

    return new Promise(async (resolve, reject) => {

            //update        
            BroadcastRquest.updateOne({}, {
                youtube_title : youtubeTitle, youtube_description : youtubeDescription, youtube_privacy_policy : youtubePrivacyPolicy,
                youtube_destination_url : youtubeDestinationUrl, user_id : id, youtube_broadcast_id : youtubeBroadcastId,
                youtube_stream_id :  youtubeStreamId, facebook_title : facebookTitle, facebook_description : facebookDescription,
                facebook_live_video_id : facebookLiveVideoId, facebook_destination_url : facebookDestinationUrl, 
                custom_rtmp_server : customRtmpServer, custom_rtmp_stream_key : customRtmpStreamKey
            } , { upsert : true } , (errUpdate, doc) => {

                if (errUpdate){ 
                    reject(errUpdate)
                }else if (doc.modifiedCount > 0 || doc.upsertedCount > 0) {
                    resolve(id)

                } else {
                    reject("something went wrong")
                }
    
            }).where("user_id").equals(id)


       })

}

//get
const Get = (id) => {

    return  new Promise((resolve, reject) => {

        BroadcastRquest.findOne({}, (errFind, broadcast) => {

            if (errFind) {
                reject(errFind)
            }else if (!broadcast) {
                reject("there is no broadcast")
            }else {
               resolve(broadcast) 
            }  
            
        }).where("user_id").equals(id)   
    })

}


module.exports = { Create , Get }
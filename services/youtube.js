const axios = require("axios")
const codes = require("../common/codes")
const DestinationsRquest = require("../models/destinations")
 
// authorize
const Authorize = (id, code) => {
    return new Promise( (resolve, reject) => {
       
        const dataString = `code=${code}&client_id=${process.env.YOUTUBE_CLIENT_ID}&client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&redirect_uri=${process.env.YOUTUBE_REDIRECT_URL}&grant_type=authorization_code`
       
       axios.post(`https://accounts.google.com/o/oauth2/token`, dataString)
        .then((res) => { 
         const { access_token , refresh_token } = res.data

                    //update        
                    DestinationsRquest.updateOne({}, {
                        user_id : id  ,youtube_access_token : access_token ,  youtube_refresh_token : refresh_token
                    }, { upsert : true }, (errUpdate, doc) => {
                        if (errUpdate){ 
                            reject(errUpdate)
                        }else if (doc.modifiedCount > 0 || doc.upsertedCount > 0) {
                            resolve(res.data)

                        } else {
                            reject("something went wrong")
                        }
            
                    }).where("user_id").equals(id)
       

         }).catch((err) => {  reject(err) })

    })
}



// View Count
const ViewCount = (youtubeBroadcastId, youtubeAccessToken) => {
    return new Promise( (resolve, reject) => {

        const config = {
            headers: {
              Authorization: `Bearer ${youtubeAccessToken}`,
              Accept: 'application/json',
            },
          }

       axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2C%20status&id=${youtubeBroadcastId}&key=${process.env.GOOGLE_API_KEY}`, config)
        .then((res) => {
            console.log(res.data.items[0].statistics.viewCount)
            resolve({ views: res.data.items[0].statistics.viewCount })
        })
        .catch((err) => { reject(err) })

    })
}

// broadcast
const Broadcast = (id , youtubeRefreshToken ,  youtubeBroadcastTitle, youtubeBroadcastDescription, youtubePrivacyPolicy, youtubeAccessToken) => {
    return new Promise( (resolve, reject) => {
    
        const data = {
            snippet: {
                title: youtubeBroadcastTitle,
                scheduledStartTime: `${new Date().toISOString()}`,
                description: youtubeBroadcastDescription,
            },
            contentDetails: {
                recordFromStart: true,
                enableAutoStart: true,
                enableAutoStop: true,
                // enableAutoStart: false,
                // enableAutoStop: false,
                monitorStream: { enableMonitorStream: false },
            },
            status: {
                privacyStatus: youtubePrivacyPolicy,
                selfDeclaredMadeForKids: true,
            },
        }

        const data2 = {
            snippet: {
                title: youtubeBroadcastTitle,
                description: youtubeBroadcastDescription,
            },
            cdn: {
                format: '',
                ingestionType: 'rtmp',
                frameRate: 'variable',
                resolution: 'variable',
            },
            contentDetails: { isReusable: true },
        }


        const config = {
            headers: {
                Authorization: `Bearer ${youtubeAccessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }



       axios.post(`https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=${process.env.GOOGLE_API_KEY}`, data, config)
            .then((res) => {

                console.log('youtube broadcast id ' + res.data.id)
                const youtubeBroadcastId = res.data.id

               axios.post(`https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&key=${process.env.GOOGLE_API_KEY}`, data2, config)
                    .then((res) => {
                        const { ingestionAddress, streamName } = res.data.cdn.ingestionInfo
                        const youtubeStream = {
                            id: res.data.id,
                            youtubeDestinationUrl: ingestionAddress + '/' + streamName,
                        }

                       axios.post(`https://youtube.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${youtubeBroadcastId}&part=snippet&streamId=${youtubeStream.id}&access_token=${youtubeAccessToken}&key=${process.env.GOOGLE_API_KEY}`, config)
                            .then((res) => {

                                resolve({
                                    youtubeDestinationUrl: youtubeStream.youtubeDestinationUrl,
                                    youtubeBroadcastId: youtubeBroadcastId,
                                    youtubeStreamId: youtubeStream.id
                                })

                            }).catch((err) => {reject(err)})

                    }).catch((err) => {reject(err)})

            }).catch((err) => {
                
                
                if(err?.response?.data?.error?.code === codes.unauthorized){
                    Refresh(id , youtubeRefreshToken).then(res => {
                         console.log('init ref err')
                    }).catch(lerr => {
                        reject(lerr)
                    })
                }else{
                    reject(err)
                }
                
         
            
            })
                 

    })
}



// Live
const Live = (youtubeBroadcastId, youtubeAccessToken) => {
    
    return new Promise( (resolve, reject) => {


        const data = `broadcastStatus=live&id=${youtubeBroadcastId}&part=id,status`

        
        const config =  {
            headers: {
                Authorization: `Bearer ${youtubeAccessToken}`,
                Accept: 'application/json',
            },
        }
        
       axios.post(`https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition` , data  ,  config)
        .then((res) => { resolve('youtube going live') })
        .catch((err) => { reject(err.response.data) })

    })
}


// End
const End = (youtubeBroadcastId, youtubeAccessToken) => {
    return new Promise( (resolve, reject) => {

        const data = `broadcastStatus=complete&id=${youtubeBroadcastId}&part=snippet,status`

        const config = {
            headers: {
                Authorization: `Bearer ${youtubeAccessToken}`,
                Accept: 'application/json',
            },
        }

       axios.post(`https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition` , data ,  config)
        .then((res) => { resolve('youtube live stream ended') })
        .catch((err) => { reject(err.response.data) })

    })
}


 
// refresh
const Refresh = (id, refreshToken) => {
    return new Promise(async (resolve, reject) => {
       
        const dataString = `client_id=${process.env.YOUTUBE_CLIENT_ID}&client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`

       axios.post(`https://accounts.google.com/o/oauth2/token`, dataString)
        .then((res) => { 

            const { access_token } = res.data

            DestinationsRquest.findOne({}, (errFind, destination) => {
                if (errFind) 
                    reject(errFind) 
                if (!destination) {
                    reject("id not exist")
                } else {
        
                    //update        
                    DestinationsRquest.updateOne({}, {
                        youtube_access_token : access_token 
                    }, (errUpdate, doc) => {
                        if (errUpdate){ 
                            reject(errUpdate)
                            return
                        }
                        
                        if (doc.modifiedCount > 0) {
                            resolve(access_token)

                        } else {
                            reject("something went wrong")
                        }
            
                    }).where("user_id").equals(id)
                }
        
            }).where("user_id").equals(id)

         })
        .catch((err) => { 
            console.log("ref err");
            reject(err)
        
        })

    })
}


 
// // Update
// const Update = (id, youtubeAccessToken) => {
//     return new Promise(async (resolve, reject) => { 
         
//             //update        
//             DestinationsRquest.updateOne({}, {
//                 user_id : id , youtube_access_token : youtubeAccessToken
//             } , { upsert : true } , (errUpdate, doc) => {
//                 if (errUpdate){ 
//                     reject(errUpdate)
//                 }else if (doc.modifiedCount > 0 || doc.upsertedCount > 0) {
//                     resolve("ok")

//                 } else {
//                     reject("something went wrong")
//                 }
    
//         }).where("user_id").equals(id)


//     })
// }

 
// Remove
const Remove = (id) => {
    return new Promise(async (resolve, reject) => { 
         
        DestinationsRquest.findOne({}, (errFind, destination) => {
            if (errFind) 
                reject(errFind) 
            if (!destination) {
                reject("id not exist")
            } else {
                
                //update        
                DestinationsRquest.updateOne({}, {
                    youtube_access_token : null 
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate)
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("Youtube access token removed")

                    } else {
                        reject("something went wrong")
                    }
        
                }).where("user_id").equals(id)
            }
    
        }).where("user_id").equals(id)


    })
}


module.exports = { Broadcast , ViewCount , End , Live , Refresh , Authorize , Remove }

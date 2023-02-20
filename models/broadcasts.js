const mongoose = require("mongoose")

const BroadcastSchema = mongoose.Schema({

    user_id: { 
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    
    youtube_title: {  
        type: String,
        required: false,
        trim: true,
    },
    youtube_description: { 
        type: String,
        required: false,
        trim: true,
    },
    youtube_privacy_policy: { 
        type: String,
        required: false,
        trim: true,
    },
    youtube_broadcast_id: { 
        type: String,
        required: false,
        trim: true,
    },
    youtube_stream_id: { 
        type: String,
        required: false,
        trim: true,
    },
    youtube_destination_url: { 
        type: String,
        required: false,
        trim: true,
    },


    facebook_title: { 
        type: String,
        required: false,
        trim: true,
    },

    facebook_description: { 
        type: String,
        required: false,
        trim: true,
    },

    facebook_live_video_id: { 
        type: String,
        required: false,
        trim: true,
    },

    facebook_destination_url: { 
        type: String,
        required: false,
        trim: true,
    },

    broadcast_time_created: {
        type: Date,
        default: Date.now()
    },

    custom_rtmp_server: { 
        type: String,
        required: true,
        trim: true,
    },
    custom_rtmp_stream_key: { 
        type: String,
        required: true,
        trim: true,
    },
})



const BroadcastsRquest = mongoose.model("broadcast", BroadcastSchema)



module.exports =  BroadcastsRquest
const mongoose = require("mongoose")

const DestinationSchema = mongoose.Schema({

    user_id: { 
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },

    youtube_access_token: { 
        type: String,
        required: false,
        trim: true,
    },
    youtube_refresh_token: { 
        type: String,
        required: false,
        trim: true,
    },
    
    facebook_user_id: { 
        type: String,
        required: false,
        trim: true,
    },
    facebook_long_access_token: { 
        type: String,
        required: false,
        trim: true,
    },
    facebook_access_token: { 
        type: String,
        required: false,
        trim: true,
    }
   
})



const DestinationsRquest = mongoose.model("destination", DestinationSchema)



module.exports =  DestinationsRquest
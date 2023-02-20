const Host = {
  ROOT: "http://localhost:3001",
  PREFIX: "/v1/api",
  //FRONTEND: "http://localhost:3000",
  FRONTEND: "https://cheap-shop.net",
}
  
const ApiEndpoints = {  
  UserEndpoints: {
    route: `${Host.PREFIX}/user`,
    register: `/register`,
    login: `/login`, 
    update: `/update`, 
    access: `/access/:id`, 
    compare: '/compare' ,
    UserWentLive: '/user-went-live',
  },

  FacebookEndpoints: {
    route: `${Host.PREFIX}/facebook`,
    permalink: `/permalink`,
    remove: `/remove`,
    authorize: `/authorize`,    
    viewCount: `/viewCount`,
    broadcast: `/broadcast`,
    end: `/end`,
  },

  YoutubeEndpoints: { 
    route: `${Host.PREFIX}/youtube`,
    authorize: `/authorize`,
    refresh: `/refresh`,
    viewCount: `/viewCount`,
    broadcast: `/broadcast`,
    live: `/live`,
    end: `/end`,
    remove: `/remove`,

    //update: `/update`,
  },

  BroadcastEndpoints: {
    route: `${Host.PREFIX}/broadcast`,
    add: `/add`,
    get: `/get/:id`,
  },

  DestinationEndpoints: {
    route: `${Host.PREFIX}/destination`,
    update: `/update`,
    get: `/get/:id`,
  },

 
};

module.exports = {ApiEndpoints , Host}
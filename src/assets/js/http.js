import axios from 'axios';

export const HTTP = axios.create({
    baseURL: "../../../static/",
    headers: {
       // "X-Auth-Token": "b3b4304e4a99498483b444b576330fe0"
       //"Access-Control-Allow-Origin" : "*"
    }
})

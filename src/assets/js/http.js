import axios from 'axios';

export const HTTP = axios.create({
    baseURL: "http://api.football-data.org/v1",
    headers: {
        "X-Auth-Token": "b3b4304e4a99498483b444b576330fe0"
    }
})

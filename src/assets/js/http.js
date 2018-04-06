import axios from 'axios';

export const HTTP = axios.create({
  baseURL: "http://canappsdb.com:5984/default/",
  crossdomain: true,
});
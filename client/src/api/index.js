// AXIOS is use for API CALL
import axios from "axios";

// baseURl is a server url
const baseURL = process.env.REACT_APP_SERVER_URL || "";
export { baseURL };

// Axios.create function use for create new instance of axios
// It i used for custmizing API request/response
const client = axios.create({
  baseURL
});

export default client;
import axios from "axios";
const baseURL = process.env.REACT_APP_SERVER_URL || "";
export { baseURL };

const client = axios.create({
  baseURL
});

export default client;
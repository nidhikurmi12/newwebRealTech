import axios from "axios";

import EnvVars from "../config/env.conf";

const Request = axios.create({
  baseURL: EnvVars.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Request;

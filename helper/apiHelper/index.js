import axios from "axios";

import { getSession } from "next-auth/react";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

API.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

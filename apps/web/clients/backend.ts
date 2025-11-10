"use server";
import { getAccessToken } from "@/app/actions/get-token-session";
import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.BACKEND_URL,
});

backend.interceptors.request.use((config) => {
  // return getPrivyAccessToken().then((token) => {
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
  //   return config;
  // });
  return getAccessToken().then((token) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
});

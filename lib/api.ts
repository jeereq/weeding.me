
import axios from "axios";
import { API as APILINK } from "./utils";

const TOKEN =
  "b4576ef0fc8b52a400845179f06421cea5a7a7d2c329666caaa005cd9df18599c955405f6ea591415eb4ed4a29bba876d93ead1b0a05562204a83abe8be5d2c640db9aa6690349ff7a92a001ecfc2143052d612c640a8edecabc6d7b2f3bb65b7a72591c6362e4c683aaf541ab4248f6c118fa089e8a5ad07a69a01c6f48041c";

const API = axios.create({
  baseURL: `${APILINK}/api/`,
  timeout: 1000000,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default API;

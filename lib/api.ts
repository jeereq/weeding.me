
import axios from "axios";
import { API as APILINK } from "./utils";

const TOKEN =
  "48978068ca11032ccc5c188da101c4f08c9965f385d1106a01d5dd127974f0bca721e7e447a4a3985884303781f825650a323e8ea71af586c2ae0e05e00c76a992486d3e76d5faf7ea0064937a7db8d6c435f8bb179b843f4bfa28c1ab3a7ad619c32bf79d6ca918ac111349bc84364ab50bf6ae4757a359b3c5785ce056f569";

const API = axios.create({
  baseURL: `${APILINK}/api/`,
  timeout: 1000000,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default API;

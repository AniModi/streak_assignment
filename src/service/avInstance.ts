import axios from "axios";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

const avInstance = axios.create({
  baseURL: ALPHA_VANTAGE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: API_KEY,
  },
});

export default avInstance;

import axios from "axios";

const API_KEY = "gay1tZtVzpkCPathhRIqfNOd0vTlAzoY";
const FMP_BASE_URL = "https://financialmodelingprep.com/api/v3/";

const fmpInstance = axios.create({
  baseURL: FMP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: API_KEY,
  },
});


export default fmpInstance;
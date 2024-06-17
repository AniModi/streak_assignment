import axios from "axios";

const yahooInstance = axios.create({
  baseURL: "https://real-time-finance-data.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "827419e315msh05431c5bc1e970bp1666c5jsne3420fc7a5cd",
    "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
  },
});

export default yahooInstance;

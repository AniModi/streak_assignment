import axios from "axios";

const yahooInstance = axios.create({
  baseURL: "https://real-time-finance-data.p.rapidapi.com/",
  headers: {
    'x-rapidapi-key': '1bd14b205amshda5e410cd2d07d1p1ca78djsnd18d0dd830ee',
		'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
  },
});

export default yahooInstance;

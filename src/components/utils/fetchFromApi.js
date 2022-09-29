import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    url: BASE_URL,
    params: {
      maxResults: '50',
    },
    headers: {
      'X-RapidAPI-Key': '09f94624e4msh4ca4e0873e28d98p138731jsnca54e4fe3e48',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
export const fetchFromAPI = async (url) =>{
  const {data} =  await axios.get(`${BASE_URL}/${url}`, options);
  return data
}
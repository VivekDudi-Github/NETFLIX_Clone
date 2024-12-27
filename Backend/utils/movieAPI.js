import axios from "axios";
import { ENV_VARS } from "../config/envVAr.js";

export const fetchFromTMDB = async(url) => {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.MOVIE_DB_ACCESS_TOKEN
        }
      };

      const response =  await axios.get(url ,options)
      if(response.status !== 200){
        throw new Error("failed to fetch data from TMDB" + response.statusText)
      }

      return response.data

} 

import dotenv from 'dotenv' ;

dotenv.config();

export const ENV_VARS = {
    MONGODB_URI: process.env.MONGODB_URI , 
    PORT : process.env.PORT || 5000 ,
    JWT_SECRET : process.env.JWT_SECRET ,
    MOVIE_DB_ACCESS_TOKEN : process.env.MOVIE_DB_ACCESS_TOKEN
}
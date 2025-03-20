import dotenv from 'dotenv';
dotenv.config();  // para trabajar con las variables de entorno

export const config = {
    PORT: process.env.PORT,
    URL_MONGODB: process.env.URL_MONGODB,
}

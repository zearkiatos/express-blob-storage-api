import dotenv from 'dotenv';

dotenv.config();
const config = {
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT
}

export default config;
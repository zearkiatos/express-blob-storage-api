import dotenv from 'dotenv';

dotenv.config();
const config = {
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    STORAGE: {
        CONNECTION_STRING: process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING,
        CONTAINER_NAME: process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME
    }
}

export default config;
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '@config';
import router from '@routes/router';
import azureBlobStorageClient from '@clients/azure/blobStorageClient' 

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router(app);

function closeApp() {
    process.exit(0);
}

async function initBlobStorage() {
    try {
        console.log('Starting service intialize');
        await azureBlobStorageClient.initializeBlobStorageClient()
    }
    catch(ex) {
        console.log('Something was wrong when trying to initialize the service', { errorMessage: ex.message, stack: ex.stack })
        closeApp();
    }
}

function initExpress() {
  console.log('Initializing Express.js 🤖');
  app.listen(config.PORT, () => {
    console.log(`Express was initializated on port ${config.PORT} success ✅ 🚀`);
    process.on('SIGINT', closeApp);
    process.on('SIGTERM', closeApp);
  });
}

async function main() {
  initExpress();
  await initBlobStorage();
}

main();
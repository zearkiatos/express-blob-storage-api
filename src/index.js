import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '@config';
import router from '@routes/router';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router(app);

function closeApp() {
    process.exit(0);
}

function initExpress() {
  console.log('Initializing Express.js 🤖');
  app.listen(config.PORT, () => {
    console.log(`Express was initializated on port ${config.PORT} success ✅ 🚀`);
    process.on('SIGINT', closeApp);
    process.on('SIGTERM', closeApp);
  });
}

initExpress();
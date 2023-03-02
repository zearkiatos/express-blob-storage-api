import httpStatusCodes from 'http-status-codes';
import config from '@config';

const healthCheck = (app) => {
    app.get(`/api/health`, (request, response) => {
        response.status(httpStatusCodes.OK);
        response.send({
            environment: config.ENVIRONMENT,
            message: 'OK',
            uptime: process.uptime(),
            timestamp: Date.now()
        })
    });
};

export default healthCheck;
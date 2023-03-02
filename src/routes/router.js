import { globSync } from 'glob'
import path from 'path';

const router = (app) => {
  globSync('./src/routes/**/*.js').forEach((file) => {
    if (!file.includes('router.js')) {
        const route = require(path.resolve(file)).default;
        route(app);
    }
  });
};

export default router;
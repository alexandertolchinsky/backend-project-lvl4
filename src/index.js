import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug,
    },
    root: resolve(__dirname, '..', 'src', 'views'),
    includeViewExtension: true,
  });
};

const application = fastify();
setUpViews(application);

export default application;

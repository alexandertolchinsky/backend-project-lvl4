import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readdirSync } from 'fs';

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

const addControllers = (app) => {
  const controllersDir = resolve(__dirname, '..', 'src', 'controllers');
  const controllers = readdirSync(controllersDir)
    .map((fileName) => resolve(controllersDir, fileName))
    .map((controllerPath) => import(controllerPath));
  controllers.forEach((controller) => app.register(controller));
};

const application = fastify();
setUpViews(application);
addControllers(application);

export default application;

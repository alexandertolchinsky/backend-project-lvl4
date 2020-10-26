import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readdirSync } from 'fs';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';

dotenv.config();
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

const addRollbar = (app) => {
  const rollbar = new Rollbar({
    accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  app.register(async (appInstance, options, done) => {
    try {
      await done();
    } catch (err) {
      rollbar.error(err);
    }
  });
};

const application = fastify();
setUpViews(application);
addControllers(application);
addRollbar(application);

export default application;

export default (app, options, done) => {
  app.get('/', (request, reply) => reply.view('home'));
  done();
};

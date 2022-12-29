import fastifySocketIo from 'fastify-socket.io';
import fastifyStatic from 'fastify-static';
import fastifyJWT from 'fastify-jwt';
import HttpErrors from 'http-errors';

const setUpAuth = (app) => {
    app
      .register(fastifyJWT, {
        secret: 'supersecret',
      })
      .decorate('authenticate', async (req, reply) => {
        try {
          await req.jwtVerify();
        } catch (_err) {
          reply.send(new Unauthorized());
        }
      });
  };
  
  export default async (app, options) => {
    setUpAuth(app);
    setUpStaticAssets(app, options.staticPath);
    await app.register(fastifySocketIo);
    addRoutes(app, options?.state || {});
  
    return app;
  };
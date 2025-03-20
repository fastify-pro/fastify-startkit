import fp from 'fastify-plugin';
import viewPlugin from '@fastify/view';
import ejs from 'ejs';
import path from 'path';
import { FastifyInstance } from 'fastify';

export default fp(async function(fastify: FastifyInstance, opts: object) {
  fastify.register(viewPlugin, {
    engine: {
      ejs: ejs
    },
    root: path.join(__dirname, '../views'),
    viewExt: 'ejs'
  });
}); 
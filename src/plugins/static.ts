import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { FastifyInstance } from 'fastify';

export default fp(async function(fastify: FastifyInstance, opts: object) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/'
  });
}); 
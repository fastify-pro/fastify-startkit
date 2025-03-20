import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import apiRoutes from './api';

export default async function(fastify: FastifyInstance, opts: object): Promise<void> {
  // Register API routes
  fastify.register(apiRoutes, { prefix: '/api' });

  // Home route
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.view('index', { title: 'FastifyKit' });
  });

  // Not found handler
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.status(404).view('error', { 
      title: '404 Not Found',
      message: 'The page you are looking for does not exist.' 
    });
  });
} 
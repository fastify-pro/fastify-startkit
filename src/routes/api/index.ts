import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import config from '../../config/config';
import todoRoutes from './todos';

export default async function(fastify: FastifyInstance, opts: object): Promise<void> {
  const apiVersion = config.apiVersion;

  // API version route
  fastify.get('/', {
    schema: {
      tags: ['api'],
      summary: 'API information',
      description: 'Returns information about the API',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            version: { type: 'string' }
          }
        }
      }
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return { 
        message: 'FastifyKit API',
        version: apiVersion 
      };
    }
  });

  // Register API sub-routes
  fastify.register(todoRoutes, { prefix: '/todos' });
} 
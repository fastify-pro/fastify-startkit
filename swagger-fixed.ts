import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// Use require instead of import since type definitions are missing
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');
import config from './src/config/config';

export default fp(async function(fastify: FastifyInstance) {
  // Register Swagger plugin
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'FastifyKit API Documentation',
        description: 'API documentation for FastifyKit application',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://github.com/yourusername/fastifykit',
        description: 'Find more info here'
      },
      host: `localhost:${config.port}`,
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'api', description: 'API related endpoints' },
        { name: 'todos', description: 'Todo related endpoints' }
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  });

  // Register Swagger UI plugin
  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function(request: FastifyRequest, reply: FastifyReply, next: () => void) { next(); },
      preHandler: function(request: FastifyRequest, reply: FastifyReply, next: () => void) { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header: string) => header,
    transformSpecification: (swaggerObject: Record<string, any>) => { return swaggerObject; },
    transformSpecificationClone: true
  });
  
  // Add hook to log when Swagger is ready
  fastify.ready(() => {
    console.log(`📚 Swagger documentation is available at http://localhost:${config.port}/documentation`);
  });
}); 
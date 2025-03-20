import 'reflect-metadata';
import path from 'path';
import Fastify, { FastifyInstance, FastifyError } from 'fastify';
import config from './config/config';
import { initializeDatabaseWithSeedData } from './database/seed.database';

// Initialize Fastify with options
const fastify: FastifyInstance = Fastify({
  logger: {
    level: config.environment === 'development' ? 'info' : 'warn',
    transport: {
      target: 'pino-pretty'
    }
  }
});

// Register database plugin first (before other plugins that might need it)
fastify.register(require('./plugins/database'));

// Register Swagger plugin
fastify.register(require('./plugins/swagger'));

// Register other plugins
fastify.register(require('./plugins/cors'));
fastify.register(require('./plugins/static'));
fastify.register(require('./plugins/view'));

// Register routes
fastify.register(require('./routes'), { prefix: '/' });

// Parse JSON bodies
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req: any, body: string, done: (err: Error | null, result?: any) => void) {
  try {
    const json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    const error = err as FastifyError;
    error.statusCode = 400;
    done(error);
  }
});

// Add custom error handler
fastify.setErrorHandler(function (error: FastifyError, request: any, reply: any) {
  console.error(`❌ Server error:`, error);
  
  // Send error response
  reply.status(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500
  });
});

// Start the server
const start = async () => {
  try {
    // Initialize database connection and seed data
    await initializeDatabaseWithSeedData().then(() => {
      console.log('✅ Database seeding completed successfully');
    }).catch((err) => {
      console.error('❌ Error during database seeding:', err);
      process.exit(1);
    });
    
    await fastify.listen({
      port: config.port,
      host: '0.0.0.0'
    });
    
    console.log(`🚀 Server running at http://localhost:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 
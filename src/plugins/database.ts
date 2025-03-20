import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { DataSource } from 'typeorm';
import { initializeDatabase } from '../database/config';

/**
 * This plugins adds TypeORM database support to Fastify
 */
export default fp(async (fastify: FastifyInstance) => {
  try {
    // Initialize database connection
    const dataSource: DataSource = await initializeDatabase();
    
    // Decorate fastify instance with the database connection
    fastify.decorate('db', {
      dataSource,
      getRepository: (entity: any) => dataSource.getRepository(entity)
    });
    
    // Add hook to close the database connection when the server is shutting down
    fastify.addHook('onClose', async (instance) => {
      if (dataSource.isInitialized) {
        await dataSource.destroy();
        console.log('Database connection closed');
      }
    });
    
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}); 
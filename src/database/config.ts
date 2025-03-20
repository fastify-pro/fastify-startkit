import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import 'dotenv/config';

// Database configuration using environment variables
export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'fastifykit_db',
  synchronize: process.env.DB_SYNC === '1',
  // logging: process.env.NODE_ENV === 'development',
  entities: [path.join(__dirname, './entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, './migrations/**/*.{ts,js}')],
  subscribers: [path.join(__dirname, './subscribers/**/*.{ts,js}')]
};

// Create TypeORM DataSource
export const AppDataSource = new DataSource(dbConfig);

// Initialize database connection
export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    if (!AppDataSource.isInitialized) {
      console.log('📊 Connecting to PostgreSQL database...');
      const dataSource = await AppDataSource.initialize();
      console.log('✅ Database connection established successfully');
      return dataSource;
    }
    
    return AppDataSource;
  } catch (error) {
    console.error('❌ Error during database connection:', error);
    throw error;
  }
}; 